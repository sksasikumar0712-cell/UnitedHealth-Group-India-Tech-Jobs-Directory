import type { Metadata, Viewport } from 'next';
import { title, description, siteUrl } from '../lib/site';
import './globals.css';

const shareImage = {
  url: '/tech-careers.png',
  width: 1200,
  height: 630,
  alt: 'UnitedHealth Group and Optum technology jobs in India',
};

export const metadata: Metadata = {
  metadataBase: siteUrl ?? (process.env.NODE_ENV === 'development' ? new URL('http://localhost:3000') : undefined),
  title,
  description,
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: { title, description, type: 'website', url: siteUrl, siteName: 'UHG Tech Careers', images: [shareImage] },
  twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
};

export const viewport: Viewport = { themeColor: '#ffffff', viewportFit: 'cover' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
