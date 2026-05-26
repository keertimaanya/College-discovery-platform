import { useState, useEffect } from "react";
import collegesData from "@/data/colleges.json";
import { College, FilterState } from "@/types/college";

export function useColleges(filters: FilterState) {
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Destructure primitive values to use strictly in the useEffect dependency array.
  // This guarantees that the filtering effect only triggers when an actual filter value
  // changes, making it 100% immune to infinite rendering loops caused by object reference shifts.
  const { search, state, type, minFees, maxFees, minRating, exam } = filters;

  useEffect(() => {
    setIsLoading(true);

    const handler = setTimeout(() => {
      const allColleges = collegesData as College[];

      const filtered = allColleges.filter((college) => {
        // Search filter: Matches college name or location (case-insensitive)
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

      setFilteredColleges(filtered);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(handler);
  }, [search, state, type, minFees, maxFees, minRating, exam]);

  return {
    filteredColleges,
    totalCount: filteredColleges.length,
    isLoading,
  };
}
