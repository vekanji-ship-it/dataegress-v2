import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'Protect', href: '/protect' },
    { name: 'Build', href: '/build' },
    { name: 'Scale', href: '/scale' },
    { name: 'Stack', href: '/stack' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 hover:opacity-80 transition-opacity">
            DataEgress<span className="text-blue-600">.</span>
          </Link>
          
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#newsletter"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            Join Newsletter
          </Link>
        </div>
      </div>
    </header>
  );
}