import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout.jsx'
import FullItem from './pages/FullItem'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import { DotSpinner } from '@uiball/loaders'
import './scss/app.scss'

const Cart = lazy(() => import('./pages/Cart'))

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<Suspense
							fallback={
								<div className='loader'>
									<DotSpinner size={60} speed={0.9} color='#9b9cec' />
								</div>
							}
						>
							<Cart />
						</Suspense>
					}
				/>
				<Route path='item/:id' element={<FullItem />} /> // :параметр(может быть
				сколько угодно)
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
