"use client";

import React, { useState, useRef, useEffect } from "react";
import collegesData from "@/data/colleges.json";
import { College } from "@/types/college";
import { useCompare } from "@/context/CompareContext";
import { Input } from "../ui/Input";

export function CompareSelector() {
  const { compareIds, addToCompare, removeFromCompare } = useCompare();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map active IDs to their full college objects
  const selectedColleges = compareIds
    .map((id) => (collegesData as College[]).find((c) => c.id === id))
    .filter(Boolean) as College[];

  // Filter dropdown results based on search input (excluding already selected ones)
  const searchResults = searchQuery.trim()
    ? (collegesData as College[]).filter(
        (college) =>
          !compareIds.includes(college.id) &&
          college.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectResult = (id: string) => {
    const error = addToCompare(id);
    if (error) {
      alert(error); // Trigger standard alert from context specifications
    }
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Container */}
      <div className="relative max-w-md" ref={dropdownRef}>
        <Input
          placeholder="Search college by name to compare..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
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
        />

        {/* Dropdown Results Box */}
        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-12 left-0 right-0 z-25 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
            {searchResults.map((college) => (
              <button
                key={college.id}
                onClick={() => handleSelectResult(college.id)}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex flex-col gap-0.5"
              >
                <span>{college.name}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  📍 {college.location}, {college.state} • {college.type}
                </span>
              </button>
            ))}
          </div>
        )}

        {isOpen && searchQuery.trim() && searchResults.length === 0 && (
          <div className="absolute top-12 left-0 right-0 z-25 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-center text-sm font-semibold text-gray-500">
            No matching colleges available
          </div>
        )}
      </div>

      {/* Selected Slots Grid (Always renders exactly 3 slots) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => {
          const college = selectedColleges[index];

          if (college) {
            // Render active college card slot
            return (
              <div
                key={college.id}
                className="relative bg-white border border-blue-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-1 pr-6">
                  <span className="text-[9px] uppercase font-extrabold text-blue-500 tracking-wider">
                    Slot {index + 1} Selected
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                    {college.name}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500">
                    📍 {college.location}, {college.state}
                  </p>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => removeFromCompare(college.id)}
                  className="h-7 w-7 rounded-full bg-gray-50 border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all flex items-center justify-center font-bold"
                  title="Remove college"
                >
                  ✕
                </button>
              </div>
            );
          }

          // Render empty dashed slot box
          return (
            <div
              key={`empty-${index}`}
              className="bg-gray-50/50 border-2 border-dashed border-gray-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center h-[90px] select-none"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Slot {index + 1}
              </span>
              <p className="text-sm font-bold text-gray-400 mt-1">
                + Add a college to compare
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
