import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import { useMemo, useState } from 'react';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';

function App() {
	const cart = useSelector((state) => state.cart);
	const cartItems = useMemo(() => {
		return cart.cartItems;
	}, [cart]);
	const userInfo = useSelector((state) => state.userSignin.userInfo);
	const [showSignout, setShowSignout] = useState(false);

	console.log('userInfo', userInfo);
	console.log('cartItems', cartItems);

	const dispatch = useDispatch();

	const showSignoutDiv = (e) => {
		e.preventDefault();
		setShowSignout(!showSignout);
	};

	const signoutHandler = (e) => {
		e.preventDefault();
		dispatch(signout());
		setShowSignout(!showSignout);
	};

	return (
		<BrowserRouter>
			<div className="App">
				<div className="grid-container">
					<header className="row">
						<div>
							<Link to="/" className="brand">
								PragmaShop
							</Link>
						</div>
						<div className="row">
							<Link to="/cart">Cart {cartItems.length > 0 ? <span className="badge">{cartItems.length}</span> : null}</Link>
							{userInfo ? (
								<div>
									<div className="row dropdown" onClick={(e) => showSignoutDiv(e)}>
										{/* <div className="row dropdown" onClick={(e) => setShowSignout(!showSignout)}> */}
										<Link to="#" className="signin">
											{userInfo.name}
											<i className="fa fa-sort-down"></i>
										</Link>
									</div>
									{showSignout && (
										<ul className="dropdown-content">
											<Link onClick={(e) => signoutHandler(e)} to="#signout">
												Signout
											</Link>
										</ul>
									)}
								</div>
							) : (
								<Link to="/signin">Sign In</Link>
							)}
						</div>
					</header>
					<main>
						<Routes>
							<Route path="/product/:id" element={<ProductScreen />}></Route>
							<Route path="/cart/:id" element={<CartScreen />}></Route>
							<Route path="/cart/" element={<CartScreen />}></Route>
							<Route path="/signin/" element={<SigninScreen />}></Route>
							<Route path="/register/" element={<RegisterScreen />}></Route>
							<Route path="/shipping/" element={<ShippingAddressScreen />}></Route>
							<Route path="/payment/" element={<PaymentScreen />}></Route>
							<Route path="/" element={<HomeScreen />} exact />
						</Routes>
					</main>
					{/* <footer className="row center">All right reserved</footer> */}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
