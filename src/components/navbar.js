'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (response.ok) {
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Events', path: '/my-events' },
    { name: 'Discover', path: '/discover' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="w-full h-20 bg-gradient-to-r from-purple-700 via-blue-500 to-blue-700 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-3 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="text-white text-2xl font-bold">EventHub</div>
          <ul className="hidden md:flex gap-x-6 text-white">
            {navItems.map(item => (
              <li key={item.path}>
                <Link href={item.path}>
                  <p
                    className={`${pathname === item.path
                      ? 'font-bold text-white border-b-2 border-white'
                      : 'font-normal text-gray-300'
                      } hover:text-white hover:border-b-2 hover:border-white transition-colors duration-200`}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
            <li key={'signuot'}>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
