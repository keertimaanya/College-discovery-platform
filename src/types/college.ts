export interface Placement {
  averagePackage: number
  highestPackage: number
  topRecruiters: string[]
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Course {
  name: string
  duration: string
  fees: number
}

export interface College {
  id: string
  name: string
  location: string
  state: string
  fees: number
  rating: number
  image: string
  type: "Government" | "Private" | "Deemed"
  courses: Course[]
  placements: Placement
  reviews: Review[]
  overview: string
  exams: string[]
  established: number
}

export interface FilterState {
  search: string
  state: string
  type: string
  minFees: number
  maxFees: number
  minRating: number
  exam: string
}
