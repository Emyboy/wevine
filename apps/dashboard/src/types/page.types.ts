export interface CRUDPageProps {
	searchParams: {
		sortOrder?: string
		limit?: string
		sortBy?: string
		q?: string
		page?: string
	}
}

export interface QueryPaginationResponse<T> {
	results: T[]
	currentPage?: number
	totalPages?: number
}
