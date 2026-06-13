import type { MetadataRoute } from 'next';

export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vesti',
    short_name: 'Vesti',
    description:
      'A Progressive Web App for shopping and browsing products built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f6f6',
    theme_color: '#083a4f',
    icons: [
      {
        purpose: 'any',
        src: '/images/venti-logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        purpose: 'any',
        src: '/images/venti-logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        src: '/images/venti-logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        src: '/images/venti-logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/images/screenshot-desktop-home.jpg',
        sizes: '1920x1080',
        form_factor: 'wide',
        label: 'Desktop view showing Vesti landing page',
      },
      {
        src: '/images/screenshot-mobile-home.jpg',
        sizes: '750x1334',
        form_factor: 'narrow',
        label: 'Mobile view showing Vesti landing page',
      },
    ],
  };
}
