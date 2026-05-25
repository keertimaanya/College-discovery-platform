import * as React from "react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} College Discovery Platform. All rights reserved.
      </div>
    </footer>
  );
}
