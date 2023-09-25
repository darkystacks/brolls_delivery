import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={500}
		viewBox='0 0 280 500'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<rect x='0' y='300' rx='10' ry='10' width='280' height='88' />
		<rect x='0' y='408' rx='10' ry='10' width='95' height='30' />
		<rect x='128' y='400' rx='25' ry='25' width='152' height='45' />
		<rect x='0' y='251' rx='10' ry='10' width='280' height='19' />
		<rect x='0' y='0' rx='20' ry='20' width='280' height='186' />
	</ContentLoader>
)
