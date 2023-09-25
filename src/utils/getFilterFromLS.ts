import { FilterSliceState } from '../redux/filter/types'

export const getFilterFromLS = () => {
	const data: string | null = localStorage.getItem('filter')
	const filter = data ? JSON.parse(data) : []

	return filter as FilterSliceState
}
