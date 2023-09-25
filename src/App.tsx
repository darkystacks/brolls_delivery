import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loading } from './components'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home'

import './scss/app.scss'

const Cart = lazy(() => import('./pages/Cart'))
const FullItem = lazy(() => import('./pages/FullItem'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<Suspense fallback={<Loading />}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='item/:id' // :параметр(может быть сколько угодно)
					element={
						<Suspense fallback={<Loading />}>
							<FullItem />
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense fallback={<Loading />}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
