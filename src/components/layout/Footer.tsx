import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-200 mt-auto border-t border-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-900 pb-6">
          {/* Logo Brand */}
          <Link href="/" className="font-black text-xl text-blue-500 tracking-tight hover:text-blue-400 transition-colors">
            CollegeDiscover
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/compare" className="hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/saved" className="hover:text-white transition-colors">
              Saved
            </Link>
          </div>
        </div>

        {/* Copyright block */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-bold">
          <p>CollegeDiscover &copy; 2024. All rights reserved.</p>
          <p className="mt-1 sm:mt-0">Designed for Premium Discovery Experience</p>
        </div>
      </div>
    </footer>
  );
}
