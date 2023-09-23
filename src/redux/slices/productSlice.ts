import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Product = {
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

interface ProductSliceState {
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

export const fetchProducts = createAsyncThunk<Product[], SearchPizzaParams>(
	'product/fetchProductsStatus',
	async params => {
		const { sortBy, order, category, currentPage, search } = params
		const { data } = await axios.get<Product[]>(
			`https://64456af0914c816083ce54a5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}` +
				(!search ? `&page=${currentPage}&limit=4&` : '')
		)

		return data
	}
)

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

export const selectProductData = (state: RootState) => state.product

export const { setItems } = productSlice.actions
export default productSlice.reducer
