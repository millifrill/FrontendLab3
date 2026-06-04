import Navigationbar from '../components/navbar/navbar';
import Footer from '../component/footer/footer';
import 'bootstrap/dist/css/bootstrap.css';
// import './bootstrap.scss';
import './global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Navigationbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
