import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice'
import filter from './slices/filterSlice'
import product from './slices/productSlice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		product,
	},
})
