"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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

  // Sync auth state on mount and listen to window storage events for real-time updates
  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-user");
    setUser(null);
    // Notify other components/listeners that storage has changed
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0 flex items-center font-black text-xl text-blue-600 hover:text-blue-700 transition-colors">
              College Discovery
            </Link>
            <div className="hidden sm:flex sm:space-x-8 h-full">
              <Link href="/" className="inline-flex items-center px-1 h-full border-b-2 border-transparent text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all">
                Home
              </Link>
              <Link href="/compare" className="inline-flex items-center px-1 h-full border-b-2 border-transparent text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all">
                Compare
              </Link>
              <Link href="/saved" className="inline-flex items-center px-1 h-full border-b-2 border-transparent text-sm font-bold text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all">
                Saved
              </Link>
            </div>
          </div>

          {/* Authentication Actions Area */}
          <div className="flex items-center gap-3">
            {user ? (
              // Display profile name and log out if logged in
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700 hidden md:inline">
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
              // Display sign-in controls if guest
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-bold text-gray-500 hover:text-blue-600 h-9 px-3"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className="font-bold h-9 px-4 rounded-lg text-xs"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
