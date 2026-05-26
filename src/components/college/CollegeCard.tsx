"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { College } from "@/types/college";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useSaved } from "@/context/SavedContext";
import { useCompare } from "@/context/CompareContext";

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const router = useRouter();
  const { isSaved, toggleSaved } = useSaved();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);

  // Navigate to details page, but stop if user is clicking action buttons
  const handleCardClick = () => {
    router.push(`/college/${college.id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    toggleSaved(college.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    if (inCompare) {
      removeFromCompare(college.id);
    } else {
      const error = addToCompare(college.id);
      if (error) {
        alert(error); // Direct error feedback matching specifications
      }
    }
  };

  return (
    <Card hoverable onClick={handleCardClick} className="flex flex-col h-full group bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* College Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {/* Placeholder or real image */}
        <div className="relative h-full w-full">
          <Image
            src={college.image}
            alt={college.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <Badge variant={college.type === "Government" ? "green" : college.type === "Private" ? "blue" : "orange"}>
            {college.type}
          </Badge>
        </div>

        {/* Rating Overlay */}
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <span>★</span>
          <span>{college.rating.toFixed(1)}</span>
        </div>

        {/* Location Overlay */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
          📍 {college.location}, {college.state}
        </div>
      </div>

      {/* College Details Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
          {college.name}
        </h3>

        {/* Tuition / Average package */}
        <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400">Fees (Per Year)</span>
            <span className="text-sm font-bold text-gray-900">
              ₹{(college.fees / 100000).toFixed(2)} Lakh
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-gray-400">Avg Placement</span>
            <span className="text-sm font-bold text-green-600">
              ₹{(college.placements.averagePackage / 100000).toFixed(1)} LPA
            </span>
          </div>
        </div>

        {/* Top 2 Courses */}
        <div className="mt-4 space-y-2 flex-grow">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Featured Programs</span>
          <div className="flex flex-wrap gap-1.5">
            {college.courses.slice(0, 2).map((course, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-50 border border-gray-100 text-gray-600 font-medium px-2 py-1 rounded-md max-w-[240px] truncate"
                title={course.name}
              >
                {course.name.replace(/B\.Tech|B\.E\./, "").trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-5 gap-2">
          {/* Save Button (Heart) */}
          <button
            onClick={handleSave}
            className={`col-span-1 border border-gray-200 rounded-lg flex items-center justify-center transition-all ${
              saved
                ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                : "bg-white text-gray-400 hover:text-gray-600 hover:border-gray-300"
            }`}
            title={saved ? "Remove from Saved" : "Save College"}
          >
            <svg
              className={`h-5 w-5 transition-transform ${saved ? "scale-110 fill-current" : ""}`}
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Compare Button */}
          <Button
            variant={inCompare ? "primary" : "outline"}
            size="sm"
            onClick={handleCompare}
            className="col-span-4"
          >
            {inCompare ? (
              <span className="flex items-center gap-1">
                ✓ Added
              </span>
            ) : (
              <span className="flex items-center gap-1">
                + Compare
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
