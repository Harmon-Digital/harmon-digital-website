import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(80px, 15vw, 150px)',
          fontWeight: 400,
          color: '#fff',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '18px',
          color: '#888',
          margin: '24px 0 40px',
          maxWidth: '400px',
        }}
      >
        This page doesn't exist. Maybe the URL is wrong, or we moved things around.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '12px 24px',
          background: '#fff',
          color: '#0a0a0a',
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '6px',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        Back to home
      </Link>
    </div>
  )
}
