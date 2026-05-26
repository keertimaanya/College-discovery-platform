"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import collegesData from "@/data/colleges.json";
import { College } from "@/types/college";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSaved } from "@/context/SavedContext";
import { useCompare } from "@/context/CompareContext";

interface CollegeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const { isSaved, toggleSaved } = useSaved();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "placements" | "reviews">("overview");

  // 1. Find matching college from mock database
  const college = (collegesData as College[]).find((c) => c.id === id);

  // 2. Empty/Not Found state
  if (!college) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center text-2xl mb-4 text-red-500">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h2>
        <p className="text-gray-500 text-sm max-w-md mb-6">
          We couldn't find any college matching the ID "{id}". It may have been removed or the URL is incorrect.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Search</Button>
        </Link>
      </div>
    );
  }

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);

  // Format currency helpers (Indian standard)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatLakhs = (value: number) => {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  };

  const formatLpa = (value: number) => {
    return `₹${(value / 100000).toFixed(1)} LPA`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Back button link */}
      <div>
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors gap-2">
          ← Back to Search
        </Link>
      </div>

      {/* 2. Top Header Section */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Banner image wrapper */}
        <div className="relative h-[240px] w-full bg-gray-100">
          <Image
            src={college.image}
            alt={college.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle gradient overlay to read headings cleanly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Header Metadata Info */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={college.type === "Government" ? "green" : college.type === "Private" ? "blue" : "orange"}>
                  {college.type}
                </Badge>
                <span className="text-xs text-gray-500 font-bold">Est. {college.established}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
                <span>📍 {college.location}, {college.state}</span>
                <span className="flex items-center gap-1 text-amber-500">
                  ★ <span className="text-gray-900 font-bold">{college.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 lg:self-end">
              {/* Save Trigger */}
              <button
                onClick={() => toggleSaved(college.id)}
                className={`flex-1 sm:flex-initial h-11 px-5 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                  saved
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                    : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <svg
                  className={`h-5 w-5 ${saved ? "fill-current scale-110" : ""}`}
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
                {saved ? "Saved" : "Save College"}
              </button>

              {/* Compare Trigger */}
              <Button
                variant={inCompare ? "primary" : "outline"}
                onClick={() => {
                  if (inCompare) {
                    removeFromCompare(college.id);
                  } else {
                    const err = addToCompare(college.id);
                    if (err) alert(err);
                  }
                }}
                className="flex-grow sm:flex-grow-0 h-11 text-sm font-bold px-6 rounded-xl"
              >
                {inCompare ? (
                  <span className="flex items-center gap-1.5">✓ Added to Compare</span>
                ) : (
                  <span className="flex items-center gap-1.5">+ Add to Compare</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inline Navigation Tabs */}
      <div className="border-b border-gray-200 flex space-x-8 overflow-x-auto scrollbar-none">
        {(["overview", "courses", "placements", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-sm font-bold capitalize transition-all border-b-2 border-transparent shrink-0 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panel Renderings */}
      <div className="min-h-[30vh]">
        {/* 4. Overview Tab Panel */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Institution Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed sm:text-base">
                  {college.overview}
                </p>
              </Card>

              {/* Accepted exams badges block */}
              <Card className="p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Accepted Entrance Exams</h3>
                <div className="flex flex-wrap gap-2.5">
                  {college.exams.map((exam) => (
                    <Badge key={exam} variant="orange" className="px-3.5 py-1.5 text-xs">
                      {exam}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Key stats row */}
            <div className="space-y-6">
              <Card className="p-6 space-y-5">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Key Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Tuition Fees</span>
                    <span className="text-sm font-bold text-gray-800 mt-1">{formatLakhs(college.fees)}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Total Rating</span>
                    <span className="text-sm font-bold text-gray-800 mt-1 flex items-center gap-1">
                      ★ {college.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Avg Placement</span>
                    <span className="text-sm font-bold text-green-600 mt-1">{formatLpa(college.placements.averagePackage)}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Total Courses</span>
                    <span className="text-sm font-bold text-gray-800 mt-1">{college.courses.length} Programs</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 5. Courses Tab Panel */}
        {activeTab === "courses" && (
          <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Course Name</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4 text-right">Yearly Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {college.courses.map((course, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"}
                    >
                      <td className="px-6 py-4 font-bold text-gray-800">{course.name}</td>
                      <td className="px-6 py-4 font-medium text-gray-500">{course.duration}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">{formatCurrency(course.fees)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* 6. Placements Tab Panel */}
        {activeTab === "placements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avg Package */}
              <Card className="p-6 flex items-center justify-between bg-white border border-gray-200 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Salary Package</span>
                  <p className="text-3xl font-extrabold text-gray-900">{formatLpa(college.placements.averagePackage)}</p>
                </div>
                <div className="text-3xl p-3 bg-blue-50 text-blue-500 rounded-full">📈</div>
              </Card>

              {/* Highest Package */}
              <Card className="p-6 flex items-center justify-between bg-white border border-gray-200 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Highest Salary Package</span>
                  <p className="text-3xl font-extrabold text-green-600">{formatLpa(college.placements.highestPackage)}</p>
                </div>
                <div className="text-3xl p-3 bg-green-50 text-green-500 rounded-full">🔥</div>
              </Card>
            </div>

            {/* Recruiters Card */}
            <Card className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2.5">
                {college.placements.topRecruiters.map((recruiter) => (
                  <Badge key={recruiter} variant="blue" className="px-3.5 py-1.5 text-xs">
                    {recruiter}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 7. Reviews Tab Panel */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Reviews Average Stats */}
            <Card className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Student Review</span>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-gray-900">{college.rating.toFixed(1)}</span>
                  <div className="space-y-0.5">
                    <div className="text-amber-400 font-bold text-lg">
                      {"★".repeat(Math.round(college.rating))}
                      {"☆".repeat(5 - Math.round(college.rating))}
                    </div>
                    <span className="text-xs font-medium text-gray-500">Based on {college.reviews.length} ratings</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-500">
                100% Verified Student Reviews
              </div>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <Card key={review.id} className="p-6 space-y-4 bg-white border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
                      <div className="text-xs text-amber-500 font-bold flex items-center gap-1">
                        <span>{"★".repeat(review.rating)}</span>
                        <span className="text-gray-400 font-medium">({review.rating.toFixed(1)})</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
