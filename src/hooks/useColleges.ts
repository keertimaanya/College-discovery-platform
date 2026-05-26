import { useState, useEffect } from "react";
import collegesData from "@/data/colleges.json";
import { College, FilterState } from "@/types/college";

export function useColleges(filters: FilterState) {
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Small simulated network latency (150ms) to allow the loading spinner
    // to give professional, responsive feedback to the user on filter changes.
    const handler = setTimeout(() => {
      const allColleges = collegesData as College[];

      const filtered = allColleges.filter((college) => {
        // Search filter: Matches college name or location (case-insensitive)
        if (filters.search) {
          const query = filters.search.toLowerCase();
          const matchesName = college.name.toLowerCase().includes(query);
          const matchesLocation = college.location.toLowerCase().includes(query);
          if (!matchesName && !matchesLocation) {
            return false;
          }
        }

        // State filter
        if (filters.state && college.state !== filters.state) {
          return false;
        }

        // Type filter (Government | Private | Deemed)
        if (filters.type && college.type !== filters.type) {
          return false;
        }

        // Fees range filter (checks if average college fees fall within bounds)
        if (college.fees < filters.minFees || college.fees > filters.maxFees) {
          return false;
        }

        // Rating filter (checks if rating is at least the minimum selected rating)
        if (college.rating < filters.minRating) {
          return false;
        }

        // Exam filter
        if (filters.exam && !college.exams.includes(filters.exam)) {
          return false;
        }

        return true;
      });

      setFilteredColleges(filtered);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(handler);
  }, [filters]);

  return {
    filteredColleges,
    totalCount: filteredColleges.length,
    isLoading,
  };
}
