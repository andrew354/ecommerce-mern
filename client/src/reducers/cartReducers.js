import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	console.log('this is states', state);
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((cartItem) => cartItem.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((cartItem) => (cartItem.product === existItem.product ? item : cartItem)),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case CART_REMOVE_ITEM:
			return { ...state, cartItems: state.cartItems.filter((item) => item.product !== action.payload) };
		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };
		default:
			return state;
	}
};
