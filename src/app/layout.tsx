import Navigationbar from '../components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.css';
// import './bootstrap.scss';
import './global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Navigationbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
