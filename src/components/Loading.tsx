import { DotSpinner } from '@uiball/loaders'
import React from 'react'

export const Loading: React.FC = () => {
	return (
		<div>
			<div className='loader'>
				<DotSpinner size={60} speed={0.9} color='#9b9cec' />
			</div>
		</div>
	)
}
