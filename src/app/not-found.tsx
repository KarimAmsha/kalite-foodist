import Link from 'next/link';

// Global fallback for unmatched, non-localized paths. Kept self-contained
// (its own <html>) because it can render outside the [locale] layout.
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#160C07',
          color: '#F6ECDD',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '3rem', margin: 0, color: '#A52332' }}>404</h1>
          <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>This page could not be found.</p>
          <Link href="/en" style={{ color: '#A52332', fontWeight: 600 }}>
            ← Back to Kalite Çikolata
          </Link>
        </div>
      </body>
    </html>
  );
}
