import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Search.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../../redux/filter/selectors'
import { setSearchValue } from '../../redux/filter/slice'

export const Search: React.FC = () => {
	const [value, setValue] = useState<string>('')
	const dispatch = useDispatch()
	const { searchValue } = useSelector(selectFilter)

	useEffect(() => {
		if (!searchValue) {
			setValue('')
		}
	}, [searchValue])

	const inputRef = useRef<HTMLInputElement>(null)

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current?.focus() // === if (inputRef.current) { inputRef.current.focus() }
	}

	const updateSearchValue = useCallback(
		//избегаем пересоздания дебаунса при перерендере (useCallback)
		debounce((str: string) => {
			//оптимизация поиска(запрос будет
			//уходить только при отсутствии изменений value в течении 300мс)
			dispatch(setSearchValue(str))
		}, 300),
		[]
	)

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 50 50'
				width='500px'
				height='500px'
			>
				<path d='M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z' />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={event => onChangeInput(event)}
				className={styles.input}
				placeholder='Поиск еды...'
			/>
			{value && (
				<svg
					className={styles.clearIcon}
					onClick={onClickClear}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 50 50'
					width='500px'
					height='500px'
				>
					<path d='M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z' />
				</svg>
			)}
		</div>
	)
}
