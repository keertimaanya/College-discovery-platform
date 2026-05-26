"use client";

import React from "react";
import collegesData from "@/data/colleges.json";
import { FilterState } from "@/types/college";

interface CollegeFiltersProps {
  filters: FilterState;
  onFilterChange: (updater: (prev: FilterState) => FilterState) => void;
  onClearFilters: () => void;
}

export function CollegeFilters({ filters, onFilterChange, onClearFilters }: CollegeFiltersProps) {
  // Extract unique states dynamically from colleges.json
  const states = Array.from(
    new Set(collegesData.map((c) => c.state))
  ).sort() as string[];

  // Define a comprehensive list of popular exams represented in the database
  const exams = [
    "JEE Main",
    "JEE Advanced",
    "GATE",
    "BITSAT",
    "VITEEE",
    "MHT CET",
    "COMEDK",
    "WBJEE",
  ];

  // Helper to update specific fields in the FilterState
  const updateField = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* State Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => updateField("state", e.target.value)}
          className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* College Type Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          College Type
        </label>
        <div className="flex flex-col space-y-2">
          {["All Types", "Government", "Private", "Deemed"].map((typeOption) => {
            const value = typeOption === "All Types" ? "" : typeOption;
            const id = `type-${typeOption.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <label
                key={typeOption}
                htmlFor={id}
                className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none group"
              >
                <input
                  type="radio"
                  id={id}
                  name="college-type"
                  checked={filters.type === value}
                  onChange={() => updateField("type", value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all cursor-pointer"
                />
                <span className="group-hover:text-gray-950 transition-colors">
                  {typeOption}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fees Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Max Fees (per year)
          </label>
          <span className="text-sm font-semibold text-blue-600">
            {filters.maxFees >= 2000000
              ? "No Limit"
              : `₹${(filters.maxFees / 100000).toFixed(1)} Lakh`}
          </span>
        </div>
        <input
          type="range"
          min="50000"
          max="2000000"
          step="50000"
          value={filters.maxFees}
          onChange={(e) => updateField("maxFees", parseInt(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
          <span>₹50K</span>
          <span>₹10 Lakh</span>
          <span>₹20 Lakh+</span>
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[3.0, 3.5, 4.0, 4.5].map((ratingOption) => (
            <button
              key={ratingOption}
              type="button"
              onClick={() => updateField("minRating", ratingOption)}
              className={`h-9 rounded-lg text-xs font-bold transition-all border ${
                filters.minRating === ratingOption
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {ratingOption.toFixed(1)}★+
            </button>
          ))}
        </div>
      </div>

      {/* Entrance Exams Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Entrance Exam
        </label>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none group">
            <input
              type="radio"
              checked={filters.exam === ""}
              onChange={() => updateField("exam", "")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all cursor-pointer"
            />
            <span className="group-hover:text-gray-950 transition-colors">
              Any Exam
            </span>
          </label>
          {exams.map((examName) => (
            <label
              key={examName}
              className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none group"
            >
              <input
                type="radio"
                checked={filters.exam === examName}
                onChange={() => updateField("exam", examName)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition-all cursor-pointer"
              />
              <span className="group-hover:text-gray-950 transition-colors">
                {examName}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
