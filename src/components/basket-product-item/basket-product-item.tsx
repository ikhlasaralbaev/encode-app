import { useDispatch } from 'react-redux'
import {
	addProductToBasket,
	minusProductToBasket,
} from '../../store/products/products.slice'

const BasketProductItem = (product: any) => {
	const { name, price, image } = product
	const dispatch = useDispatch()

	const addBasket = () => {
		dispatch(addProductToBasket(product))
	}

	const minusBasket = () => {
		dispatch(minusProductToBasket(product))
	}

	return (
		<div
			className={
				'p-4 rounded-md border border-gray-200 flex justify-between items-center flex-row relative bg-white w-full sm:flex-col lg:flex-row'
			}
		>
			<div className='sm:flex-col md:flex-row flex items-center gap-4'>
				<img className={product.isBasket ? 'w-[200px]' : ''} src={image?.url} />
				<h3 className='text-xl font-semibold mb-6 h-12 '>{name}</h3>
			</div>
			<span className='absolute top-4 right-4 rounded-full border border-gray-400 px-3 py-1'>
				Category
			</span>
			<div className='mt-4 text-center'>
				<div className='flex flex-col items-end gap-4 justify-end'>
					{!product.isBasket ? (
						<button className='bg-primary text-white px-8 py-3 text-xl rounded-full'>
							<a href='detail.html'>Заказать</a>
						</button>
					) : null}
					<span className='px-3 py-5 text-xl font-semibold'>
						{price} X {product.count} = {price * product.count}
					</span>
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
				</div>
			</div>
		</div>
	)
}

export default BasketProductItem
