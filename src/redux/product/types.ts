export type Product = {
	id: string
	title: string
	price: number
	imageUrl: string
	types: number[]
	sizes: number[]
	rating: number
}

export enum Status {
	LOADING = 'loading',
	FULFILLED = 'success',
	REJECTED = 'error',
}

export interface ProductSliceState {
	items: Product[]
	status: Status
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	currentPage: string
	search: string
}
