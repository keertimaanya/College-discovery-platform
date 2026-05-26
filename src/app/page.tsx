"use client";

import React, { useState } from "react";
import { FilterState } from "@/types/college";
import { useColleges } from "@/hooks/useColleges";
import { SearchBar } from "@/components/college/SearchBar";
import { CollegeFilters } from "@/components/college/CollegeFilters";
import { CollegeGrid } from "@/components/college/CollegeGrid";

const initialFilters: FilterState = {
  search: "",
  state: "",
  type: "",
  minFees: 50000,
  maxFees: 2000000,
  minRating: 3.0,
  exam: "",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Core hook performs simulated network loading and filters the mock database
  const { filteredColleges, totalCount, isLoading } = useColleges(filters);

  // Memoized stable filter changer with reference comparison
  const handleFilterChange = React.useCallback((updater: (prev: FilterState) => FilterState) => {
    setFilters((prev) => {
      const next = updater(prev);
      if (
        prev.search === next.search &&
        prev.state === next.state &&
        prev.type === next.type &&
        prev.minFees === next.minFees &&
        prev.maxFees === next.maxFees &&
        prev.minRating === next.minRating &&
        prev.exam === next.exam
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const handleSearchChange = React.useCallback((value: string) => {
    setFilters((prev) => {
      if (prev.search === value) return prev;
      return { ...prev, search: value };
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* 1. Header Hero Panel */}
      <div className="space-y-2.5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Discover Your Ideal College
        </h1>
        <p className="text-base text-gray-500 max-w-2xl font-medium">
          Explore, compare, and save premium engineering and technology institutions across India.
        </p>
      </div>

      {/* 2. Search Section */}
      <SearchBar
        onSearchChange={handleSearchChange}
        totalCount={totalCount}
      />

      {/* 3. Mobile Active Filters Controls */}
      <div className="lg:hidden flex items-center justify-between bg-white px-5 py-4 border border-gray-200 rounded-2xl shadow-sm">
        <span className="text-sm font-semibold text-gray-700">
          Found {totalCount} matching results
        </span>
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          <svg
            className="h-4.5 w-4.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* 4. Main Section Split */}
      <div className="flex gap-8 items-start">
        {/* Desktop Filters Panel (1/4 Width) */}
        <aside className="hidden lg:block w-1/4 shrink-0 sticky top-24">
          <CollegeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Listing Grid Panel (3/4 Width) */}
        <div className="flex-grow space-y-5">
          {/* Desktop Subtitle Panel */}
          <div className="hidden lg:flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-800">
              Matching Institutions
            </h2>
            <span className="text-sm font-semibold text-gray-500">
              Showing {totalCount} matching results
            </span>
          </div>

          {/* Grid component renders list, loader, or empty search screen */}
          <CollegeGrid
            colleges={filteredColleges}
            isLoading={isLoading}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      {/* 5. Mobile Sidebar Slide-over Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Drawer body container slide-in */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-gray-50 py-4 pb-12 shadow-2xl overflow-y-auto z-10 animate-fade-in-right">
            <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Filter Search</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <CollegeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
