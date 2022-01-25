import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
	const userInfo = useSelector((state) => state.userSignin);
	const navigate = useNavigate();

	if (!userInfo) {
		navigate('/signin');
	}
	return (
		<div>
			<h1>payment screen </h1>
		</div>
	);
};

export default PaymentScreen;
