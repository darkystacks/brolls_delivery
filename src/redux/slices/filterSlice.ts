import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type Sort = {
	name: string
	sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
	categoryId: number
	searchValue: string
	currentPage: number
	sort: Sort
}

const initialState: FilterSliceState = {
	categoryId: 0,
	searchValue: '',
	currentPage: 1,
	sort: {
		name: 'популярности ↓',
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
				state.searchValue = action.payload.searchValue
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING_DESC,
				}
				state.searchValue = ''
			}
		},
	},
})

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
