import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function Product({ product: { _id, name, image, price, rating, numReviews } }) {
	return (
		<>
			<div className="card" key={_id}>
				<Link to={`/product/${_id}`}>
					<img className="medium" src={image} alt="product" />
				</Link>
				<div className="card-body">
					<Link to={`/product/${_id}`}>
						<h2>{name}</h2>
					</Link>
					<Rating rating={rating} numReviews={numReviews} />
					<div className="price">${price}</div>
				</div>
				{/* <div>
					<button className="primary">Add to Cart</button>
				</div> */}
			</div>
		</>
	);
}
