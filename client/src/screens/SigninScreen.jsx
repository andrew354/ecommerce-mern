import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const SigninScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	const userInfo = useSelector((state) => state.userSignin.userInfo);

	useEffect(() => {
		if (userInfo) {
			navigate(`/`);
		}
	}, [userInfo]);

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Sign In</h1>
				</div>
				{/* {loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox>{error}</MessageBox>} */}
				<div>
					<label htmlFor="email">Email Address</label>
					<input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Email Address</label>
					<input
						type="password"
						id="password"
						placeholder="Enter password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<button className="primary" type="submit">
						Sign In
					</button>
				</div>
				<div>
					<label />
					<div>
						New customer? <Link to="/register">Create your account</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SigninScreen;
