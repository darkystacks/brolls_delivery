import { Route, Routes } from 'react-router-dom'

import Cart from './pages/Cart.jsx'
import FullItem from './pages/FullItem.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

import MainLayout from './layouts/MainLayout.jsx'
import './scss/app.scss'

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='item/:id' element={<FullItem />} /> // :параметр(может быть
				сколько угодно)
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
