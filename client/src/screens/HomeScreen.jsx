import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from '../actions/productActions';

// import {productListReducer} from

export default function HomeScreen() {
	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState('');
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(getListProducts());
	}, []);

	// const fetchData = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const response = await axios.get('/api/products');
	// 		const data = response.data;
	// 		setLoading(false);
	// 		setProducts(data);
	// 	} catch (err) {
	// 		setLoading(false);
	// 		setError(err.message);
	// 	}
	// };
	// useEffect(() => {
	// 	fetchData();
	// }, []);
	return (
		<div className="row center">
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				products.map((product) => <Product key={product._id} product={product} />)
			)}
		</div>
	);
}
