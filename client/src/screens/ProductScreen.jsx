import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getDetailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { useNavigate } from 'react-router-dom';

export default function ProductScreen(props) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { product, error, loading } = productDetails;

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getDetailsProduct(id));
	}, [dispatch, id]);

	const handleAddToCart = () => {
		if (quantity) {
			navigate(`/cart/${id}?qty=${quantity}`);
		}
	};

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					<Link to="/">Back to Home</Link>
					<div className="row top">
						<div className="col-2">
							<img className="large" src={product.image} alt="" />
						</div>
						<div className="col-1">
							<ul>
								<li>
									<h1>{product.name}</h1>
								</li>
								<li>
									<Rating rating={product.rating} numReviews={product.numReviews} />
								</li>
								<li>Price: {product.price}</li>
								<li>
									<p>{product.description}</p>
								</li>
							</ul>
						</div>
						<div className="col-1">
							<div className="card card-body">
								<ul>
									<li>
										<div className="row">
											<div>Price</div>
											<div className="price">${product.price}</div>
										</div>
									</li>
									<li>
										<div className="row">
											<div>Status</div>
											<div className="price">
												{product.countInStock > 0 ? (
													<span className="success">In Stock</span>
												) : (
													<span className="danger">Unavailable </span>
												)}
											</div>
										</div>
									</li>
									{product.countInStock > 0 && (
										<>
											<li>
												<div className="row">
													<div>Quantity</div>
													<div>
														<select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
															{[...Array(product.countInStock).keys()].map((quantity) => (
																<option key={quantity} value={quantity + 1}>
																	{quantity + 1}
																</option>
															))}
														</select>
													</div>
												</div>
											</li>
											<li>
												<button onClick={handleAddToCart} className="primary block">
													Add To Cart
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
