import Logo from '../../assets/Logo/logo.png';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { AppDispatch, RootState } from '../../app/store';

import { toast } from 'react-toastify';
import { useGetContactsQuery } from '../../slices/contactsApiSlice';

function Login() {
	const [formInputs, setFormInputs] = useState({
		email: '',
		password: '',
	});

	interface formInputs {
		email: string;
		password: string;
	}

	const { email, password } = formInputs;

	const navigate = useNavigate();

	const [login] = useLoginMutation();

	const { userInfo } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	const { data: contact, isLoading, error } = useGetContactsQuery();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo, contact, isLoading, error]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate('/');
		} catch (err: any) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className='w-full h-screen bg-gray-900'>
			<section className='bg-gray-50 dark:bg-gray-900 h-full flex justify-center items-center'>
				{isLoading ? (
					<div className='flex justify-center items-center h-screen dark:text-white'>
						Loading...
					</div>
				) : (
					<div className='flex items-center justify-center mx-auto xs:w-[80%] sm:min-w-[80%] md:w-[50%] h-[80%] my-auto xs:mt-[5.2rem] sm:mt-20 mt-28'>
						<div className='w-full xs:h-full sm:h-[80%] md:h-[80%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
							<div className='h-full flex flex-col items-center justify-evenly'>
								<Link
									to='/'
									className='flex items-center justify-center mb-2 text-lg xs:text-sm sm:text-md font-semibold text-gray-900 dark:text-white'
								>
									<img className='w-8 h-8 mr-2' src={Logo} alt='logo' />
									Contact Keeper
								</Link>
								<h1 className='xs:text-sm text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
									Login to your account
								</h1>
								<form
									className='space-y-4 md:space-y-6'
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div className='w-[90%] xs:w-full md:w-full sm:w-full mx-auto'>
										<label
											htmlFor='email'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Email
										</label>
										<input
											type='email'
											name='email'
											id='email'
											autoComplete='email'
											placeholder='name@company.com'
											value={email}
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									<div className='py-1 mb-2'>
										<label
											htmlFor='password'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Password
										</label>
										<input
											type='password'
											name='password'
											id='password'
											placeholder='••••••••'
											value={password}
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									<button
										type='submit'
										className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									>
										Login
									</button>
									<p className='xs:text-[10px] sm:text-sm font-light text-gray-500 dark:text-gray-400'>
										Don't have an account?{' '}
										<Link
											to='/register'
											className='font-medium text-blue-600 hover:underline dark:text-blue-500'
										>
											Register here
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				)}
			</section>
		</div>
		// 	<div className='w-full h-screen bg-gray-900'>
		// 	<section className='bg-gray-50 dark:bg-gray-900 h-full flex justify-center items-center'>
		// 		{isLoading ? (
		// 			<div className='flex justify-center items-center h-screen dark:text-white'>
		// 				Loading...
		// 			</div>
		// 		) : (
		// 			<div className='flex items-center justify-center mx-auto xs:w-[80%] sm:min-w-[80%] md:w-[50%] h-[80%] my-auto xs:mt-[5.2rem] sm:mt-20 mt-28'>
		// 				<div className='w-full h-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
		// 					<div className='h-full flex flex-col items-center justify-evenly'>
		// 						<h1 className='text-xl xs:text-sm sm:text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
		// 							<Link
		// 								to='/'
		// 								className='flex items-center justify-center mb-2 text-lg xs:text-sm sm:text-md font-semibold text-gray-900 dark:text-white'
		// 							>
		// 								<img className='w-6 h-6 mr-2' src={Logo} alt='logo' />
		// 								Contact Keeper
		// 							</Link>
		// 						</h1>
		// 						<div className='flex justify-center xs:text-sm font-bold text-xl text-white'>
		// 							Login to your account
		// 						</div>
		// 						<form
		// 							className='space-y-2 md:space-y-4'
		// 							onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
		// 								handleSubmit(e)
		// 							}
		// 						>
		// 							<div className='px-2 w-[90%] md:w-full sm:w-full mx-auto'>
		// 								<div className='py-1'>
		// 									<label
		// 										htmlFor='name'
		// 										className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
		// 									>
		// 										Email
		// 									</label>
		// 									<input
		// 										type='email'
		// 										name='email'
		// 										id='email'
		// 										value={email}
		// 										placeholder='johndoe@email.com'
		// 										onChange={handleChange}
		// 										className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
		// 									/>
		// 								</div>
		// 								<div className='py-1 mb-2'>
		// 									<label
		// 										htmlFor='password'
		// 										className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
		// 									>
		// 										Password
		// 									</label>
		// 									<input
		// 										type='password'
		// 										name='password'
		// 										id='password'
		// 										value={password}
		// 										placeholder='••••••••'
		// 										onChange={handleChange}
		// 										className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
		// 									/>
		// 								</div>

		// 								<button
		// 									type='submit'
		// 									className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 xs:py-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
		// 								>
		// 									Login
		// 								</button>
		// 								<p className='xs:text-[10px] sm:text-sm font-light text-gray-500 dark:text-gray-400'>
		// 									Don't have an account?{' '}
		// 									<Link
		// 										to='register'
		// 										className='font-medium text-blue-600 hover:underline dark:text-blue-500'
		// 									>
		// 										Register here
		// 									</Link>
		// 								</p>
		// 							</div>
		// 						</form>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		)}
		// 	</section>
		// </div>
	);
}
export default Login;
