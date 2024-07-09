import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import { ProductsService } from '../../services/products.service'
import { ICategory } from '../../services/products.types'

const Categories = () => {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchCategories = () => {
			setLoading(true)
			ProductsService.getCategories()
				.then(res => setCategories(res.categories))
				.catch(err => console.log(err))
				.finally(() => setLoading(false))
		}

		fetchCategories()
	}, [])

	return (
		<div>
			<Header />
			<div className='py-24 px-[5%]'>
				<div className='flex justify-between items-center'>
					<h1 className='text-[40px] font-bold text-primary'>Категории</h1>
				</div>

				{loading ? (
					<div>
						<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12'>
							{Array.from({ length: 10 }).map((_, index) => (
								<div
									key={index}
									className='w-full p-4 bg-white rounded-lg shadow-md'
								>
									<div className='w-full h-48 bg-gray-300 animate-pulse rounded-md mb-4'></div>

									<div className='w-3/4 h-6 bg-gray-300 animate-pulse rounded-md mb-2'></div>
									<div className='w-1/2 h-6 bg-gray-300 animate-pulse rounded-md'></div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12'>
						{categories.map(item => (
							<Link
								to={`/products/${item.id}`}
								key={item.id}
								className='p-4 rounded-md border hover:text-primary'
							>
								<img
									src={item.image.url}
									className='w-full rounded-md h-[200px] object-cover'
								/>

								<div className='mt-2'>
									<h2 className='text-[24px]'>{item.name}</h2>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default Categories
