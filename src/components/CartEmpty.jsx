import React from 'react'
import { Link } from 'react-router-dom'
import cartEmptyPng from '../assets/img/empty-cart.png'

const CartEmpty = () => {
	return (
		<div className='content'>
			<div className='container container--cart'>
				<div className='cart cart--empty'>
					<h2>
						Корзина пустая <span>😕</span>
					</h2>
					<p>
						Вероятней всего, вы еще не добавили ни одной позиции.
						<br />
						Для того, чтобы добавить что-то, перейдите на главную страницу.
					</p>
					<img src={cartEmptyPng} alt='Empty cart' />
					<Link to='/' className='button button--black'>
						<span>Вернуться назад</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CartEmpty
