import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { axiosApi } from '../api/serverApi';
import Navbar from '../components/Navbar';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VisitorsDetails = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const [data, setData] = useState({});

	const visitedAt = new Date(data.created_at);

	useEffect(() => {
		findOwnersVistoryById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const findOwnersVistoryById = async () => {
		try {
			const { data } = await axiosApi.get('/healthForm/owners/find', { params: { id: id } });
			setData(data);
			return data;
		} catch (error) {
			console.log(error?.response?.data);
		}
	};
	return (
		<>
			<Navbar />
			<section className='flex flex-col md:flex-row items-center min-h-screen'>
				<div className='container mx-auto bg-white h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-start flex-col mt-4'>
						<p className='font-semibold text-lg'>VISITORS</p>
						<h1 className='text-4xl font-bold text-blue-500 my-1'>
							Trace With Us <span className='text-black'>Visit History Details Page</span>
						</h1>
						<div className='bg-white shadow  sm:rounded-lg'>
							<div className='px-4 py-5 sm:px-6'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>History Information</h3>
								<p className='mt-1 max-w-2xl text-sm text-gray-500'>View your visit details</p>
							</div>
							<div className='border-t border-gray-200'>
								<div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Vistor ID</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{id}</dd>
									</div>

									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Name</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.name}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Age</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.age}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Gender</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.gender}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Email</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.email}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Phone</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.phone}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Address</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.address}</dd>
									</div>

									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Visited At</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{visitedAt.toLocaleString()}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Temperature</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{data.temperature}</dd>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>Questions</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
										<ul className='border border-gray-200 rounded-md divide-y bg-white'>
											<li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
												<div className='w-0 flex-1 flex items-center'>
													<span className='ml-2 flex-1 w-0 truncate'>Did you have cough or colds for the past 3 days?</span>
												</div>
												<div className='capitalize ml-4 flex-shrink-0'>{data.question_1}</div>
											</li>
											<li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
												<div className='w-0 flex-1 flex items-center'>
													<span className='ml-2 flex-1 w-0 truncate'>Did you have fever or flu for the past 3 days?</span>
												</div>
												<div className='capitalize ml-4 flex-shrink-0'>{data.question_2}</div>
											</li>
											<li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
												<div className='w-0 flex-1 flex items-center'>
													<span className='ml-2 flex-1 w-0 truncate'>have you travelled outside the province?</span>
												</div>
												<div className='capitalize ml-4 flex-shrink-0'>{data.question_3}</div>
											</li>
										</ul>
									</dd>
								</div>
							</div>
							<div className='border-t px-4 py-2 bg-white'>
								<div className='flex justify-end items-center gap-2'>
									<button
										className='py-2 px-4 bg-gray-200 hover:bg-gray-500 rounded-md text-gray-900 hover:text-white font-medium text-center shadow-md shadow-gray-200/50'
										onClick={() => navigate(-1)}
									>
										<FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
										Back
									</button>
								</div>
							</div>
						</div>

						<hr className='my-4 border-gray-600 w-full' />
						<div className='py-5'>
							<p className='mt-3'>
								<Link to={'/owners'} className='text-blue-500 hover:text-blue-700 font-medium'>
									Back to Home Page
								</Link>
							</p>
							<p>&copy; 2022 Trace With Us Visit History Details Page</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default VisitorsDetails;
