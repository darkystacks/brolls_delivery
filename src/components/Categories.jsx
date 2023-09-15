const Categories = ({ categoryId, onChangeCategory }) => {
	const categories = ['Все', 'Роллы', 'Суши', 'Сашими', 'Тартар роллы']

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

export default Categories
