import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import cart from './cart/slice'
import filter from './filter/slice'
import product from './product/slice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		product,
	},
	middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
