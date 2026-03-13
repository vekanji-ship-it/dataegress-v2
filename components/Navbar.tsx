"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Checkup', href: '/checkup' },
    { name: 'Protect', href: '/protect' },
    { name: 'Build', href: '/build' },
    { name: 'Scale', href: '/scale' },
    { name: 'Stack', href: '/stack' },
    { name: 'Blog', href: '/blog' }, // 🌟 新增 Blog 連結
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full py-4 flex items-center justify-between">
          
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              DataEgress<span className="text-blue-600">.</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/newsletter" className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors">
              Join Newsletter
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Link href="/newsletter" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors">
              Join
            </Link>
            
            <button
              type="button"
              className="bg-slate-50 rounded-md p-2 inline-flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-xl border-b border-slate-100 animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/newsletter" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 mt-4 text-center rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}