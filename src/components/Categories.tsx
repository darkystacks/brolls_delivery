import React, { memo } from 'react'

type CategoriesProps = {
	categoryId: number
	onChangeCategory: (index: number) => void
}

const categories = ['Все', 'Роллы', 'Суши', 'Сашими', 'Тартар роллы']

export const Categories: React.FC<CategoriesProps> = memo(
	({ categoryId, onChangeCategory }) => {
		return (
			<div className='categories'>
				<ul>
					{categories.map((category, index) => (
						<li
							key={index}
							className={categoryId === index ? 'active' : ''}
							onClick={() => onChangeCategory(index)}
						>
							{category}
						</li>
					))}
				</ul>
			</div>
		)
	}
)
