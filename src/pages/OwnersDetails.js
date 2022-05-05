import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/Authenticate';
import { useNavigate } from 'react-router-dom';
import { faChevronLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OwnersDetails = () => {
	const { auth } = useAuth();

	const navigate = useNavigate();

	return (
		<>
			<Navbar />
			<section className='flex flex-col md:flex-row items-center min-h-screen'>
				<div className='container mx-auto bg-white h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-start flex-col mt-4'>
						<p className='font-semibold text-lg'>ONWERS</p>
						<h1 className='text-4xl font-bold text-blue-500'>
							Trace With Us <span className='text-black'>Owner Details Page</span>
						</h1>

						<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
							<div className='px-4 py-5 sm:px-6'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>Owner Information</h3>
								<p className='mt-1 max-w-2xl text-sm text-gray-500'>Personal details and application</p>
							</div>
							<div className='border-t border-gray-200'>
								<dl>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Name of Store/Establishment</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.nameStore}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Name</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.name}</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Email</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.email}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Age</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.age}</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Gender</dt>
										<dd className='capitalize mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.gender}</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Phone</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.phone}</dd>
									</div>

									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Address</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>{auth.address}</dd>
									</div>
								</dl>
							</div>
							<div className='border-t px-4 py-2 bg-white'>
								<div className='flex justify-end items-center gap-2'>
									<button
										className='py-2 px-4 bg-gray-200 rounded-md text-gray-900 hover:text-white hover:bg-gray-500 font-medium text-center shadow-md shadow-gray-200/50'
										onClick={() => navigate(-1)}
									>
										<FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
										Back
									</button>
									<Link
										to={auth.id.toString()}
										className='py-2 px-4 bg-emerald-200 rounded-md text-emerald-900 hover:text-white hover:bg-emerald-500 font-medium text-center shadow-md shadow-emerald-200/50'
									>
										<FontAwesomeIcon icon={faPencilAlt} className='mr-2' />
										Edit
									</Link>
								</div>
							</div>
						</div>

						<hr className='my-4 border-gray-600 w-full' />
						<p className='mt-8'>
							<Link to={'/owners'} className='text-blue-500 hover:text-blue-700 font-medium'>
								Back to Home Page
							</Link>
						</p>
						<p>&copy; 2022 Trace With US User Details Page</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default OwnersDetails;
