import axios from 'axios';

export const getListProducts = () => async (dispatch) => {
	dispatch({
		type: 'PRODUCT_LIST_REQUEST',
	});
	try {
		const { data } = await axios.get('/api/products');
		dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'PRODUCT_LIST_FAIL', payload: error.message });
	}
};

export const getDetailsProduct = (productId) => async (dispatch) => {
	dispatch({ type: 'PRODUCT_DETAILS_REQUEST', payload: productId });
	try {
		const { data } = await axios.get(`/api/products/${productId}`);
		dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'PRODUCT_DETAILS_FAIL',
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
