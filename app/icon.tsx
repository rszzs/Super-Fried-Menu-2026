import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C2513',
          borderRadius: '16px',
          border: '2px solid #BC6C25',
          fontSize: '34px',
        }}
      >
        🍟
      </div>
    ),
    {
      ...size,
    }
  );
}
