// src/ScrollToTop.js
import { useEffect } from 'react'

const ScrollToTop = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return <div className='scroll-to-top' />
}

export default ScrollToTop
