import { useState, useEffect, useMemo } from "react";
import collegesData from "@/data/colleges.json";
import { College, FilterState } from "@/types/college";

export function useColleges(filters: FilterState) {
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Mount Skeleton Effect:
  // Shows the premium animated pulsing skeletons once when the user first lands
  // on the page, then turns off loading. This guarantees a clean load without
  // ever causing a rendering loop or flickering later during active search/filtering.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 2. Synchronous Memoized Filtering:
  // Uses React's useMemo to compute matching colleges instantly on the client-side.
  // Watches individual primitive properties to prevent object reference loops.
  const filteredColleges = useMemo(() => {
    const allColleges = collegesData as College[];
    const { search, state, type, minFees, maxFees, minRating, exam } = filters;

    return allColleges.filter((college) => {
      // Search filter: matches name or location
      if (search) {
        const query = search.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(query);
        const matchesLocation = college.location.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation) {
          return false;
        }
      }

      // State filter
      if (state && college.state !== state) {
        return false;
      }

      // Type filter (Government | Private | Deemed)
      if (type && college.type !== type) {
        return false;
      }

      // Fees range filter
      if (college.fees < minFees || college.fees > maxFees) {
        return false;
      }

      // Rating filter
      if (college.rating < minRating) {
        return false;
      }

      // Exam filter
      if (exam && !college.exams.includes(exam)) {
        return false;
      }

      return true;
    });
  }, [
    filters.search,
    filters.state,
    filters.type,
    filters.minFees,
    filters.maxFees,
    filters.minRating,
    filters.exam,
  ]);

  return {
    filteredColleges,
    totalCount: filteredColleges.length,
    isLoading,
  };
}
