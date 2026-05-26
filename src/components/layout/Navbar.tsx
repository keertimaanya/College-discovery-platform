"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { useSaved } from "@/context/SavedContext";
import { useCompare } from "@/context/CompareContext";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const { savedIds } = useSaved();
  const { compareIds } = useCompare();

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically whenever navigation path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem("auth-user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error reading auth state:", e);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  const isActiveLink = (path: string) => {
    return pathname === path
      ? "border-blue-600 text-blue-600 font-extrabold"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 font-bold";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-35 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Logo on Left */}
            <Link href="/" className="flex-shrink-0 flex items-center font-black text-xl text-blue-600 hover:text-blue-700 transition-colors tracking-tight">
              CollegeDiscover
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex sm:space-x-8 h-full">
              <Link href="/" className={`inline-flex items-center px-1 h-full border-b-2 text-sm transition-all ${isActiveLink("/")}`}>
                Home
              </Link>
              <Link href="/compare" className={`inline-flex items-center px-1 h-full border-b-2 text-sm transition-all gap-1.5 ${isActiveLink("/compare")}`}>
                Compare
                {compareIds.length > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-[10px] font-black text-blue-600 animate-pulse">
                    {compareIds.length}
                  </span>
                )}
              </Link>
              <Link href="/saved" className={`inline-flex items-center px-1 h-full border-b-2 text-sm transition-all gap-1.5 ${isActiveLink("/saved")}`}>
                Saved
                {savedIds.length > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-[10px] font-black text-red-600">
                    {savedIds.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Right Side: Authentication */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">
                  Hello, <span className="text-blue-600">{user.name}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="font-bold border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 h-9 px-3"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-bold text-gray-500 hover:text-blue-600 h-9 px-3">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm" className="font-bold h-9 px-4 rounded-lg text-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors border border-transparent hover:border-gray-200"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                // "X" Icon
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drop Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute left-0 right-0 py-3 px-4 space-y-3 z-30 animate-fade-in-down">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/compare"
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/compare" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Compare</span>
              {compareIds.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-[10px] font-black text-blue-600">
                  {compareIds.length}
                </span>
              )}
            </Link>
            <Link
              href="/saved"
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/saved" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Saved</span>
              {savedIds.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-[10px] font-black text-red-600">
                  {savedIds.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Auth Options */}
          <div className="border-t border-gray-150 pt-3 flex flex-col gap-2.5">
            {user ? (
              <div className="space-y-3 px-3">
                <p className="text-sm font-bold text-gray-700">
                  Hello, <span className="text-blue-600">{user.name}</span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full font-bold border-gray-300 text-gray-700 hover:bg-gray-50 h-10 rounded-xl"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full font-bold text-gray-500 hover:text-blue-600 h-10 rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button variant="primary" size="sm" className="w-full font-bold h-10 rounded-xl text-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
