import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
	'product/fetchProductsStatus',
	async (params, thunkAPI) => {
		const { sortBy, order, category, currentPage } = params
		const searchValue = thunkAPI.getState().filter.searchValue
		const { data } = await axios.get(
			`https://64456af0914c816083ce54a5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}` +
				(!searchValue ? `&page=${currentPage}&limit=4&` : '')
		)

		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', //loading, success, error
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchProducts.pending]: state => {
			//ждем ответ:
			state.status = 'loading'
			state.items = []
		},
		[fetchProducts.fulfilled]: (state, action) => {
			//если запрос выполнится успешно:
			state.items = action.payload
			state.status = 'success'
		},
		[fetchProducts.rejected]: state => {
			//ошибка при выполнении запроса:
			state.status = 'error'
			state.items = []
			console.log('ошибка при выполнении запроса')
		},
	},
})

export const selectProductData = state => state.product

export const { setItems } = productSlice.actions
export default productSlice.reducer
