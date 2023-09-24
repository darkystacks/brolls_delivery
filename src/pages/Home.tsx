import { useSelector } from 'react-redux'

import { useCallback, useEffect } from 'react'
import Categories from '../components/Categories.tsx'
import Skeleton from '../components/ItemBlock/Skeleton.tsx'
import ItemBlock from '../components/ItemBlock/index.tsx'
import Pagination from '../components/Pagination/index.tsx'
import Sort from '../components/Sort.tsx'
import { selectFilter } from '../redux/filter/selectors.ts'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice.js'
import { fetchProducts } from '../redux/product/asyncActions.ts'
import { selectProductData } from '../redux/product/selectors.ts'
import { useAppDispatch } from '../redux/store.ts'
import { Product } from '../redux/product/types.ts'

const Home: React.FC = () => {
	// const navigate = useNavigate()

	const dispatch = useAppDispatch()
	// const isDispatched = useRef(false)
	// const isMounted = useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items, status } = useSelector(selectProductData)

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
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

	//если первый рендер уже произошел, вшиваем параметры в url
	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			currentPage,
	// 		})
	// 		navigate(`?${queryString}`) //сохранение параметров фильтрации в url
	// 	}
	// 	if (!window.location.search) {
	// 		dispatch(fetchProducts({} as SearchPizzaParams))
	// 	}
	// }, [categoryId, sort, searchValue, currentPage])

	//проверяем url-params и сохраняем в редаксе
	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(
	// 			window.location.search.substring(1)
	// 		) as unknown as SearchPizzaParams
	// 		console.log(params)
	// 		const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || sortList[0],
	// 			})
	// 		)
	// 		isDispatched.current = true
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (!isDispatched.current) {
	// 		getProducts()
	// 	}
	// 	isDispatched.current = false
	// }, [categoryId, sort, searchValue, currentPage])

	// const filteredItems = items
	// 	.filter((el: any) =>
	// 		el.title.toLowerCase().includes(searchValue.toLowerCase())
	// 	)
	// 	.map((obj: any) => <ItemBlock key={obj.id} {...obj} />)

	// const skeletons = [...new Array(6)].map((_, index) => (
	// 	<Skeleton key={index} />
	// ))

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
				<Sort value={sort} />
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
