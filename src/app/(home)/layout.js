import Navbar from '@/components/navbar';
import '.././globals.css';

export default function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
