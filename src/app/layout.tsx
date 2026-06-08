import Navigationbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import { CartProvider } from '../context/cart.context';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <CartProvider>
          <Navigationbar />
          <main>{children}</main>
        <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
