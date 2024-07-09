import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import ProductItem from '../../components/product-item/product-item'
import { ProductsService } from '../../services/products.service'
import { IProduct } from '../../services/products.types'

const Products = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [loading, setLoading] = useState(false)
	const params = useParams()

	useEffect(() => {
		const fetchProducts = () => {
			setLoading(true)
			ProductsService.getProducts(params.categoryId!)
				.then(res => {
					setProducts(res.products)
				})
				.finally(() => setLoading(false))
		}

		fetchProducts()
	}, [])

	return (
		<>
			<Header />
			<div className='py-24 px-[5%] pt-[100px]'>
				<div className='flex justify-between items-center'>
					<h1 className='text-[40px] font-bold text-primary'>
						{params.categoryId
							? `Товары по категориям: ${products[0]?.category.name || '---'}`
							: 'Наша продукция'}
					</h1>
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
						{products.map(item => (
							<ProductItem {...item} key={item.id} />
						))}
					</div>
				)}
			</div>
			<Footer />
		</>
	)
}

export default Products
