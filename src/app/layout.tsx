import Navigationbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import WishlistAlert from '../components/wishlist-alert/wishlist-alert';
import { CartProvider } from '../context/cart.context';
import { AuthProvider } from '../context/auth.context';
import { WishlistProvider } from '../context/wishlist.context';
import './bootstrap.scss';
import './global.css';

export const metadata = {
  title: 'Vesti',
  description:
    'A Progressive Web App for shopping and browsing products online',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navigationbar />
              <WishlistAlert />
              <main>{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
