import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { axiosApi } from '../api/serverApi';
import { Link } from 'react-router-dom';
import person1 from '../images/person1.png';
import person3 from '../images/person3.png';
import { faClipboardCheck, faEyeSlash, faEye, faExclamationTriangle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Registration = () => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState('');
	const [age, setAge] = useState();
	const [gender, setGender] = useState('male');
	const [phone, setPhone] = useState();
	const [address, setAddress] = useState('');
	const [zipCode, setZipCode] = useState();
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
			const { data } = await axiosApi.post('/visitors/register', { name, age, gender, phone, address, zipCode, email, password });
			setIsSuccess(true);
			return data;
		}
		setIsError(true);
	};

	return (
		<>
			<Navbar />
			<section className='flex flex-col md:flex-row items-center min-h-screen'>
				<div className='bg-white lg:border w-full md:max-w-md lg:max-w-full md:mx-auto lg:mx-0 md:w-1/2 xl:w-2/3 h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
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
												to={'/visitors/login'}
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
					<div className='h-full w-full flex items-stretch justify-center flex-col'>
						<p className='text-gray-500 font-semibold text-md'>VISITORS</p>
						<h1 className='text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-gray-900'>Registration</span>
						</h1>

						<h2 className='text-gray-900 text-xl md:text-2xl font-bold leading-tight mt-10'>Create your account</h2>
						<p className='px-2 py-2 font-semibold'>Step {step + 1} of 3</p>
						{!validMatch && (
							<div className='flex justify-start items-center gap-2 my-4 py-2 px-2 border border-red-300 bg-red-200 text-red-500 font-normal rounded-lg'>
								<div className='rounded-full px-2 py-1 bg-red-300'>
									<FontAwesomeIcon icon={faExclamationTriangle} className='text-red-500' />
								</div>
								Must match the first password input field.
							</div>
						)}

						<div className='flex flex-col gap-2 mt-5'>
							{step === 0 && (
								<>
									<div className='flex flex-col gap-2'>
										<label htmlFor='name' className='block text-gray-900'>
											Name
										</label>
										<input
											type='text'
											placeholder='Enter Name'
											id='name'
											name='name'
											value={name}
											className='w-full bg-slate-200 rounded-lg px-4 py-3 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
									</div>
									<div className='flex flex-col lg:flex-row gap-2'>
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
												className='w-full bg-slate-200 rounded-lg px-4 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
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
												className='w-full bg-slate-200 rounded-lg px-2 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
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
											className='w-full bg-slate-200 rounded-lg px-4 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setPhone(e.target.value)}
										/>
									</div>
								</>
							)}
							{step === 1 && (
								<>
									<div className='flex flex-col gap-2'>
										<label htmlFor='address' className='block text-gray-900'>
											Address
										</label>
										<textarea
											name='address'
											id='address'
											value={address}
											placeholder='Enter your Address'
											className='w-full bg-slate-200 rounded-lg px-4 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setAddress(e.target.value)}
										></textarea>
									</div>
									<div className='flex flex-col gap-2'>
										<label htmlFor='zip-code' className='block text-gray-900'>
											Zip Code/Postal Code
										</label>
										<input
											type='text'
											id='zip-code'
											defaultValue={zipCode}
											name='zipcode'
											placeholder='Enter Zip Code/Postal Code'
											className='w-full bg-slate-200 rounded-lg px-4 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setZipCode(e.target.value)}
										/>
									</div>
								</>
							)}

							{step === 2 && (
								<>
									<div className='flex flex-col gap-2'>
										<label htmlFor='email' className='block text-gray-900'>
											Email
										</label>
										<input
											type='email'
											id='email'
											name='email'
											placeholder='Enter Email Address'
											value={email}
											className='w-full bg-slate-200 rounded-lg px-4 py-3 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='flex flex-col gap-2'>
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

							<hr className='my-6 border-gray-500 w-full' />
							<p className='mt-5'>
								Already have an account?
								<Link to={'/visitors/login'} className='mx-1 text-blue-500 hover:text-blue-700 font-medium'>
									Sign in now
								</Link>
							</p>
							<p>&copy; 2022 Trace With Us Registeration page</p>
						</div>
					</div>
				</div>
				<div className='bg-half-image h-screen hidden lg:block md:w-1/2 xl:w-1/3 overflow-hidden'>
					<div className='relative h-full w-full flex flex-col justify-center items-start px-10'>
						<div className='flex flex-col gap-3 z-20'>
							<h1 className='font-medium text-white text-4xl tracking-wider'>Trace With US</h1>
							<h2 className='max-w-xl text-white font-bold text-5xl'>Join Us in Preventing and Stopping the Spread of the COVID-19 Virus.</h2>
							<p className='max-w-xl text-white font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eligendi libero accusantium corporis autem sit laboriosam sapiente minima aperiam asperiores.
							</p>
						</div>
						<img src={person1} alt='person1' className='absolute z-10 -bottom-[175px] right-[0px] lg:hidden xl:block xl:w-[25rem]' />
						<img src={person3} alt='person3' className='absolute -bottom-[700px] right-[210px] lg:hidden xl:block xl:w-[25rem]' />
					</div>
				</div>
			</section>
		</>
	);
};

export default Registration;
