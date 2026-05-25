export interface CollegeStats {
  students: number;
  facultyRatio: string;
  employmentRate: number;
}

export interface CollegeRequirements {
  gpa?: number;
  sat?: number;
  act?: number;
}

export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
  tuition: number;
  admissionRate: number;
  ranking: number;
  featured: boolean;
  logo: string;
  image: string;
  description: string;
  website: string;
  type: "public" | "private";
  programs: string[];
  requirements: CollegeRequirements;
  stats: CollegeStats;
}

export interface FilterOptions {
  search: string;
  type: "all" | "public" | "private";
  maxTuition: number;
  minRating: number;
  program: string;
}
