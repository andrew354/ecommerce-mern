import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';

function App() {
	const cartItems = useSelector((state) => state.cart.cartItems);

	return (
		<BrowserRouter>
			<div className="App">
				<div className="grid-container">
					<header className="row">
						<div>
							<Link to="/" className="brand">
								Ecommerce Mern
							</Link>
						</div>
						<div>
							<Link to="/cart">Cart {cartItems.length > 0 ? <span className="badge">{cartItems.length}</span> : null}</Link>
							<Link to="/signin">Sign In</Link>
						</div>
					</header>
					<main>
						<Routes>
							<Route path="/product/:id" element={<ProductScreen />}></Route>
							<Route path="/cart/:id" element={<CartScreen />}></Route>
							<Route path="/cart/" element={<CartScreen />}></Route>
							<Route path="/signin/" element={<SigninScreen />}></Route>
							<Route path="/" element={<HomeScreen />} exact />
						</Routes>
					</main>
					<footer className="row center">All right reserved</footer>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
