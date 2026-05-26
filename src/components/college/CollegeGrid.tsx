"use client";

import React from "react";
import { College } from "@/types/college";
import { CollegeCard } from "./CollegeCard";

interface CollegeGridProps {
  colleges: College[];
  isLoading: boolean;
  onClearFilters: () => void;
}

// 1. Reusable Animated Pulsing Card Skeleton matching CollegeCard shape
function CollegeCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden h-[450px] animate-pulse">
      {/* Image Banner Skeleton */}
      <div className="h-48 w-full bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
          <div className="h-4 bg-gray-200 rounded-md w-1/2" />
        </div>

        {/* Stats Divider Line */}
        <div className="border-b border-gray-150 pb-3 mt-2" />

        {/* Stats row */}
        <div className="flex justify-between items-center mt-2">
          <div className="space-y-1.5 w-1/3">
            <div className="h-2 bg-gray-200 rounded-md w-2/3" />
            <div className="h-4 bg-gray-200 rounded-md w-full" />
          </div>
          <div className="space-y-1.5 w-1/3 flex flex-col items-end">
            <div className="h-2 bg-gray-200 rounded-md w-2/3" />
            <div className="h-4 bg-gray-200 rounded-md w-full" />
          </div>
        </div>

        {/* Featured Programs */}
        <div className="space-y-2 flex-grow mt-4">
          <div className="h-2 bg-gray-200 rounded-md w-1/4" />
          <div className="flex gap-1.5">
            <div className="h-6 bg-gray-200 rounded-md w-20" />
            <div className="h-6 bg-gray-200 rounded-md w-24" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 pt-4 grid grid-cols-5 gap-2 mt-auto">
          <div className="col-span-1 h-9 bg-gray-200 rounded-lg" />
          <div className="col-span-4 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function CollegeGrid({ colleges, isLoading, onClearFilters }: CollegeGridProps) {
  // 1. Loading State: Render exactly 6 CollegeCard skeletons side-by-side
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <CollegeCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // 2. Empty State: No search results
  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
        {/* Search Illustration */}
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-2xl mb-4 border border-blue-100">
          🔍
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No Colleges Found</h3>
        <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
          Try different filters or search terms to discover matching colleges.
        </p>
        <button
          onClick={onClearFilters}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  // 3. Grid List State
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}
