'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Interview Prep Pro</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/learn" className="text-gray-700 hover:text-blue-600 transition">
              Learn
            </Link>
            <Link href="/interview/setup" className="text-gray-700 hover:text-blue-600 transition">
              Interview
            </Link>
            <Link href="/ask" className="text-gray-700 hover:text-blue-600 transition">
              Ask
            </Link>
          </div>

          <div className="md:hidden flex gap-4">
            <Link href="/learn" className="text-sm text-gray-700 hover:text-blue-600">
              Learn
            </Link>
            <Link href="/interview/setup" className="text-sm text-gray-700 hover:text-blue-600">
              Interview
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
