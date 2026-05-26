"use client";

import React from "react";
import { CompareSelector } from "@/components/compare/CompareSelector";
import { CompareTable } from "@/components/compare/CompareTable";
import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/Button";

export default function ComparePage() {
  const { compareIds, clearCompare } = useCompare();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Page Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Compare Colleges
          </h1>
          <p className="text-sm font-semibold text-gray-500">
            Analyze up to 3 institutions side-by-side on placements, ratings, and yearly fees.
          </p>
        </div>

        {/* Clear all comparisons button */}
        {compareIds.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompare}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 font-bold self-start sm:self-auto h-10 px-4"
          >
            Clear Comparison ({compareIds.length})
          </Button>
        )}
      </div>

      {/* 1. Compare Selector (Inputs search and 3-slot display chips) */}
      <CompareSelector />

      {/* 2. Compare Table (Columns grid comparing fields with highlighting) */}
      <div className="pt-4">
        <CompareTable />
      </div>
    </div>
  );
}
