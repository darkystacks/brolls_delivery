import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import React, { useEffect, useRef } from 'react'
import Categories from '../components/Categories.jsx'
import ItemBlock from '../components/ItemBlock'
import Skeleton from '../components/ItemBlock/Skeleton.jsx'
import Pagination from '../components/Pagination'
import Sort, { sortList } from '../components/Sort.jsx'
import {
	selectFilter,
	selectSearch,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'
import {
	fetchProducts,
	selectProductData,
} from '../redux/slices/productSlice.js'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isDispatched = useRef(false)
	const isMounted = useRef(false)

	const searchValue = useSelector(selectSearch)
	const { categoryId, sort, currentPage } = useSelector(selectFilter)
	const { items, status } = useSelector(selectProductData)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const getProducts = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId ? `category=${categoryId}` : ''

		dispatch(fetchProducts({ sortBy, order, category, currentPage }))

		window.scrollTo(0, 0)
	}

	//если первый рендер уже произошел, вшиваем параметры в url
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`) //сохранение параметров фильтрации в url
		}
		isMounted.current = true
	}, [categoryId, sort, searchValue, currentPage])

	//проверяем url-params и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sortObj = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)
			dispatch(
				setFilters({
					...params,
					sortObj,
				})
			)
			isDispatched.current = true
		}
	}, [])

	useEffect(() => {
		if (!isDispatched.current) {
			getProducts()
		}
		isDispatched.current = false
	}, [categoryId, sort, searchValue, currentPage])

	const filteredItems = items
		.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map(obj => <ItemBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					categoryId={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все товары:</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>
						К сожалению не удалось получить товары. Попробуйте перезагрузить
						страницу или заходите позже!
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : filteredItems}
				</div>
			)}

			{!searchValue && (
				<Pagination
					currentPage={currentPage}
					onChangePage={number => onChangePage(number)}
				/>
			)}
		</div>
	)
}

export default Home
