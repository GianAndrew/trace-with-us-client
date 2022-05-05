import { useState } from 'react';
import Navbar from '../components/Navbar';
import { axiosApi } from '../api/serverApi';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/Authenticate';

import { faClipboardCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HealthForm = () => {
	const { auth } = useAuth();
	const [temp, setTemp] = useState();
	const [code, setCode] = useState();
	const [quesOne, setQuesOne] = useState('');
	const [quesTwo, setQuesTwo] = useState('');
	const [quesThree, setQuesThree] = useState('');
	const navigate = useNavigate();

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

	const handleOnSubmit = async () => {
		setIsSuccess(false);
		setIsError(false);
		try {
			const { data } = await axiosApi.post('/healthForm/add', {
				visitorId: auth.id,
				establishmentCode: code,
				temperature: temp,
				qsOne: quesOne,
				qsTwo: quesTwo,
				qsThree: quesThree,
			});
			setIsSuccess(true);
			return data;
		} catch (error) {
			setIsError(true);
			setErrorMsg(error?.response?.data?.msg);
			return error?.response?.data;
		}
	};
	return (
		<>
			<Navbar />
			{isSuccess && (
				<>
					<div className='fixed z-30 top inset-0 overflow-y-auto'>
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
												Health Form Created
											</h3>
											<div className='mt-2'>
												<p className='text-sm text-gray-500'>The health form has been successfully created</p>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<Link
										to={'/visitors'}
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
			{isError && (
				<>
					<div className='fixed z-30 inset-0 overflow-y-auto'>
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
												Health Form Error
											</h3>
											<div className='mt-2'>
												<p className='text-sm text-gray-500'>{errorMsg}</p>
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
			<section className='flex flex-col md:flex-row items-center min-h-screen'>
				<div className='container mx-auto bg-white h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-center flex-col'>
						<p className='font-semibold text-lg'>VISITORS</p>
						<h1 className='text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-black'>Health Form</span>
						</h1>

						<h2 className='text-black text-xl md:text-2xl font-bold leading-tight mt-12'>Fill out the Health Form below.</h2>
						<div className='flex flex-col gap-2 mt-5'>
							<div className='flex flex-col md:flex-row gap-2'>
								<div className='establisment-code flex-1 flex flex-col justify-center items-start gap-2'>
									<label htmlFor='code' className='text-sm block text-slate-700'>
										Establisment Code
									</label>
									<input
										type='text'
										id='code'
										placeholder='Enter Code'
										defaultValue={code}
										className='w-full bg-slate-200 rounded-lg px-4 py-2 md:py-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setCode(e.target.value)}
										autoFocus
									/>
								</div>
								<div className='temperature flex flex-col justify-center items-start gap-2'>
									<label htmlFor='temperature' className='text-sm block text-slate-700'>
										Temperature
									</label>
									<input
										type='number'
										id='temperature'
										defaultValue={temp}
										placeholder='Enter Temperature'
										className='w-full bg-slate-200 rounded-lg px-4 py-2 md:py-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
										onChange={(e) => setTemp(e.target.value)}
									/>
								</div>
							</div>

							<hr className='my-2 border-gray-400' />
							<div className='flex flex-col gap-2 px-2'>
								<div className='queston-1 w-full flex flex-row justify-between py-2'>
									<h4 className='text-sm font-medium'>Did you have cough or colds for the past 3 days?</h4>
									<div className='input flex flex-col md:flex-row justify-center gap-5 px-2 md:px-0'>
										<div className='flex items-center'>
											<input
												id='queston-1-yes'
												name='queston-1'
												type='radio'
												value={'yes'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesOne(e.target.value)}
											/>
											<label htmlFor='queston-1-yes' className='ml-3 block text-sm font-medium text-gray-700'>
												Yes
											</label>
										</div>
										<div className='flex items-center'>
											<input
												id='queston-1-no'
												name='queston-1'
												type='radio'
												value={'no'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesOne(e.target.value)}
											/>
											<label htmlFor='queston-1-no' className='ml-3 block text-sm font-medium text-gray-700'>
												No
											</label>
										</div>
									</div>
								</div>
								<div className='queston-2 w-full flex flex-row justify-between py-2'>
									<h4 className='text-sm font-medium'>Did you have fever or flu for the past 3 days?</h4>
									<div className='input flex flex-col md:flex-row justify-center gap-5 px-2 md:px-0'>
										<div className='flex items-center'>
											<input
												id='queston-2-yes'
												name='queston-2'
												type='radio'
												value={'yes'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesTwo(e.target.value)}
											/>
											<label htmlFor='queston-2-yes' className='ml-3 block text-sm font-medium text-gray-700'>
												Yes
											</label>
										</div>
										<div className='flex items-center'>
											<input
												id='queston-2-no'
												name='queston-2'
												type='radio'
												value={'no'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesTwo(e.target.value)}
											/>
											<label htmlFor='queston-2-no' className='ml-3 block text-sm font-medium text-gray-700'>
												No
											</label>
										</div>
									</div>
								</div>
								<div className='queston-3 w-full flex flex-row justify-between py-2'>
									<h4 className='text-sm font-medium'>have you travelled outside the province?</h4>
									<div className='input flex flex-col md:flex-row justify-center gap-5 px-2 md:px-0'>
										<div className='flex items-center'>
											<input
												id='queston-3-yes'
												name='queston-3'
												type='radio'
												value={'yes'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesThree(e.target.value)}
											/>
											<label htmlFor='queston-3-yes' className='ml-3 block text-sm font-medium text-gray-700'>
												Yes
											</label>
										</div>
										<div className='flex items-center'>
											<input
												id='queston-3-no'
												name='queston-3'
												type='radio'
												value={'no'}
												className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
												onChange={(e) => setQuesThree(e.target.value)}
											/>
											<label htmlFor='queston-3-no' className='ml-3 block text-sm font-medium text-gray-700'>
												No
											</label>
										</div>
									</div>
								</div>
							</div>

							<button
								className='block w-full bg-blue-200 text-blue-500 hover:text-white hover:bg-blue-500 px-4 py-2 mt-5 rounded-lg text-sm font-semibold shadow-md shadow-blue-200/75'
								onClick={handleOnSubmit}
							>
								Submit
							</button>
							<hr className='my-6 border-gray-600 w-full' />
							<p className='mt-8'>
								<button className='text-blue-500 hover:text-blue-700 font-medium' onClick={() => navigate(-1)}>
									Back to Home Page
								</button>
							</p>
							<p>&copy; 2022 Trace With Us Health Form page</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HealthForm;
