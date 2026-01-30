import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#0a0a0a',
          color: '#fafaf9',
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #b8860b',
                margin: '0 auto 2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#b8860b',
                }}
              >
                OC
              </span>
            </div>

            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#b8860b',
                marginBottom: '1rem',
              }}
            >
              404
            </p>

            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 'normal',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              Page Not Found
            </h1>

            <p
              style={{
                color: '#a1a1aa',
                marginBottom: '2.5rem',
                lineHeight: 1.6,
              }}
            >
              The page you are looking for does not exist, has been moved, or is
              temporarily unavailable.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#b8860b',
                  color: '#0a0a0a',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Back to Home
              </Link>
              <Link
                href="/subscribe"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #b8860b',
                  color: '#b8860b',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Subscribe
              </Link>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.625rem',
              color: '#52525b',
              position: 'absolute',
              bottom: '2rem',
              fontStyle: 'italic',
            }}
          >
            The Order of Change
          </p>
        </div>
      </body>
    </html>
  )
}
