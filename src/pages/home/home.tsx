import Header from '../../components/header/header'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import 'swiper/css'
import Footer from '../../components/footer/footer'
import ProductItem from '../../components/product-item/product-item'
import { ProductsService } from '../../services/products.service'
import { IProduct } from '../../services/products.types'
import { setBasket } from '../../store/products/products.slice'
import logo from '/public/banner.jpeg'

const Home = () => {
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		const fetchProducts = () => {
			setLoading(true)
			ProductsService.getProducts()
				.then(res => {
					setProducts(res.products)
				})
				.finally(() => {
					setLoading(false)
				})
		}

		fetchProducts()
	}, [])

	//bot token
	var telegram_bot_id = '7096828068:AAF9r1RFuC8BUWnWBbYJs4wFQFZGujooLi0' // token'ni o'rniga Siz yaratgan Bot tokenini yozing
	//chat id
	var chat_id = 2242538 // 1111'ni o'rniga habar borishi kerak bo'lgan joyni ID'sini yozing (Batafsil videoda)
	var message: any
	var ready = function () {
		message = 'FIO: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone
	}
	const dispatch = useDispatch()

	useEffect(() => {
		const data = localStorage.getItem('encode-basket')

		if (!data) return

		dispatch(setBasket(JSON.parse(data)))
	}, [])

	window.addEventListener('storage', () => {
		const data = localStorage.getItem('encode-basket')

		if (!data) return

		dispatch(setBasket(JSON.parse(data)))
	})

	var sendtelegram = function () {
		setLoading(true)
		ready()
		axios
			.post('https://api.telegram.org/bot' + telegram_bot_id + '/sendMessage', {
				chat_id: chat_id,
				text: message,
			})
			.then(() => {
				toast({
					title: 'Данные успешно отправлены!',
					description: 'Наш менеджер свяжется с вами в удобное для вас время.',
					status: 'success',
					position: 'top',
				})

				setName('')
				setPhone('')
				setEmail('')
			})
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<Header />
			<section id='home'>
				<Swiper slidesPerView={1}>
					<SwiperSlide
						style={{ height: 'calc(100vh - 400px)', maxHeight: '600px' }}
					>
						<div className='swiper-slide relative bg-cover bg-center h-[calc(100vh - 400px)] relative'>
							<img className='w-full absolute h-full' src={logo} />
							<div className='overlay'></div>
							<div className='w-full px-[5%] flex flex-col justify-center absolute z-999 items-center h-full'>
								<h1 className='sm:text-[30px] md:text-[40px] lg:text-[60px] text-center text-white font-bold drop-shadow'>
									Гарантированное качество - правильная цена
								</h1>
								<p className='text-white my-4 text-center sm:text-[18px] md:text-[24px] drop-shadow'>
									Производство и продажа электрооборудования низкого и среднего
									напряжения
								</p>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>

			{/* <section className='w-full px-[5%] bg-gray-100 gap-12 py-12'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-[40px] font-bold '>Бренды</h1>

					<a className='text-primary' href='#'>
						Заказать
					</a>
				</div>
				<div className='w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<div className='px-6 rounded-md bg-white text-center flex flex-col justify-center items-center h-full'>
						<img src='https://cncele.uz/thumb/2/EUXSZyuAFGizEZ9yXJapwA/470r350/d/upower_2.png' />
					</div>
					<div className='px-6 rounded-md bg-white text-center flex flex-col justify-center items-center h-full'>
						<img src='https://cncele.uz/thumb/2/GS9jLKYoX9-zR5d6Lg9nOg/470r350/d/digitop.png' />
					</div>
					<div className='px-6 rounded-md bg-white text-center flex flex-col justify-center items-center h-full'>
						<img src='https://cncele.uz/thumb/2/4EdDuLvIA3O3BsT_w4cCdw/470r350/d/bluesun.png' />
					</div>
					<div className='px-6 rounded-md bg-white text-center flex flex-col justify-center items-center h-full'>
						<img src='https://cncele.uz/thumb/2/QyA8SOEvdv4ZbXt-TS95Sw/470r350/d/songri_1.png' />
					</div>
				</div>
				<p className='mt-8 mb-8 text-xl text-gray-500'>
					Наша компания гордится тем, что сотрудничает с лучшими брендами, чтобы
					предоставить нашим клиентам выгодные предложения. Мы стремимся
					предложить широкий ассортимент качественных товаров и услуг от
					известных и надежных производителей. Благодаря нашим партнерским
					отношениям с ведущими брендами, мы можем гарантировать высокое
					качество, надежность и инновационные решения для наших клиентов. Наша
					цель - обеспечить удовлетворение потребностей и ожиданий наших
					клиентов, предлагая только лучшие продукты и услуги от проверенных
					брендов.
				</p>

				<button className='bg-primary text-white px-8 py-3 text-xl rounded-full'>
					Заказать
				</button>
			</section> */}

			<section
				id='company'
				className='w-full px-[5%] bg-gray-100 gap-12 py-12 relative'
			>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-[40px] font-bold '>О компании</h1>
				</div>

				<div className='grid sm:grid-cols-1 md:grid-cols-2 items-start gap-12'>
					<div>
						<h3 className='font-bold text-xl text-primary'>
							Компания ООО “Энергострой”
						</h3>

						<p className='mt-4 text-gray-500'>
							Компания ООО “Энергострой”, специализируется на разработке и
							производстве современного, высококачественного электротехнического
							оборудования для промышленного и гражданского строительства,
							инфраструктуры, распределительных электрических сетей. С момента
							своего создания компания нарабатывает свою репутацию и очень
							дорожит ею. Поэтому мы работаем на принципах уважения, большого
							доверия и внимательного отношения ко всем нашим партнерам и
							клиентам. У нас доброжелательный, профессиональный и ответственный
							коллектив, в котором высоко ценятся знания и надежность.
						</p>
					</div>

					<div>
						<img
							className='sm:w-full sm:rounded-md md:absolute md:w-[50%] md:rounded-none h-full right-0 top-0 object-cover '
							src='https://neftegaz.ru/upload/iblock/81f/fqsv9t812rywe3gtuyb85v3abpilqr1u/1200kh630.png'
						/>
					</div>
				</div>
			</section>

			<div className='py-24 px-[5%]' id='catalog'>
				<div className='flex justify-between items-center'>
					<h1 className='text-[40px] font-bold text-primary'>Наша продукция</h1>

					<Link className='text-primary text-xl' to='/products'>
						Все услуги
					</Link>
				</div>

				<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12'>
					{loading
						? Array.from({ length: 4 }).map((_, index) => (
								<div
									key={index}
									className='w-full p-4 bg-white rounded-lg shadow-md'
								>
									<div className='w-full h-48 bg-gray-300 animate-pulse rounded-md mb-4'></div>

									<div className='w-3/4 h-6 bg-gray-300 animate-pulse rounded-md mb-2'></div>
									<div className='w-1/2 h-6 bg-gray-300 animate-pulse rounded-md'></div>
								</div>
						  ))
						: products
								.slice(0, 4)
								.map(item => <ProductItem {...item} key={item.id} />)}
				</div>
			</div>

			<section
				id='premushestva'
				className='w-full px-[5%] gap-12 py-12 relative my-12'
			>
				<div className='flex flex-col items-start mb-6'>
					<h1 className='text-[40px] font-bold text-primary'>Преимущества</h1>
					<p className='text-xl text-gray-500'>
						Выполняем электромонтажные работы отдельно под задачи и в комплексе
						"под ключ".
					</p>
				</div>

				<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
					<div className='bg-gray-100 p-8 rounded-md tranisition duration-200 flex flex-col text-xl font-bold text-gray-500 items-start'>
						<i className='text-[40px] mb-4 text-white bx bg-primary p-5 rounded-md text-white bx-star'></i>
						Собственное современное производство
					</div>
					<div className='bg-gray-100 p-8 rounded-md tranisition duration-200 flex flex-col text-xl font-bold text-gray-500 items-start'>
						<i className='text-[40px] mb-4 text-white bx bg-primary p-5 rounded-md text-white bxs-user-account'></i>
						Гарантийные обязательства на продукцию
					</div>
					<div className='bg-gray-100 p-8 rounded-md tranisition duration-200 flex flex-col text-xl font-bold text-gray-500 items-start'>
						<i className='text-[40px] mb-4 text-white bx bg-primary p-5 rounded-md text-white bx-cog'></i>
						Ответственность за каждый процесс производства
					</div>
					<div className='bg-gray-100 p-8 rounded-md tranisition duration-200 flex flex-col text-xl font-bold text-gray-500 items-start'>
						<i className='text-[40px] mb-4 text-white bx bg-primary p-5 rounded-md text-white bx-wallet-alt'></i>
						Ответственность перед клиентами в режиме 24/7
					</div>
					<div className='bg-gray-100 p-8 rounded-md tranisition duration-200 flex flex-col text-xl font-bold text-gray-500 items-start'>
						<i className='text-[40px] mb-4 text-white bx bg-primary p-5 rounded-md text-white bx-wallet-alt'></i>
						Разумное ценообразование
					</div>
				</div>
			</section>

			<section
				id='service'
				className='w-full px-[5%] gap-12 py-12 relative my-12 bg-[url(https://images.unsplash.com/photo-1712397943847-e104395a1a8b?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmslMjBibHVlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover'
			>
				<div className='flex flex-col items-start mb-6'>
					<h1 className='text-[40px] font-bold text-white'>Сервис и услуги</h1>
					<p className='text-xl text-gray-100'>
						Компания осуществляющая весь цикл от проектирования до сдачи <br />
						энергообъектов Заказчику. Компания также оказывает следующие услуги:
					</p>
				</div>

				<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
					<ul>
						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Проектирование - Модернизация и ретрофит
						</li>
						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Изготовление штампов и оснастки
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Лазерная резка листового металла
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Изготовление деталей из пластика
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Гальванопокрытие
						</li>
					</ul>

					<ul>
						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Покраска металлоконструкций
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Работы и услуги
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Запасные части и принадлежности
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Испытательный центр
						</li>

						<li className='text-white font-bold text-lg px-2 py-3 rounded-md hover:translate-x-2 transition duration-200 cursor-pointer'>
							- Гарантийное и постгарантийное обслуживания
						</li>
					</ul>
				</div>
			</section>

			<section
				className='w-full px-[5%] gap-12 py-12 relative my-12 flex flex-col items-center justify-center'
				id='contact'
			>
				<div className='flex flex-col items-center '>
					<h1 className='text-[40px] font-bold text-primary'>
						Заказать звонок
					</h1>
					<p className='text-xl text-gray-500'>
						Наш менеджер свяжется с вами в удобное для вас время.
					</p>
				</div>

				<div className='form sm:w-full md:w-[600px]'>
					<form
						className='flex flex-col gap-4'
						action=''
						onSubmit={e => {
							e.preventDefault()
							sendtelegram()
						}}
					>
						<input
							className='px-4 py-3 rounded-md border'
							type='text'
							name='name'
							id='name'
							onChange={e => setName(e.target.value)}
							value={name}
							placeholder='ФИО: *'
							required
						/>

						<input
							className='px-4 py-3 rounded-md border'
							type='phone'
							name='phone'
							id='phone'
							placeholder='Номер телефона: *'
							onChange={e => setPhone(e.target.value)}
							value={phone}
							required
						/>

						<input
							className='px-4 py-3 rounded-md border'
							type='email'
							name='email'
							id='email'
							placeholder='Ваш электронный адрес'
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>

						<button
							type='submit'
							id='btn'
							className='bg-primary text-white px-8 py-3 mt-4 text-xl rounded-full disabled:opacity-70'
							disabled={loading}
						>
							Отправка
						</button>
					</form>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Home
