import type { Metadata, Viewport } from 'next';
import Navigationbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import WishlistAlert from '../components/wishlist-alert/wishlist-alert';
import { CartProvider } from '../context/cart.context';
import { AuthProvider } from '../context/auth.context';
import { WishlistProvider } from '../context/wishlist.context';
import { CompareProvider } from '../context/compare.context';
import './bootstrap.scss';
import './global.css';

export const metadata: Metadata = {
  title: 'Vesti',
  description:
    'A Progressive Web App for shopping and browsing products online',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vesti',
  },
  icons: {
    apple: '/images/vesti-logo-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#083a4f',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <Navigationbar />
                <WishlistAlert />
                <main>{children}</main>
                <Footer />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
