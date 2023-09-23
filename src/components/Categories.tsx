import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'
import React, { memo } from 'react'

type CategoriesProps = {
	categoryId: number
	onChangeCategory: (index: number) => void
}

const categories = ['Все', 'Роллы', 'Суши', 'Сашими', 'Тартар роллы']

const Categories: React.FC<CategoriesProps> = memo(
	({ categoryId, onChangeCategory }) => {
		useWhyDidYouUpdate('Categories', {
			categoryId,
			onChangeCategory,
		})

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

export default Categories
