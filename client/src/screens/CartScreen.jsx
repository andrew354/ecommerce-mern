import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {
	const location = useLocation();
	const queryQuantity = location.search;
	const quantityArray = queryQuantity.split('?qty=');
	const quantity = Number(quantityArray[1]);
	const { id } = useParams();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userInfo = useSelector((state) => state.userSignin.userInfo);
	console.log('userInfo from cart', userInfo);

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, quantity));
		}
	}, [dispatch, id, quantity]);

	const removeFromCartHandler = (id) => {
		console.log('id: ' + id);
		dispatch(removeFromCart(id));
	};

	return (
		<div className="row top">
			<div className="col-2">
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<MessageBox>
						Cart is empty. <Link to="/">Go Shopping</Link>
					</MessageBox>
				) : (
					<ul>
						{cartItems.map((item) => (
							<li key={item.product}>
								<div className="row">
									<div>
										<img className="small" src={item.image} alt={item.name} />
									</div>
									<div className="min-30">
										<Link to={`/product/${item.product}`}> {item.name}</Link>
									</div>
									<div>
										<select value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
											{[...Array(item.countInStock).keys()].map((quantity) => (
												<option key={quantity} value={quantity + 1}>
													{quantity + 1}
												</option>
											))}
										</select>
									</div>
									<div>${item.price}</div>
									<div>
										<button type="button" onClick={() => removeFromCartHandler(item.product)}>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="col-1">
				<div className="card card-body">
					<ul>
						<li>
							<h2>
								{cartItems.length === 0 ? 0 : cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} items : ${' '}
								{cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
							</h2>
						</li>
						<li>
							<button className="primary">
								<Link to={userInfo ? '/shipping' : '/signin'}>Proceed to Checkout</Link>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
