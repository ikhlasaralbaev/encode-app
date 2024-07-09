import logo from '../../assets/new-logo.png'

const Footer = () => {
	const date = new Date()
	return (
		<footer className='bg-primary p-6 px-[5%] py-12'>
			<div className='grid sm:grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='flex flex-col'>
					<h3 className='text-white mb-4 text-xl font-bold'>График работы</h3>
					<p className='text-white mb-4'>
						{' '}
						Понедельник - Суббота с 9:00 до 19:00
						<br />
						Email: Energostroyen@gmail.com
						<br />
						Адрес: г. Москва, улица Ташкентская 28
					</p>
				</div>

				<div className='flex flex-col items-start'>
					<h3 className='text-white mb-4 text-xl font-bold'>
						Приём звонков 24/7
					</h3>

					<span className='text-gray-200 mb-2'>Номер телефона: </span>
					<h3 className='text-white mb-4 text-xl font-bold'>+7 910 608 8631</h3>
				</div>
			</div>

			<div className='h-[1px] bg-white my-12 w-full opacity-30'></div>

			<div className='flex justify-between items-center'>
				<span className='text-white'>
					Все права защищены. {date.getFullYear()} г.
				</span>

				<img className='w-[50px] invert' src={logo} />
			</div>
		</footer>
	)
}

export default Footer
