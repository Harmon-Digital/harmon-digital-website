import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Harmon Digital - Custom Software & Automation'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '40px 80px',
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #3959ff 0%, #1a3ad4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontWeight: 'bold',
            }}
          >
            //
          </div>
        </div>

        {/* Company Name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 500,
            color: 'white',
            marginBottom: 24,
          }}
        >
          Harmon Digital
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#888888',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Custom software and automation for businesses built to exit or scale.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
