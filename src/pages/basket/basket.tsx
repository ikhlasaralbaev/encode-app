import { Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BasketProductItem from '../../components/basket-product-item/basket-product-item'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import { setBasket } from '../../store/products/products.slice'

const Basket = () => {
	const { basket } = useSelector((state: any) => state.product)
	const dispatch = useDispatch()
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	//bot token
	var telegram_bot_id = '7096828068:AAF9r1RFuC8BUWnWBbYJs4wFQFZGujooLi0' // token'ni o'rniga Siz yaratgan Bot tokenini yozing
	//chat id
	var chat_id = 2242538 // 1111'ni o'rniga habar borishi kerak bo'lgan joyni ID'sini yozing (Batafsil videoda)
	var message: any

	var ready = function () {
		message =
			'Информация о клиенте:\n\nFIO: ' +
			name +
			'\nEmail: ' +
			email +
			'\nPhone: ' +
			phone +
			'\n\nТовары: ' +
			'\n'

		basket.map((item: any) => {
			message += `\n${item.name}: ${item.price} X ${item.count} = ${
				item.price * item.count
			}`
		})

		message += `\n\nОбщая сумма: ${getTotal().toLocaleString()}`
	}

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

	const sendToTelegram = (e: FormEvent) => {
		e.preventDefault()
		sendtelegram()
	}

	const getTotal = () => {
		const sums = basket.map((item: any) => item.count * item.price)

		return sums.reduce((prev: number, acc: number) => prev + acc, 0)
	}

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
		<div className='bg-gray-100'>
			<Header />
			<div className='py-12 px-[5%] pb-24'>
				<div className='flex justify-between items-center'>
					<h1 className='text-[40px] font-bold text-primary'>Корзина</h1>

					<Link className='text-primary' to='/'>
						Все продукты
					</Link>
				</div>

				<div className='flex gap-12 items-start sm:flex-col md:flex-row'>
					{basket?.length !== 0 ? (
						<div className='grid gap-4 mt-12 w-full'>
							{basket.map((item: any) => (
								<BasketProductItem {...item} isBasket={true} key={item.id} />
							))}
						</div>
					) : (
						<div className='w-full my-12 p-6 rounded-md bg-white text-xl'>
							<h1>Товары ещё не в корзине!</h1>
						</div>
					)}

					<form
						onSubmit={sendToTelegram}
						className='sm:w-full md:min-w-[400px] md:max-w-[400px]  flex flex-col gap-4 p-4 bg-white rounded-md mt-12 sticky top-[150px]'
					>
						<h2 className='font-semibold text-xl mb-4'>Детали корзины</h2>

						<Input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Введите ваше имя: *'
							required
						/>
						<Input
							type='tel'
							value={phone}
							onChange={e => setPhone(e.target.value)}
							placeholder='Введите номер телефона: *'
							required
						/>
						<Input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='mb-4'
							placeholder='Введите адрес электронной почты:'
						/>

						<h2 className='text-lg font-semibold'>
							Общая сумма: <span className='text-primary'>{getTotal()}</span>
						</h2>

						<button
							type='submit'
							id='btn'
							className='bg-primary text-white px-8 py-3 mt-4 text-xl rounded-full disabled:opacity-70'
							disabled={basket?.length === 0 || loading}
						>
							Отправка
						</button>
					</form>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Basket
