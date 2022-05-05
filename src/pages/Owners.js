import { useState, useEffect } from 'react';
import { useAuth } from '../auth/Authenticate';
import { faRightFromBracket, faEye, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar';
import { axiosApi } from '../api/serverApi';
import { useNavigate, Link } from 'react-router-dom';

const Owners = () => {
	const [isLogOut, setIsLogOut] = useState(false);
	const { auth, setAuth } = useAuth();

	const [tableVisit, setTableVisit] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getOwnersData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getOwnersData = async () => {
		try {
			const { data } = await axiosApi.get('/healthForm/owners', { params: { id: auth.id } });
			setTableVisit(data);

			return data;
		} catch (error) {
			console.log(error?.response?.data);
		}
	};

	const handleLogOut = () => {
		setAuth();
		localStorage.removeItem('owners');
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
						<p className='text-gray-500 font-semibold text-lg'>OWNERS</p>
						<h1 className='text-3xl md:text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-black'>Home Page</span>
						</h1>
						<div className='flex flex-col gap-2 mt-5'>
							<div className='h-full flex flex-col md:flex-row py-2'>
								<div className='flex flex-col flex-[2] mx-2'>
									<div className='px-4 py-2 border rounded-md'>
										<div className='px-4 py-2 bg-white'>
											<p className='text-sm font-medium py-2'>ID#{auth.id}</p>
											<h1 className='text-gray-900 font-medium text-1xl md:text-2xl'>
												<span className='text-blue-500'>Hello, </span>
												{auth.name}
											</h1>
											<p className='text-gray-500 mb-2 text-sm md:text-md'>{auth.email}</p>
										</div>
										<hr />
										<div className='max-w-md px-4 py-2 flex flex-col lg:flex-row gap-2'>
											<button
												className='flex flex-1 gap-2 justify-center items-center bg-blue-200 text-blue-600 hover:text-white hover:bg-blue-500 font-medium py-1 px-3 text-sm rounded'
												onClick={() => navigate('/owners/ownerdetails')}
											>
												<FontAwesomeIcon icon={faUser} />
												See Details
											</button>

											<button
												className='flex flex-1 gap-2 justify-center items-center bg-red-200 text-red-600 hover:text-white hover:bg-red-500 font-medium py-1 px-3 text-sm rounded'
												onClick={() => setIsLogOut(true)}
											>
												<FontAwesomeIcon icon={faSignOut} />
												Log Out
											</button>
										</div>
									</div>

									<div className='h-full px-4 py-2 border rounded-md my-2'>
										<div className='px-2 py-2 bg-white'>
											<h1 className='text-gray-900 text-lg md:text-xl font-bold leading-tight'>Recent Visit</h1>
											<h2 className='text-gray-500 text-sm'>Look the recent visit.</h2>
										</div>
										<hr className='border-gray-100' />
										<div className='h-[350px] px-5 overflow-scroll'>
											<table className='w-full flex-1'>
												<thead>
													<tr className='text-left'>
														<th className='p-2'>No.</th>
														<th className='p-2'>Name</th>

														<th className='p-2'>Visited At</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{tableVisit.map((item) => {
														const dateOfVisit = new Date(item.created_at);
														return (
															<tr key={item.id}>
																<td className='p-3 font-medium text-gray-500'>#{item.id}</td>
																<td className='p-3 font-normal text-gray-500'>{item.name}</td>
																<td className='p-3 font-normal text-gray-500'>{dateOfVisit.toLocaleString()}</td>
																<td>
																	<Link
																		to={'/owners/userdetails/' + item.id}
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

export default Owners;
