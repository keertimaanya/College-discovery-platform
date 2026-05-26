"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  totalCount: number;
}

export function SearchBar({ onSearchChange, totalCount }: SearchBarProps) {
  const [localSearch, setLocalSearch] = useState("");

  // Debouncing effect: Wait 300ms after the user stops typing before pushing the query to filters.
  // This drastically improves performance by avoiding querying on every single keystroke.
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  return (
    <div className="w-full space-y-2">
      <Input
        placeholder="Search colleges by name or location (e.g. IIT Bombay, Mumbai)..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        icon={
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        className="w-full text-base py-3 shadow-sm border-gray-200"
      />
      <div className="text-sm text-gray-500 font-medium pl-1">
        Showing {totalCount} {totalCount === 1 ? "college" : "colleges"}
      </div>
    </div>
  );
}
