import { useState, useEffect } from 'react';
import { axiosApi } from '../api/serverApi';
import logo from '../images/trace-with-us-logo.png';
import { Link } from 'react-router-dom';
import { faClipboardCheck, faEyeSlash, faEye, faExclamationTriangle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OwnersRegistration = () => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState('');
	const [nameStore, setNameStore] = useState('');
	const [age, setAge] = useState();
	const [gender, setGender] = useState('male');
	const [phone, setPhone] = useState();
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [togglePass, setTogglePass] = useState(false);
	const [toggleConPass, setToggleConPass] = useState(false);
	const [validMatch, setValidMatch] = useState(false);

	useEffect(() => {
		setValidMatch(password === confirmPassword);
	}, [confirmPassword, password]);

	const handleSignUp = async () => {
		if (password && confirmPassword !== '' && validMatch) {
			try {
				const { data } = await axiosApi.post('/owners/register', { name, nameStore, age, gender, phone, address, email, password });
				setIsSuccess(true);
				return data;
			} catch (error) {
				console.log(error?.response?.data);
			}
		}
		setIsError(true);
	};

	return (
		<>
			{isError && (
				<>
					<div className='fixed z-30 bottom-52 lg:inset-0 overflow-y-auto'>
						<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
							<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

							<span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>

							<div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10'>
											<FontAwesomeIcon icon={faXmarkCircle} className='text-red-500' />
										</div>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											<h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
												Account Error
											</h3>
											<div className='mt-2'>
												<p className='text-sm text-gray-500'>Unsuccessfully created, there's something wrong with your details, please check again.</p>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<button
										type='button'
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
										onClick={() => setIsError(false)}
									>
										Okay
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{isSuccess && (
				<>
					<div className='fixed z-30 bottom-52 lg:inset-0 overflow-y-auto'>
						<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
							<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

							<span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>

							<div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-200 sm:mx-0 sm:h-10 sm:w-10'>
											<FontAwesomeIcon icon={faClipboardCheck} className='text-emerald-500' />
										</div>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											<h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
												Account Created
											</h3>
											<div className='mt-2'>
												<p className='text-sm text-gray-500'>Hello, your account is successfully created, you can now fill out the health form for your safety.</p>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<Link
										to={'/owners/login'}
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Okay
									</Link>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<section className='h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div className='p-2'>
						<h2 className='mt-6 text-center text-xl font-extrabold text-gray-900'>OWNERS</h2>
						<img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create your account</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Or{' '}
							<Link to='/owners/login' className='font-medium text-blue-600 hover:text-blue-500'>
								start to operate with trace with us
							</Link>
						</p>
					</div>
					{!validMatch && (
						<div className='flex justify-start items-center gap-2 my-2 py-2 px-2 border border-red-300 bg-red-200 text-red-500 font-normal rounded-lg'>
							<div className='rounded-full px-2 py-1 bg-red-300'>
								<FontAwesomeIcon icon={faExclamationTriangle} className='text-red-500' />
							</div>
							Must match the first password input field.
						</div>
					)}
					<p className='px-2 font-semibold'>Step {step + 1} of 3</p>
					<div className='my-4 space-y-4'>
						{step === 0 && (
							<>
								<div className='flex flex-col gap-1'>
									<label htmlFor='name' className='block text-gray-900'>
										Name
									</label>
									<input
										type='text'
										placeholder='Enter Name'
										id='name'
										name='name'
										value={name}
										className='w-full bg-slate-200 rounded-lg px-4 py-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</div>
								<div className='flex flex-col lg:flex-row gap-1'>
									<div className='w-full'>
										<label htmlFor='age' className='block text-gray-900'>
											Age
										</label>
										<input
											type='number'
											placeholder='Enter Age'
											id='age'
											name='age'
											defaultValue={age}
											className='w-full bg-slate-200 rounded-lg px-4 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setAge(e.target.value)}
										/>
									</div>
									<div className='w-full'>
										<label htmlFor='gender' className='block text-gray-900'>
											Gender
										</label>
										<select
											name='gender'
											id='gender'
											defaultValue={gender}
											className='w-full bg-slate-200 rounded-lg px-2 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setGender(e.target.value)}
										>
											<option value='none'>Prefer not to say</option>
											<option value='male'>Male</option>
											<option value='female'>Female</option>
										</select>
									</div>
								</div>
								<div className='w-full'>
									<label htmlFor='phone' className='block text-gray-900'>
										Phone No.
									</label>
									<input
										type='text'
										id='phone'
										name='phone'
										defaultValue={phone}
										placeholder='Enter Phone No.'
										className='w-full bg-slate-200 rounded-lg px-4 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</>
						)}
						{step === 1 && (
							<>
								<div className='w-full'>
									<label htmlFor='name_store' className='block text-gray-900'>
										Name of Store
									</label>
									<input
										type='text'
										id='name_store'
										name='name_store'
										defaultValue={nameStore}
										placeholder='Enter Name of Store'
										className='w-full bg-slate-200 rounded-lg px-4 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setNameStore(e.target.value)}
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label htmlFor='address' className='block text-gray-900'>
										Address
									</label>
									<textarea
										name='address'
										id='address'
										value={address}
										placeholder='Enter your Address'
										className='w-full bg-slate-200 rounded-lg px-4 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setAddress(e.target.value)}
									></textarea>
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<div className='flex flex-col gap-1'>
									<label htmlFor='email' className='block text-gray-900'>
										Email
									</label>
									<input
										type='email'
										id='email'
										name='email'
										placeholder='Enter Email Address'
										value={email}
										className='w-full bg-slate-200 rounded-lg px-4 py-2 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label htmlFor='password' className='block text-gray-900'>
										Password
									</label>
									<div className='flex justify-center items-center bg-slate-200 rounded-md'>
										<input
											type={togglePass ? 'text' : 'password'}
											placeholder='Enter Password'
											value={password}
											name='password'
											className='w-full bg-slate-200 rounded-l-md px-4 py-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setPassword(e.target.value)}
										/>
										<FontAwesomeIcon className='text-gray-400 px-4' icon={togglePass ? faEyeSlash : faEye} onClick={() => setTogglePass(!togglePass)} />
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='confirmPassword' className='block text-gray-900'>
										Confirm Password
									</label>
									<div className='flex justify-center items-center bg-slate-200 rounded-md'>
										<input
											type={toggleConPass ? 'text' : 'password'}
											placeholder='Enter Confirm Password'
											value={confirmPassword}
											id='confirmPassword'
											name='confirmPassword'
											className='w-full bg-slate-200 rounded-l-md px-4 py-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<FontAwesomeIcon className='text-gray-400 px-4' icon={toggleConPass ? faEyeSlash : faEye} onClick={() => setToggleConPass(!toggleConPass)} />
									</div>
								</div>
							</>
						)}
						<div className='flex flex-col-reverse md:flex-row gap-2 mt-3'>
							{step <= 0 && (
								<button
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
									onClick={() => setStep(step + 1)}
								>
									Next
								</button>
							)}
							{step === 1 && (
								<>
									<button
										className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
										onClick={() => setStep(step - 1)}
									>
										Back
									</button>
									<button
										className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
										onClick={() => setStep(step + 1)}
									>
										Next
									</button>
								</>
							)}
							{step === 2 && (
								<>
									<button
										className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
										onClick={() => setStep(step - 1)}
									>
										Back
									</button>
									<button
										className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
										onClick={handleSignUp}
									>
										Create Account
									</button>
								</>
							)}
						</div>
					</div>
					<div className='py-2'>
						<hr className='my-2 border-gray-500 w-full' />
						<p className='my-5'>
							Already have an account?
							<Link to={'/owners/login'} className='mx-1 text-blue-500 hover:text-blue-700 font-medium'>
								Sign in now
							</Link>
						</p>
						<p>&copy; 2022 Trace With Us Registeration page</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default OwnersRegistration;
