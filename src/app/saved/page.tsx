"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import collegesData from "@/data/colleges.json";
import { College } from "@/types/college";
import { useSaved } from "@/context/SavedContext";
import { CollegeCard } from "@/components/college/CollegeCard";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function SavedPage() {
  const router = useRouter();
  const { savedIds } = useSaved();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 4. Protect /saved page: Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("auth-user");
    if (!user) {
      // Redirect to /login and pass the current path as a query param so we can redirect back!
      router.push("/login?redirectTo=/saved");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Loading state while checking authentication to prevent layout flashing
  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Spinner size="lg" className="text-blue-600" />
        <p className="text-gray-500 font-semibold text-sm animate-pulse">
          Verifying authorization...
        </p>
      </div>
    );
  }

  // Find matching college profiles from colleges.json
  const savedColleges = savedIds
    .map((id) => (collegesData as College[]).find((c) => c.id === id))
    .filter(Boolean) as College[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Header section showing total count */}
      <div className="border-b border-gray-200 pb-5 space-y-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Saved Colleges
        </h1>
        <p className="text-sm font-semibold text-gray-500">
          {savedColleges.length === 1
            ? "1 Premium College Saved"
            : `${savedColleges.length} Premium Colleges Saved`}
        </p>
      </div>

      {/* If no saved colleges, show empty state */}
      {savedColleges.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[40vh]">
          <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center text-3xl mb-4 border border-red-100">
            ❤️
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1.5">
            No saved colleges yet
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
            You haven't bookmarked any colleges yet. Explore the home page to save your favorite engineering and tech colleges.
          </p>
          <Link href="/">
            <Button variant="primary" className="px-6 py-2.5 font-bold">
              Browse Colleges
            </Button>
          </Link>
        </div>
      ) : (
        /* Render Grid of College Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
