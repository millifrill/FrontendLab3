import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../component/footer/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
