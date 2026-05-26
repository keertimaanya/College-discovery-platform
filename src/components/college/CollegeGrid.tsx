"use client";

import React from "react";
import { College } from "@/types/college";
import { CollegeCard } from "./CollegeCard";
import { Spinner } from "../ui/Spinner";

interface CollegeGridProps {
  colleges: College[];
  isLoading: boolean;
  onClearFilters: () => void;
}

export function CollegeGrid({ colleges, isLoading, onClearFilters }: CollegeGridProps) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Spinner size="lg" className="text-blue-600" />
        <p className="text-gray-500 font-semibold text-sm animate-pulse">
          Filtering matching colleges...
        </p>
      </div>
    );
  }

  // 2. Empty State
  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-2xl mb-4">
          🔍
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No Colleges Found</h3>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          We couldn't find any institutions matching your exact filters. Try broadening your criteria or reset your choices.
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
