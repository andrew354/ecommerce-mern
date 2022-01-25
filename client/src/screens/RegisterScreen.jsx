import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Password and confirm password does not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(`/`);
		}
	}, [userInfo]);

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Create new account</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox>{error}</MessageBox>}
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} />
				</div>
				<div>
					<label htmlFor="email">Email Address</label>
					<input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						placeholder="Confirm password"
						required
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<button className="primary" type="submit">
						Register
					</button>
				</div>
				<div>
					<label />
					<div>
						Already have an Account? <Link to="/signin">Sign in</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterScreen;
