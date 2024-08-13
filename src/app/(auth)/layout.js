import { Inter } from "next/font/google";
import '.././globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventHub - Auth",
  description: "Authentication pages for EventHub",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full h-20 bg-transparent border-b border-gray-300 sticky top-0 z-50 ">
          <div className="container mx-auto px-3 h-full flex items-center">
            <h1 className="text-2xl font-bold text-black">EventHub</h1>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
