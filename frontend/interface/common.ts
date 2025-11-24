
  
export interface FullColorListInterface {
    [specialVariants: string]: {
        [variant: string]: {
        [color: string]: {
            [level: string]: string
        }
        }
    }
}

export interface PaginationQueryParamsInterface {
    pageNum?: number
    pageLimit?: number
    pageAll?: boolean
    sortKey?: string
    sortAsc?: boolean
}
  