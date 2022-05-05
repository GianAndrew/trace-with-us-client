import { useEffect, useState } from 'react';
import { axiosApi } from '../api/serverApi';
import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../auth/Authenticate.js';
import logo from '../images/trace-with-us-logo.png';

const OwnerLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [togglePass, setTogglePass] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [fail, setFail] = useState(false);

	const [validTokenMsg, setValidTokenMsg] = useState('');
	const [isValidToken, setIsValidToken] = useState(false);
	const { setAuth } = useAuth();

	const navigate = useNavigate();

	const owner = JSON.parse(localStorage.getItem('owners'));

	useEffect(() => {
		if (!owner) {
			return navigate('/owners/login');
		}
		axiosApi
			.get('/auth/owners', { headers: { Authorization: 'Bearer ' + owner.accessToken } })
			.then((result) => {
				setIsValidToken(false);
				setAuth(owner);
				navigate('/owners');
				return result;
			})
			.catch((err) => {
				if (!owner) {
					return setIsValidToken(false);
				}
				localStorage.removeItem('owners');
				setValidTokenMsg(err.response?.data?.msg);
				setIsValidToken(true);
			});
	}, [navigate, setAuth, owner]);

	const handleSignIn = async (e) => {
		e.preventDefault();
		setFail(false);
		if (!email || !password) {
			setErrMsg('Email and Password are not allowed to be empty, please try again.');
			setFail(true);
		} else {
			try {
				const { data } = await axiosApi.post('/owners/login', { email: email, password: password });
				localStorage.setItem('owners', JSON.stringify(data));
				setAuth(data);
				setEmail('');
				setPassword('');
				navigate('/owners');
				return data;
			} catch (error) {
				setErrMsg(error?.response?.data?.msg);
				setFail(true);
				navigate('/owners/login');
				return error?.response?.data;
			}
		}
	};

	return (
		<>
			<div className='h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div className='p-2'>
						<h2 className='mt-6 text-center text-xl font-extrabold text-gray-900'>OWNERS</h2>
						<img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Or{' '}
							<Link to='/owners/registration' className='font-medium text-blue-600 hover:text-blue-500'>
								start to operate with trace with us
							</Link>
						</p>
					</div>
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
					<form className='mt-8 space-y-6' onSubmit={handleSignIn}>
						<div className='flex flex-col gap-2 rounded-md shadow-sm'>
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
						</div>
						<div>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<svg className='h-5 w-5 text-blue-500 group-hover:text-indigo-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
										<path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
									</svg>
								</span>
								Sign in
							</button>
						</div>
						<hr className='my-6 border-gray-500 w-full' />
						<div>
							<p className='my-5'>
								Need an account?
								<Link to={'/owners/registration'} className='mx-1 text-blue-500 hover:text-blue-800 font-medium'>
									Create an acccount
								</Link>
							</p>
							<p className='my-2 text-start text-sm text-gray-600'>
								Or{' '}
								<Link to={'/visitors'} className='font-medium text-blue-600 hover:text-blue-500'>
									Go to Visitors Page
								</Link>
							</p>
							<p>&copy; 2022 Trace With Us Login page</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default OwnerLogin;
