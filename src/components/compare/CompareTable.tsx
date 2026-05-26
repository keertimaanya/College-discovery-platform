"use client";

import React from "react";
import Link from "next/link";
import collegesData from "@/data/colleges.json";
import { College } from "@/types/college";
import { useCompare } from "@/context/CompareContext";
import { Badge } from "../ui/Badge";

export function CompareTable() {
  const { compareIds } = useCompare();

  // Retrieve full college profiles for selected comparison IDs
  const selectedColleges = compareIds
    .map((id) => (collegesData as College[]).find((c) => c.id === id))
    .filter(Boolean) as College[];

  // 1. Empty State: 0 colleges added to compare list
  if (selectedColleges.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[30vh] animate-fade-in">
        <div className="h-14 w-14 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-4 border border-gray-150">
          📊
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1.5">
          Start adding colleges to compare
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm max-w-sm leading-relaxed">
          Use the search bar above to select two or three colleges and compare their courses, placements, and ratings side-by-side.
        </p>
      </div>
    );
  }

  // 2. Empty State: 1 college added to compare list (requires at least 2)
  if (selectedColleges.length === 1) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[30vh] animate-fade-in">
        <div className="h-14 w-14 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-4 border border-gray-150">
          📊
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1.5">
          Select at least 2 colleges to compare
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm max-w-sm leading-relaxed">
          You have selected one college. Add at least one more college to begin the side-by-side comparison.
        </p>
      </div>
    );
  }

  // Calculate the "Best Value" markers dynamically for highlighting
  const feesArray = selectedColleges.map((c) => c.fees);
  const ratingsArray = selectedColleges.map((c) => c.rating);
  const avgPackArray = selectedColleges.map((c) => c.placements.averagePackage);

  const minFees = Math.min(...feesArray);
  const maxRating = Math.max(...ratingsArray);
  const maxAvgPackage = Math.max(...avgPackArray);

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatLpa = (val: number) => {
    return `₹${(val / 100000).toFixed(1)} LPA`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">
                Comparison Metric
              </th>
              {selectedColleges.map((college) => (
                <th key={college.id} className="px-6 py-4 w-1/4">
                  <div className="space-y-1">
                    <Link
                      href={`/college/${college.id}`}
                      className="font-bold text-gray-900 hover:text-blue-600 transition-colors block text-sm sm:text-base leading-snug line-clamp-1"
                    >
                      {college.name}
                    </Link>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                      📍 {college.location}, {college.state}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150">
            {/* 1. College Name */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                College Name
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 font-bold text-gray-950 text-sm">
                  {c.name}
                </td>
              ))}
            </tr>

            {/* 2. Location */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Location
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 font-semibold text-gray-700 text-sm">
                  {c.location}, {c.state}
                </td>
              ))}
            </tr>

            {/* 3. Type */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Type
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 text-sm">
                  <Badge variant={c.type === "Government" ? "green" : c.type === "Private" ? "blue" : "orange"}>
                    {c.type}
                  </Badge>
                </td>
              ))}
            </tr>

            {/* 4. Fees per year (Lowest is Best!) */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Fees per year
              </td>
              {selectedColleges.map((c) => {
                const isBest = c.fees === minFees;
                return (
                  <td
                    key={c.id}
                    className={`px-6 py-4 text-sm font-extrabold ${
                      isBest ? "bg-green-50/75 text-green-700 font-black border-l-4 border-green-500" : "text-gray-900"
                    }`}
                  >
                    <span>{formatCurrency(c.fees)}</span>
                    {isBest && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-800 uppercase tracking-wider">
                        ★ Lowest Fee
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 5. Rating (Highest is Best!) */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Rating
              </td>
              {selectedColleges.map((c) => {
                const isBest = c.rating === maxRating;
                return (
                  <td
                    key={c.id}
                    className={`px-6 py-4 text-sm font-bold ${
                      isBest ? "bg-green-50/75 text-green-700 font-black border-l-4 border-green-500" : "text-gray-800"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      ★ {c.rating.toFixed(1)}
                    </span>
                    {isBest && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-800 uppercase tracking-wider">
                        ★ Top Rated
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 6. Average Package (Highest is Best!) */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Average Package
              </td>
              {selectedColleges.map((c) => {
                const isBest = c.placements.averagePackage === maxAvgPackage;
                return (
                  <td
                    key={c.id}
                    className={`px-6 py-4 text-sm font-bold ${
                      isBest ? "bg-green-50/75 text-green-700 font-black border-l-4 border-green-500" : "text-gray-800"
                    }`}
                  >
                    <span>{formatLpa(c.placements.averagePackage)}</span>
                    {isBest && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-800 uppercase tracking-wider">
                        ★ Top Avg Package
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 7. Highest Package */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Highest Package
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 font-bold text-gray-900 text-sm">
                  {formatLpa(c.placements.highestPackage)}
                </td>
              ))}
            </tr>

            {/* 8. Accepted Exams */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Accepted Exams
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {c.exams.map((exam) => (
                      <Badge key={exam} variant="orange" className="px-2 py-0.5 text-[10px]">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 9. Total Courses */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">
                Total Courses
              </td>
              {selectedColleges.map((c) => (
                <td key={c.id} className="px-6 py-4 font-semibold text-gray-700 text-sm">
                  {c.courses.length} Programs
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
