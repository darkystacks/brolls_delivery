import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getFilterFromLS } from '../../utils/getFilterFromLS'
import { FilterSliceState, Sort, SortPropertyEnum } from './types'

const initialState: FilterSliceState = getFilterFromLS()

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
		clearFilters(state) {
			state.categoryId = 0
			state.searchValue = ''
			state.currentPage = 1
			state.sort = {
				name: 'популярности ↓',
				sortProperty: SortPropertyEnum.RATING_DESC,
			}
		},
	},
})

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
	clearFilters,
} = filterSlice.actions

export default filterSlice.reducer
