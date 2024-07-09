import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/new-logo.png'
const Header = () => {
	const { basket } = useSelector((state: any) => state.product)
	const [isMenu, setIsMenu] = useState(false)
	const { pathname } = useLocation()
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScrollY(window.scrollY)
		})
	}, [])

	return (
		<>
			{' '}
			<div
				className={`px-[5%] py-4 flex justify-between items-center fixed top-0 z-50  shadow-md w-full backdrop-blur-md transition duration-200 ${
					pathname === '/'
						? scrollY > 500
							? 'bg-gray-500/50'
							: 'bg-transparent'
						: 'bg-white'
				} `}
			>
				<Link className='flex items-center gap-2' to={'/'}>
					<img
						className={`sm:w-[50px] md:w-[50px] ${
							pathname === '/' ? 'invert' : ''
						}`}
						src={logo}
					/>

					<span
						className={`text-xl sm:hidden md:flex ${
							pathname === '/' ? 'text-white' : 'text-gray-500'
						}`}
					>
						Энергострой
					</span>
				</Link>

				<div className='flex items-center gap-4'>
					<ul
						id='menu'
						className={`sm:text-center sm:fixed sm:inset-0 sm:bg-white lg:bg-transparent sm:flex-col sm:pt-24 lg:relative lg:flex-row lg:pt-0 flex gap-6 items-center  lg:flex sm:bg-white sm:h-screen lg:h-auto ${
							isMenu ? 'sm:flex' : 'sm:hidden'
						}`}
					>
						<li>
							<Link
								to='/'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Главная
							</Link>
						</li>

						<li>
							<Link
								to='/categories'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Категории
							</Link>
						</li>

						<li>
							<Link
								to='/products'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Каталог
							</Link>
						</li>

						<li>
							<Link
								to='#'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Сервис и услуги
							</Link>
						</li>
						<li>
							<Link
								to='#'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Новости
							</Link>
						</li>
						<li>
							<Link
								to='#'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Сертификаты
							</Link>
						</li>
						<li>
							<Link
								to='#'
								className={`text-md   transition duration-200 hover:text-primary ${
									pathname === '/'
										? 'sm:text-xl lg:text-md lg:text-white sm:text-gray-500'
										: 'sm:text-gray-500 md:text-gray-500'
								}`}
							>
								Контакты
							</Link>
						</li>

						<button onClick={() => setIsMenu(false)} id='menu-close-btn'>
							<i className='bx bx-x text-3xl top-4 right-4 absolute sm:block lg:hidden'></i>
						</button>
					</ul>

					<button
						onClick={() => setIsMenu(true)}
						id='menu-btn'
						className='sm:block lg:hidden '
					>
						<i className='bx bx-menu-alt-right text-primary text-3xl sm:pr-4'></i>
					</button>
					<Link to={'/basket'}>
						<button className='bg-primary text-white px-6 py-2 text-lg rounded-full'>
							Корзина ({basket?.length})
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Header
