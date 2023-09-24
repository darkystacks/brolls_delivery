import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product, SearchPizzaParams } from './types'
import axios from 'axios'

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
