import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/scroll-top/scroll-top'
import Basket from './pages/basket/basket'
import Categories from './pages/categories/categories'
import Home from './pages/home/home'
import ProductDetail from './pages/product-detail/product-detail'
import Products from './pages/products/products'

const App = () => {
	return (
		<div>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:categoryId' element={<Products />} />
				<Route path='/basket' element={<Basket />} />
				<Route path='/product/:id' element={<ProductDetail />} />
				<Route path='/categories' element={<Categories />} />
			</Routes>
		</div>
	)
}

export default App
