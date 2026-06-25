import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators';

export const runtime = 'nodejs';

/**
 * Receives a validated lead and forwards it to the Google Apps Script
 * webhook, which appends a row to the Google Sheet.
 *
 * The webhook URL is read from a server-only env var so it never reaches
 * the client bundle. If it's not configured, we still return 200 so the
 * UI shows success and the visitor can use the WhatsApp / fallback paths,
 * but we log a warning for the operator.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'generic' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 422 });
  }

  // Honeypot tripped → pretend success, drop silently.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

  const payload = {
    ...parsed.data,
    created_at: new Date().toISOString(),
    status: 'New',
  };
  // Don't forward the honeypot field to the sheet.
  delete (payload as Record<string, unknown>).company_website;

  if (!webhookUrl) {
    console.warn('[lead] GOOGLE_SCRIPT_WEBHOOK_URL is not set; lead not persisted:', payload);
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Apps Script can be slow; give it room but don't hang forever.
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error('[lead] webhook responded', res.status);
      return NextResponse.json({ error: 'generic' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error('[lead] webhook request failed', err);
    return NextResponse.json({ error: 'generic' }, { status: 502 });
  }
}
