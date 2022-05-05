import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/Authenticate';
import { faChevronLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosApi } from '../api/serverApi';

const EditOwnerDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();

	const [nameStore, setNameStore] = useState(auth.nameStore);
	const [name, setName] = useState(auth.name);
	const [email, setEmail] = useState(auth.email);
	const [age, setAge] = useState(auth.age);
	const [gender, setGender] = useState(auth.gender);
	const [phone, setPhone] = useState(auth.phone);
	const [address, setAddress] = useState(auth.address);

	const handleUpdate = async () => {
		try {
			const { data } = await axiosApi.post('/owners/update', {
				id: parseInt(id),
				name: name,
				nameStore: nameStore,
				email: email,
				age: parseInt(age),
				gender: gender,
				phone: phone,
				address: address,
			});
			setAuth({
				...auth,
				id: id,
				nameStore: nameStore,
				name: name,
				email: email,
				age: age,
				gender: gender,
				phone: phone,
				address: address,
			});

			localStorage.setItem('owners', JSON.stringify({ ...auth, nameStore: nameStore, id: id, email: email, name: name, age: age, gender: gender, phone: phone, address: address }));

			navigate('/owners');
			return data;
		} catch (error) {
			console.log(error?.response?.data);
			return error?.response?.data;
		}
	};

	return (
		<>
			<Navbar />
			<section className='flex flex-col md:flex-row items-center min-h-screen'>
				<div className='container mx-auto bg-white h-screen px-10 md:px-4 lg:px-10 xl:px-12 flex items-center justify-center'>
					<div className='h-full w-full flex items-stretch justify-start flex-col mt-4'>
						<p className='font-semibold text-lg'>VISITORS</p>
						<h1 className='text-4xl font-bold text-blue-500 my-5'>
							Trace With Us <span className='text-black'>Edit Owners Details Page</span>
						</h1>

						<div className='bg-white shadow sm:rounded-lg'>
							<div className='px-4 py-5 sm:px-6'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>Edit Information</h3>
								<p className='mt-1 max-w-2xl text-sm text-gray-500'>change your details</p>
							</div>
							<div className='border-t border-gray-200'>
								<dl>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Name of Store/Establisment</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<input
												type='text'
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												defaultValue={nameStore}
												autoFocus
												onChange={(e) => setNameStore(e.target.value)}
											/>
										</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Name</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<input
												type='text'
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												defaultValue={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Email</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<input
												type='text'
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												defaultValue={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Age</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<input
												type='number'
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												defaultValue={age}
												onChange={(e) => setAge(e.target.value)}
											/>
										</dd>
									</div>
									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Gender</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<select
												name='gender'
												id='gender'
												defaultValue={gender}
												className='w-full bg-slate-200 rounded-lg px-2 py-1 mt-2 border focus:border-slate-500 focus:bg-white focus:outline-none'
												onChange={(e) => setGender(e.target.value)}
											>
												<option value='none'>Prefer not to say</option>
												<option value='male'>Male</option>
												<option value='female'>Female</option>
											</select>
										</dd>
									</div>
									<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Phone</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<input
												type='number'
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												defaultValue={phone}
												onChange={(e) => setPhone(e.target.value)}
											/>
										</dd>
									</div>

									<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='text-sm font-medium text-gray-500'>Address</dt>
										<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:cols-span-2'>
											<textarea
												name='address'
												id='address'
												defaultValue={address}
												className='w-full bg-slate-200 rounded-md px-4 py-1 border focus:border-slate-500 focus:bg-white focus:outline-none'
												onChange={(e) => setAddress(e.target.value)}
											></textarea>
										</dd>
									</div>
								</dl>
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
									<button
										className='py-2 px-4 bg-emerald-200 hover:bg-emerald-500 rounded-md text-emerald-900 hover:text-white font-medium text-center shadow-md shadow-emerald-200/50'
										onClick={handleUpdate}
									>
										<FontAwesomeIcon icon={faPencilAlt} className='mr-2' />
										Update
									</button>
								</div>
							</div>
						</div>

						<hr className='my-4 border-gray-600 w-full' />
						<p className='mt-8'>
							<Link to={'/visitors'} className='text-blue-500 hover:text-blue-700 font-medium'>
								Back to Home Page
							</Link>
						</p>
						<p>&copy; 2022 Trace With Us Edit User Details Page</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default EditOwnerDetails;
