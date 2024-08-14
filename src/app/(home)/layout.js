import Navbar from '@/components/navbar';
import { Inter } from "next/font/google";
import '.././globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventHub",
  description: "Your personal event manager",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
