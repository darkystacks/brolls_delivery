import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				obj =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				obj =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			)
			if (findItem && findItem.count > 1) {
				findItem.count--
			} else {
				state.items = state.items.filter(obj => {
					return !(
						obj.id === action.payload.id &&
						obj.type === action.payload.type &&
						obj.size === action.payload.size
					)
				})
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)
		},
		removeItem(state, action: PayloadAction<CartItem>) {
			state.items = state.items.filter(obj => {
				return !(
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
				)
			})

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions

export default cartSlice.reducer
