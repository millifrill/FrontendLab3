import type { MetadataRoute } from 'next';

export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vesti',
    short_name: 'Vesti',
    description:
      'An Progressive Web App for shopping and browsing products built with Next.js',
    start_url: '.',
    display: 'standalone',
    background_color: '#f6f6f6',
    theme_color: '#083a4f',
    icons: [
      {
        purpose: 'any',
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        purpose: 'any',
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
