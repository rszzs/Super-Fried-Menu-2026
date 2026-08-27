import { ImageResponse } from 'next/og';

export const alt = 'Super Fried - Digital Restaurant Menu';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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
          justifyContent: 'space-between',
          backgroundColor: '#1C2513',
          padding: '56px 64px',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                fontSize: '36px',
              }}
            >
              🍟
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 'bold' }}>SUPER FRIED</span>
              <span style={{ color: '#DDA15E', fontSize: '16px' }}>Baghdad, Al-Kadhimiya</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#BC6C25',
              color: '#FFFFFF',
              padding: '10px 24px',
              borderRadius: '999px',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Digital Interactive Menu
          </div>
        </div>

        {/* Center Card Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#FEFAE0',
              lineHeight: 1.2,
            }}
          >
            SUPER FRIED RESTAURANT
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#E8E5DF',
              lineHeight: 1.4,
            }}
          >
            Crispy Fried Chicken, Burgers, Strips, Rizo & Gourmet Sides
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '24px',
          }}
        >
          <div style={{ color: '#DDA15E', fontSize: '20px' }}>
            Bab Al-Murad Street, Al-Kadhimiya
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#283618',
              color: '#FEFAE0',
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Explore Menu & Order
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
