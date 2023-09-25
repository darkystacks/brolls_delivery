import { useSelector } from 'react-redux'

import { useCallback, useEffect, useRef } from 'react'

import {
	Categories,
	ItemBlock,
	Pagination,
	Skeleton,
	SortPopup,
} from '../components'

import { selectFilter } from '../redux/filter/selectors.ts'
import {
	clearFilters,
	setCategoryId,
	setCurrentPage,
} from '../redux/filter/slice.js'
import { fetchProducts } from '../redux/product/asyncActions.ts'
import { selectProductData } from '../redux/product/selectors.ts'
import { Product } from '../redux/product/types.ts'
import { useAppDispatch } from '../redux/store.ts'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const isMounted = useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items, status } = useSelector(selectProductData)

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const onClickClear = () => {
		dispatch(clearFilters())
	}

	const getProducts = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchProducts({
				sortBy,
				order,
				category,
				currentPage: String(currentPage),
				search,
			})
		)

		window.scrollTo(0, 0)
	}

	useEffect(() => {
		if (isMounted.current) {
			const filterJson = JSON.stringify({
				categoryId,
				sort,
				currentPage,
				searchValue,
			})
			localStorage.setItem('filter', filterJson)
		}

		isMounted.current = true
	}, [categoryId, sort, currentPage, searchValue])

	useEffect(() => {
		getProducts()
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const filteredItems = items
		.filter((el: Product) =>
			el.title.toLowerCase().includes(searchValue.toLowerCase())
		)
		.map((obj: Product) => <ItemBlock key={obj.id} {...obj} />)

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
				<div className='content__top-button' onClick={onClickClear}>
					очистить
				</div>
				<SortPopup value={sort} />
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
