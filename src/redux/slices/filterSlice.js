import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	searchValue: '',
	currentPage: 1,
	sort: {
		name: 'популярности ↓',
		sortProperty: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
			state.sort = action.payload.sortObj
		},
	},
})

export const selectSort = state => state.filter.sort
export const selectFilter = state => state.filter
export const selectSearch = state => state.filter.searchValue

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer