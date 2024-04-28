import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../assets/Images/bg-3.png';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useGetContactsQuery } from '../../slices/contactsApiSlice';
import { useEffect } from 'react';
import { logout } from '../../slices/authSlice';
function Home() {
	const { userInfo } = useSelector((state: RootState) => state.auth);

	const { data: contact, isLoading, error } = useGetContactsQuery();
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();
	const result: any = error;

	useEffect(() => {
		if (result?.status === 401) {
			dispatch(logout());
			navigate('/');
		}
	}, [contact, isLoading, error]);

	return (
		<div
			className='flex flex-col min-h-screen bg-slate-800 text-white bg-center bg-cover bg-blend-overlay bg-black/30'
			style={{
				backgroundImage: `url(${Hero})`,
			}}
		>
			{!isLoading ? (
				<div className='flex justify-center items-center h-screen'>
					<div className='absolute w-full min-h-[calc(100vh-5rem)] mt-20 p-5'>
						<div className='flex flex-col items-center justify-center h-[calc(100vh-8rem)]'>
							<h1 className='mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
								Welcome to{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
									Contact Keeper
								</span>
							</h1>
							<p className='mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
								A digital tool designed to help users efficiently manage and
								organize their contacts.
							</p>
							{userInfo ? (
								<Link
									to='/contacts'
									className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
								>
									Add Contacts
									<svg
										className='w-3.5 h-3.5 ms-2 rtl:rotate-180'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 10'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M1 5h12m0 0L9 1m4 4L9 9'
										/>
									</svg>
								</Link>
							) : (
								<Link
									to='register'
									className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
								>
									Get started
									<svg
										className='w-3.5 h-3.5 ms-2 rtl:rotate-180'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 10'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M1 5h12m0 0L9 1m4 4L9 9'
										/>
									</svg>
								</Link>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className='flex justify-center items-center h-screen'>
					Loading...
				</div>
			)}
		</div>
	);
}
export default Home;
