import { useState, useEffect } from 'react';
import { axiosApi } from '../api/serverApi';
import Navbar from '../components/Navbar';
import person1 from '../images/person1.png';
import person3 from '../images/person3.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { faEye, faEyeSlash, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../auth/Authenticate';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [togglePass, setTogglePass] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { setAuth } = useAuth();

	const [errMsg, setErrMsg] = useState('');
	const [fail, setFail] = useState(false);

	const [validTokenMsg, setValidTokenMsg] = useState('');
	const [isValidToken, setIsValidToken] = useState(false);

	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		if (!user) {
			return navigate('/visitors/login');
		}
		axiosApi
			.get('/auth/visitors', { headers: { Authorization: 'Bearer ' + user.accessToken } })
			.then((result) => {
				setIsValidToken(false);
				setAuth(user);
				navigate('/visitors');
				return result;
			})
			.catch((err) => {
				if (!user) {
					return setIsValidToken(false);
				}
				localStorage.removeItem('user');
				setValidTokenMsg(err.response?.data?.msg);
				setIsValidToken(true);
			});
	}, [navigate, setAuth, user]);

	const handleSignIn = async (e) => {
		e.preventDefault();
		setFail(false);
		if (!email || !password) {
			setErrMsg('Email and Password are not allowed to be empty, please try again.');
			setFail(true);
		} else {
			axiosApi
				.post('/visitors/login', { email, password })
				.then(({ data }) => {
					localStorage.setItem('user', JSON.stringify(data));
					setAuth(data);
					setEmail('');
					setPassword('');
					navigate(location.state?.from?.pathname || '/visitors', { replace: true });
				})
				.catch((err) => {
					setFail(true);
					setErrMsg(err.response?.data?.msg);
					navigate('/visitors/login');
					return err?.response?.data;
				});
		}
	};
	return (
		<>
			<Navbar />
			<section className='bg-image flex flex-col md:flex-row items-center min-h-screen'>
				<div className='h-screen hidden lg:block md:w-1/2 xl:w-2/3 overflow-hidden'>
					<div className='relative h-full w-full flex flex-col justify-center items-start px-20'>
						<div className='flex flex-col gap-3 justify-start items-start'>
							<h1 className='font-medium text-white text-4xl tracking-wider'>Trace With Us</h1>
							<h2 className='max-w-xl text-white font-bold text-5xl'>Join Us in Preventing and Stopping the Spread of the COVID-19 Virus.</h2>
							<p className='max-w-lg text-white font-normal'>
								Trace with Us is an online contact tracing website wherin visitors can submit their contact tracing form upon their visit in a facility
							</p>
							<Link to={'/visitors/registration'} className='block bg-white rounded-lg text-blue-500 px-4 py-2 font-medium cursor-pointer'>
								Get Started
							</Link>
						</div>
						<img src={person1} alt='person1' className='absolute z-10 -bottom-[100px] right-[20px] lg:hidden xl:block xl:w-[30rem]' />
						<img src={person3} alt='person3' className='absolute -bottom-[780px] right-[230px] lg:hidden xl:block xl:w-[30rem]' />
					</div>
				</div>
				<div className='bg-white lg:border w-full md:max-w-md lg:max-w-full md:mx-auto lg:mx-0 md:w-1/2 xl:w-1/3 h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-center flex-col'>
						<p className='text-gray-500 font-semibold text-lg'>VISITORS</p>
						<h1 className='text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-gray-900'>Login Page</span>
						</h1>
						<h2 className='text-xl md:text-2xl font-bold leading-tight mt-12'>Login to your account</h2>
						<p className='mt-2 text-start text-sm text-gray-600'>
							Or{' '}
							<Link to={'/owners'} className='font-medium text-blue-600 hover:text-blue-500'>
								Go to Owners Page
							</Link>
						</p>
						{fail && (
							<div className='border border-red-300 py-2 px-2 my-3 bg-red-200 rounded-md flex items-center justify-between'>
								<div className='flex-1 text-red-500 text-sm'>
									<FontAwesomeIcon icon={faExclamationTriangle} className='px-2' />
									{errMsg}
								</div>
								<button className='text-red-500 cursor-pointer px-2' onClick={() => setFail(false)}>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>
						)}
						{isValidToken && (
							<div className='border border-red-300 py-2 px-2 my-3 bg-red-200 rounded-md flex items-center justify-between'>
								<div className='flex-1 text-red-500 text-sm'>
									<FontAwesomeIcon icon={faExclamationTriangle} className='px-2' />
									{validTokenMsg}
								</div>
								<button className='text-red-500 cursor-pointer px-2' onClick={() => setIsValidToken(false)}>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>
						)}
						<div className='flex flex-col gap-2 mt-5'>
							<form onSubmit={handleSignIn}>
								<div className='flex flex-col gap-2'>
									<label htmlFor='email' className='block text-gray-900'>
										Email Address
									</label>
									<input
										type='email'
										placeholder='Enter Email Address'
										className='w-full bg-gray-200 rounded-md px-4 py-2 border focus:border-gray-500 focus:bg-white focus:outline-none'
										onChange={(e) => setEmail(e.target.value)}
										autoFocus
									/>
								</div>

								<div className='flex flex-col gap-2'>
									<label htmlFor='password' className='block text-gray-900'>
										Password
									</label>
									<div className='flex justify-center items-center bg-gray-200 rounded-md'>
										<input
											type={togglePass ? 'text' : 'password'}
											placeholder='Enter Password'
											className='w-full bg-gray-200 rounded-l-md px-4 py-2 border focus:border-gray-500 focus:bg-white focus:outline-none'
											onChange={(e) => setPassword(e.target.value)}
										/>
										<FontAwesomeIcon className='text-gray-400 px-4' icon={togglePass ? faEyeSlash : faEye} onClick={() => setTogglePass(!togglePass)} />
									</div>
								</div>

								<button
									type='submit'
									className='group relative w-full flex justify-center py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
								>
									Sign In
								</button>
							</form>
							<hr className='my-6 border-gray-500 w-full' />
							<p className='mt-5'>
								Need an account?
								<Link to={'/visitors/registration'} className='mx-1 text-blue-500 hover:text-blue-800 font-medium'>
									Create an acccount
								</Link>
							</p>
							<p>&copy; 2022 Trace With Us Login page</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
