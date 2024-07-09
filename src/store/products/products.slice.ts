import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	basket: any[]
}

const initialState: IInitialState = {
	basket: [],
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProductToBasket: (state, action) => {
			const index = state.basket.findIndex(
				(item: any) => item.id === action.payload.id
			)

			if (index !== -1) {
				const newBasket = state.basket

				newBasket[index].count += 1
				state.basket = newBasket
				localStorage.setItem('encode-basket', JSON.stringify(state.basket))
			} else {
				const newBasket = state.basket

				newBasket.unshift({ ...action.payload, count: 1 })
				state.basket = newBasket
				localStorage.setItem('encode-basket', JSON.stringify(state.basket))
			}
		},
		minusProductToBasket: (state, action) => {
			const index = state.basket.findIndex(
				(item: any) => item.id === action.payload.id
			)

			const newBasket = state.basket

			if (newBasket[index].count === 1) {
				state.basket = newBasket.filter(item => item.id !== action.payload.id)
				localStorage.setItem('encode-basket', JSON.stringify(state.basket))
				return
			}

			newBasket[index].count -= 1
			state.basket = newBasket
			localStorage.setItem('encode-basket', JSON.stringify(state.basket))
		},
		setBasket(state, action) {
			state.basket = action.payload
		},
	},
})

export const { addProductToBasket, setBasket, minusProductToBasket } =
	productsSlice.actions
export default productsSlice.reducer
