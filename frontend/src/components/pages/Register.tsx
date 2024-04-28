// logo
import Logo from '../../assets/Logo/logo.png';

// react-hooks
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// react-redux slice
import { setCredentials } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { useGetContactsQuery } from '../../slices/contactsApiSlice';

// notification
import { toast } from 'react-toastify';
function Register() {
	const [formInputs, setFormInputs] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	interface formInputs {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}

	const { name, email, password, confirmPassword } = formInputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const navigate = useNavigate();

	const [register] = useRegisterMutation();

	const { userInfo } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	const { data: contact, isLoading, error } = useGetContactsQuery();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo, contact, isLoading, error]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate('/');
			} catch (err: any) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<div className='absolute w-full min-h-[calc(100vh-5rem)] mt-20'>
			<section className='bg-gray-50 dark:bg-gray-900'>
				{isLoading ? (
					<div className='flex justify-center items-center h-screen dark:text-white'>
						Loading...
					</div>
				) : (
					<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-5rem)] lg:py-0'>
						<Link
							to='/'
							className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
						>
							<img className='w-8 h-8 mr-2' src={Logo} alt='logo' />
							Contact Keeper
						</Link>
						<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
							<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
								<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
									Create an account
								</h1>
								<form
									className='space-y-4 md:space-y-6'
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div>
										<label
											htmlFor='name'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Name
										</label>
										<input
											type='name'
											name='name'
											id='name'
											value={name}
											placeholder='john doe'
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									<div>
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
											value={email}
											placeholder='name@company.com'
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									<div>
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
											value={password}
											placeholder='••••••••'
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									<div>
										<label
											htmlFor='confirmPassword'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Confirm password
										</label>
										<input
											type='password'
											name='confirmPassword'
											id='confirmPassword'
											value={confirmPassword}
											placeholder='••••••••'
											onChange={handleChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
									{/* <div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='terms'
											aria-describedby='terms'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='terms'
											className='font-light text-gray-500 dark:text-gray-300'
										>
											I accept the{' '}
											<a
												className='font-medium text-blue-600 hover:underline dark:text-blue-500'
												href='#'
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div> */}
									<button
										type='submit'
										className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									>
										Create an account
									</button>
									<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
										Already have an account?{' '}
										<Link
											to='/login'
											className='font-medium text-blue-600 hover:underline dark:text-blue-500'
										>
											Login here
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
export default Register;
