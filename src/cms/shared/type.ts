type ListFilter =
  | {
      currentPage?: undefined
      limit?: number
    }
  | {
      currentPage: number
      limit: number
    }

export type { ListFilter }
