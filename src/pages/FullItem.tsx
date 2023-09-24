import { DotSpinner } from '@uiball/loaders'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectCartItemById } from '../redux/cart/selectors'
import { addItem } from '../redux/cart/slice'

const FullItem: React.FC = () => {
	const [item, setItem] = useState<{
		id: string
		title: string
		price: number
		imageUrl: string
		sizes: number[]
		types: number[]
	}>()
	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)
	const { id } = useParams()

	const typeNames = ['оригинальные', 'спайси']

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cartItem = useSelector(selectCartItemById(id || ''))
	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		if (item) {
			const itemToCart = {
				id: item.id,
				title: item.title,
				price: item.price,
				imageUrl: item.imageUrl,
				type: typeNames[activeType],
				size: item.sizes[activeSize],
				count: 0,
			}
			dispatch(addItem(itemToCart))
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					'https://64456af0914c816083ce54a5.mockapi.io/items/' + id
				)
				setItem(data)
			} catch (error) {
				alert('Ошибка при получении продукта')
				navigate('/')
			}
		}
		fetchData()
	}, [])

	if (!item) {
		return (
			<div className='fullItemBlock__loader'>
				<DotSpinner size={60} speed={0.9} color='#9b9cec' />
			</div>
		)
	}

	return (
		<div className='container fullItemBlockContainer'>
			<div className='fullItemBlock'>
				<img className='fullItemBlock__image' src={item.imageUrl} alt='item' />
				<h2>{item.title}</h2>
				<h4>{item.price} руб.</h4>
				<div className='fullItemBlock__selector'>
					<ul>
						{item.types.map((type, index) => (
							<li
								key={index}
								onClick={() => setActiveType(type)}
								className={activeType === type ? 'active' : ''}
							>
								{typeNames[type]}
							</li>
						))}
					</ul>
					<ul>
						{item.sizes.map((size, index) => (
							<li
								key={index}
								onClick={() => setActiveSize(index)}
								className={activeSize === index ? 'active' : ''}
							>
								{size} шт.
							</li>
						))}
					</ul>
				</div>
				<div className='fullItemBlock__bottom'>
					<div className='fullItemBlock__price'>от {item.price} ₽</div>
					<button
						onClick={onClickAdd}
						className='button button--outline button--add'
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>

			<div className='fullItemBlock__description'>
				<h2>Описание</h2>
				просто описание, к сожалению, при проектировании жсона я не учел, что
				описание может понадобиться, давайте представим что оно тут есть...
			</div>
		</div>
	)
}

export default FullItem
