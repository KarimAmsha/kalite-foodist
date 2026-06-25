'use client';

import type { LeadInput } from './validators';

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Posts the lead to our own API route (which forwards it to the Google
 * Apps Script webhook server-side, keeping the webhook URL secret).
 */
export async function submitLead(data: LeadInput): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body?.error || 'generic' };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'generic' };
  }
}
