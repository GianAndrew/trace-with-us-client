import { useState, useEffect } from 'react';
import { useAuth } from '../auth/Authenticate';
import { getCovidCases } from '../features/cases/covidSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRefreshToken } from '../hooks/useRefresh';
import { useAccessToken } from '../hooks/useAccessToken';
import { formatNumber } from '../utils/formatNumber';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { faRightFromBracket, faEye, faUser, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosApi } from '../api/serverApi';

const Home = () => {
	const dispatch = useDispatch();
	const { cases, isLoading, isSuccess } = useSelector((state) => state.covid);

	const navigate = useNavigate();
	const [isLogOut, setIsLogOut] = useState(false);
	const { auth, setAuth } = useAuth();

	const covidUpdateDate = new Date(cases.Date);

	const [tableOfVisit, setTableOfVisit] = useState([]);

	const refresh = useRefreshToken();
	const accessToken = useAccessToken();

	useEffect(() => {
		if (!auth.accessToken) {
			return navigate('/visitors/login');
		}

		accessToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth, navigate]);

	useEffect(() => {
		refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		axiosApi
			.get('/healthForm', { params: { id: auth.id } })
			.then((result) => {
				setTableOfVisit(result.data);
				return result;
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}, [auth]);

	useEffect(() => {
		dispatch(getCovidCases());
	}, [dispatch]);

	const handleLogOut = () => {
		setAuth();
		localStorage.removeItem('user');
	};

	return (
		<>
			<Navbar />

			{isLogOut && (
				<>
					<div className='fixed z-30 inset-0 overflow-y-auto'>
						<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
							<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

							<span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>

							<div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10'>
											<FontAwesomeIcon icon={faRightFromBracket} className='text-red-500' />
										</div>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											<h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
												Log Out
											</h3>
											<div className='mt-2'>
												<p className='text-sm text-gray-500'>Hello, do you want to log out your account?</p>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 flex flex-col-reverse gap-2 md:px-6 md:flex-row-reverse md:gap-0'>
									<button
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-200 text-base font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
										onClick={handleLogOut}
									>
										Log Out
									</button>
									<button
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'
										onClick={() => setIsLogOut(!isLogOut)}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<section className='flex flex-row md:flex-row items-center min-h-screen'>
				<div className='container mx-auto bg-white h-screen py-2 md:py-5 px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-start flex-col'>
						<p className='text-gray-500 font-semibold text-lg'>VISITORS</p>
						<h1 className='text-3xl md:text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-black'>Home Page</span>
						</h1>
						<div className='flex flex-col gap-2 mt-5'>
							<div className='h-full flex flex-col md:flex-row py-2'>
								<div className='flex flex-col flex-[2] mx-2'>
									<div className='px-4 py-2 border rounded-md'>
										{isLoading && (
											<>
												<div className='flex flex-col items-center'>
													<svg
														role='status'
														className='w-8 h-8 m-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
														viewBox='0 0 100 101'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
															fill='currentColor'
														/>
														<path
															d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
															fill='currentFill'
														/>
													</svg>
												</div>
											</>
										)}
										{isSuccess && (
											<>
												<div className='px-4 py-2 bg-white'>
													<p className='text-sm font-medium py-2'>ID#{auth.id}</p>
													<h1 className='text-gray-900 font-medium text-1xl md:text-2xl'>
														<span className='text-blue-500'>Hello, </span>
														{auth.name}
													</h1>
													<p className='text-gray-500 mb-2 text-sm md:text-md'>{auth.email}</p>
												</div>
												<hr />
												<div className='px-4 py-2 flex  flex-col lg:flex-row gap-2'>
													<button
														className='flex flex-1 gap-2 justify-center items-center bg-blue-200 text-blue-600 hover:text-white hover:bg-blue-500 font-medium py-1 px-3 text-sm rounded'
														onClick={() => navigate('/visitors/userdetails')}
													>
														<FontAwesomeIcon icon={faUser} />
														See Details
													</button>
													<button
														className='flex flex-1 gap-2 justify-center items-center bg-emerald-200 text-emerald-600 hover:text-white hover:bg-emerald-500 font-medium py-1 px-3 text-sm rounded'
														onClick={() => navigate('/visitors/healthForm')}
													>
														<FontAwesomeIcon icon={faPlus} />
														Add Form
													</button>
													<button
														className='flex flex-1 gap-2 justify-center items-center bg-red-200 text-red-600 hover:text-white hover:bg-red-500 font-medium py-1 px-3 text-sm rounded'
														onClick={() => setIsLogOut(true)}
													>
														<FontAwesomeIcon icon={faSignOut} />
														Log Out
													</button>
												</div>
											</>
										)}
									</div>

									<div className='h-full px-4 py-2 border rounded-md my-2'>
										{isLoading && (
											<>
												<div className='flex flex-col items-center'>
													<svg
														role='status'
														className='w-8 h-8 m-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
														viewBox='0 0 100 101'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
															fill='currentColor'
														/>
														<path
															d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
															fill='currentFill'
														/>
													</svg>
												</div>
											</>
										)}
										{isSuccess && (
											<>
												<div className='px-2 py-2 bg-white'>
													<h1 className='text-gray-900 text-lg md:text-xl font-bold leading-tight'>Visit History</h1>
													<h2 className='text-gray-500 text-sm'>Look the recent visit.</h2>
												</div>
												<hr className='border-gray-100' />
												<div className='h-[350px] px-5 overflow-scroll'>
													<table className='w-full flex-1'>
														<thead>
															<tr className='text-left'>
																<th className='p-2'>No.</th>
																<th className='p-2'>Establisment</th>

																<th className='p-2'>Visited At</th>
																<th></th>
															</tr>
														</thead>
														<tbody>
															{tableOfVisit.map((item) => {
																const dateOfVisit = new Date(item.created_at);
																return (
																	<tr key={item.id}>
																		<td className='p-3 font-medium text-gray-500'>#{item.id}</td>
																		<td className='p-3 font-normal text-gray-500'>{item.establishment_code}</td>
																		<td className='p-3 font-normal text-gray-500'>{dateOfVisit.toLocaleString()}</td>
																		<td>
																			<Link
																				to={'/visitors/healthForm/' + item.id}
																				className='flex gap-2 justify-center items-center py-1 px-4 border bg-blue-100 rounded text-blue-500 hover:text-white hover:bg-blue-500 font-medium w-full text-sm'
																			>
																				<FontAwesomeIcon icon={faEye} />
																				Details
																			</Link>
																		</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
													<hr />
												</div>
											</>
										)}
									</div>
								</div>

								<div className='border flex-1 mx-2 bg-slate-50 rounded-md flex flex-col justify-center items-center'>
									{isLoading && (
										<>
											<svg
												role='status'
												className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
												viewBox='0 0 100 101'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
													fill='currentColor'
												/>
												<path
													d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
													fill='currentFill'
												/>
											</svg>
										</>
									)}
									<div className='w-full'>
										{isSuccess && (
											<>
												<div className='px-3 py-2 bg-white'>
													<h1 className='text-gray-900 text-lg md:text-xl font-bold leading-tight'>COVID-19 Updates</h1>
													<p className='text-sm md:text-md text-gray-500 flex justify-start items-center gap-1'>
														<i className='fa fa-globe'></i>Global
													</p>
													<hr className='border-gray-200 my-2' />
													<p className='text-sm text-gray-600'>{covidUpdateDate.toLocaleString()}</p>
												</div>
												<div className='flex-1 flex flex-col px-2 py-2 gap-1'>
													<div className='flex-1 border py-2 px-5 bg-blue-500 rounded'>
														<h1 className='text-white text-xl lg:text-1xl font-medium py-3'>Total Cases</h1>
														<hr />
														<p className='text-white py-2 text-sm md:text-md'>{formatNumber(cases.TotalConfirmed)} Cases</p>
													</div>

													<div className='flex-1 border py-2 px-5 bg-red-500 rounded'>
														<h1 className='text-white text-xl lg:text-1xl font-medium py-3'>Total of New Confirmed</h1>
														<hr />
														<p className='text-white py-2 text-sm md:text-md'>{formatNumber(cases.NewConfirmed)} Cases</p>
													</div>
													<div className='flex-1 border py-2 px-5 bg-slate-500 rounded'>
														<h1 className='text-white text-xl lg:text-1xl font-medium py-3'>Total of New Deaths</h1>
														<hr />
														<p className='text-white py-2 text-sm md:text-md'>{formatNumber(cases.NewDeaths)} Cases</p>
													</div>
													<div className='flex-1 border py-2 px-5 bg-gray-700 rounded'>
														<h1 className='text-white text-xl lg:text-1xl font-medium py-3'>Total Deaths</h1>
														<hr />
														<p className='text-white py-2 text-sm md:text-md'>{formatNumber(cases.TotalDeaths)} Cases</p>
													</div>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
							<hr className='my-6 border-gray-600 w-full' />
							<p>&copy; 2022 Trace With Us Home page</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
