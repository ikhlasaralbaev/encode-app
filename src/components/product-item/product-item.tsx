import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	addProductToBasket,
	minusProductToBasket,
} from '../../store/products/products.slice'

const ProductItem = (product: any) => {
	const { name, image, id } = product
	const dispatch = useDispatch()
	const { basket } = useSelector((state: any) => state.product)

	const addBasket = () => {
		dispatch(addProductToBasket(product))
	}

	const minusBasket = () => {
		dispatch(minusProductToBasket(product))
	}

	const productsClass =
		'p-4 rounded-md border border-gray-200 flex justify-center items-center flex-col relative bg-white '
	const basketClass =
		'p-4 rounded-md border border-gray-200 flex justify-between items-center flex-row relative bg-white w-full'

	return (
		<div className={product.isBasket ? basketClass : productsClass}>
			<img className={'w-[200px] h-[200px]'} src={image.url} />
			<span className='absolute top-4 right-4 rounded-full border border-gray-400 px-3 py-1 bg-white	'>
				{product?.category?.name}
			</span>
			<div className='mt-4 text-center'>
				<h3 className='text-md font-semibold mb-6 h-12'>
					{name.slice(0, 50)}...
				</h3>
				<div className='flex items-center gap-2 justify-center'>
					{!product.isBasket ? (
						<Link to={`/product/${id}`}>
							<button className='bg-primary text-white px-8 py-3 text-xl rounded-full'>
								Подробнее
							</button>
						</Link>
					) : null}
					{!product?.isBasket ? (
						basket.findIndex((x: any) => x.id === id) === -1 ? (
							<button
								onClick={addBasket}
								className=' text-white w-[50px] h-[50px] text-xl rounded-full flex items-center justify-center bg-green-500 active:opacity-60'
							>
								<i className='bx bx-cart-add text-2xl'></i>
							</button>
						) : (
							<Link to='/basket'>
								<button className=' text-white w-[50px] h-[50px] text-xl rounded-full flex items-center justify-center bg-amber-500 active:opacity-60'>
									<i className='bx bx-show text-2xl'></i>
								</button>
							</Link>
						)
					) : (
						<div className='flex gap-4'>
							<button
								className=' text-white w-[50px] h-[50px] text-xl rounded-full flex items-center justify-center bg-amber-500 active:opacity-60'
								onClick={addBasket}
							>
								<i className='bx bx-plus text-2xl'></i>
							</button>
							<span className='w-[50px] h-[50px] text-xl rounded-full flex items-center justify-center bg-gray-100'>
								{product.count}
							</span>
							<button
								onClick={minusBasket}
								className=' text-white w-[50px] h-[50px] text-xl rounded-full flex items-center justify-center bg-amber-500 active:opacity-60'
							>
								<i className='bx bx-minus text-2xl'></i>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductItem
