import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      {/* 404 Heading Illustration */}
      <div className="space-y-2">
        <h1 className="text-7xl sm:text-8xl font-black text-blue-600 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Page Not Found
        </h2>
      </div>

      <p className="text-gray-500 text-sm max-w-md leading-relaxed sm:text-base">
        Sorry, we couldn't find the page you are looking for. It may have been moved, deleted, or the URL might be mistyped.
      </p>

      {/* Button link back */}
      <div className="pt-2">
        <Link href="/">
          <Button variant="primary" className="px-6 py-2.5 font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
