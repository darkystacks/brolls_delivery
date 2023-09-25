import { FilterSliceState, SortPropertyEnum } from '../redux/filter/types'

export const getFilterFromLS = () => {
	const data: string | null = localStorage.getItem('filter')
	const filter = data
		? JSON.parse(data)
		: {
				categoryId: 0,
				searchValue: '',
				currentPage: 1,
				sort: {
					name: 'популярности ↓',
					sortProperty: SortPropertyEnum.RATING_DESC,
				},
		  }

	return filter as FilterSliceState
}
