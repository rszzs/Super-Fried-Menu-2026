import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://ais-dev-aer7ckqizzfc3xfobhsizv-585518993069.europe-west1.run.app'),
  title: 'Remix مطعم سوبر فرايد - بغداد',
  description: 'A luxury, high-performance multilingual restaurant digital menu (Arabic, English, Kurdish, Turkish) with category filtering, item customizers, WhatsApp table ordering, dynamic QR code management, and live admin dashboard.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Remix مطعم سوبر فرايد - بغداد',
    description: 'A luxury, high-performance multilingual restaurant digital menu (Arabic, English, Kurdish, Turkish) with category filtering, item customizers, WhatsApp table ordering, dynamic QR code management, and live admin dashboard.',
    type: 'website',
    locale: 'ar_IQ',
    siteName: 'Remix مطعم سوبر فرايد - بغداد',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remix مطعم سوبر فرايد - بغداد',
    description: 'A luxury, high-performance multilingual restaurant digital menu (Arabic, English, Kurdish, Turkish) with category filtering, item customizers, WhatsApp table ordering, dynamic QR code management, and live admin dashboard.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
