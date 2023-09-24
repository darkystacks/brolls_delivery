import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductSliceState, Status } from './types'
import { fetchProducts } from './asyncActions'

const initialState: ProductSliceState = {
	items: [],
	status: Status.LOADING, //loading, success, error
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Product[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			//ждем ответ:
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			//если запрос выполнится успешно:
			state.items = action.payload
			state.status = Status.FULFILLED
		})
		builder.addCase(fetchProducts.rejected, state => {
			//ошибка при выполнении запроса:
			state.status = Status.REJECTED
			state.items = []
			console.log('ошибка при выполнении запроса')
		})
	},
})

export const { setItems } = productSlice.actions
export default productSlice.reducer
