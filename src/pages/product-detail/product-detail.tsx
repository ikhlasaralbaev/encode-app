import parser from 'html-react-parser'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import ScrollToTop from '../../components/scroll-top/scroll-top'
import { ProductsService } from '../../services/products.service'
import { IProduct } from '../../services/products.types'
const ProductDetail = () => {
	const params = useParams()
	const [product, setProduct] = useState<IProduct | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		ProductsService.getProductById(params.id!)
			.then(res => setProduct(res.products[0]))
			.finally(() => setLoading(false))
	}, [])

	return (
		<div className='bg-gray-100 '>
			<Header />
			<ScrollToTop />
			<section className='py-12 pb-24 px-[5%] bg-gray-100 min-h-[60vh]'>
				{loading ? (
					<h1 className='text-xl text-primary text-center'>
						Загрузка данных...
					</h1>
				) : (
					<>
						<h1 className='sm:text-[28px] md:text-[40px] font-bold mb-4'>
							{product?.name}
						</h1>
						<div>
							<Link className='text-primary' to='/'>
								Главная /{' '}
							</Link>
							<a className='text-neutral-500'>{product?.name}</a>
						</div>

						<div className='flex sm:flex-col md:flex-row gap-12 items-start mt-12'>
							<img
								className='w-full min-w-[300px] max-w-[500px] flex-1 rounded-xl'
								src={product?.image.url}
							/>

							<div className='flex flex-col flex-1 items-start'>
								<h1 className='text-[20px] text-primary font-bold mb-4 sm:hidden md:block'>
									{product?.name}
								</h1>
								<span className='mb-2 text-primary bg-white rounded-full px-3 py-1 '>
									{product?.category.name}
								</span>
								<p className='text-gray-500 text-xl'>
									{product?.description.html &&
										parser(product?.description.html!)}
								</p>
								<span className='my-4 text-primary'>Цена</span>
								<h2 className='text-3xl font-bold'>
									{product?.price?.toLocaleString()} р.
								</h2>

								{product?.sertificateFiles.length ? (
									<>
										<h2>Сертификаты</h2>
										<ul>
											{product?.sertificateFiles.map(item => (
												<li className='mt-2'>
													<a
														className='text-primary flex items-center gap-2'
														href={item.url}
														download
													>
														<i className='bx bx-file'></i>
														Скачать сертификат
													</a>
												</li>
											))}
										</ul>
									</>
								) : null}
							</div>
						</div>
					</>
				)}
			</section>
			<Footer />
		</div>
	)
}

export default ProductDetail
