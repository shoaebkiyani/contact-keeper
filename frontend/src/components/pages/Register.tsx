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
		<div className='w-full h-screen bg-gray-900'>
			<section className='bg-gray-50 dark:bg-gray-900 h-full flex justify-center items-center'>
				{isLoading ? (
					<div className='flex justify-center items-center h-screen dark:text-white'>
						Loading...
					</div>
				) : (
					<div className='flex items-center justify-center mx-auto xs:w-[80%] sm:min-w-[80%] md:w-[50%] xs:h-[85%] h-[80%] my-auto xs:mt-[4rem] sm:mt-28 mt-28'>
						<div className='w-full h-[95%] xs:h-[90%] md:h-full lg:h-full py-4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
							<div className='h-full flex flex-col items-center justify-evenly'>
								<h1 className='text-xl xs:text-sm sm:text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
									<Link
										to='/'
										className='flex items-center justify-center mb-2 text-lg xs:text-sm sm:text-md font-semibold text-gray-900 dark:text-white'
									>
										<img
											className='w-6 h-6 xs:w-5 xs:h-5 mr-2'
											src={Logo}
											alt='logo'
										/>
										Contact Keeper
									</Link>
								</h1>
								<div className='flex justify-center text-white font-medium xs:text-sm'>
									Create an account
								</div>
								<form
									className='space-y-2 md:space-y-4'
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div className='px-2 w-[90%] md:w-full sm:w-full mx-auto lg:space-y-2'>
										<div className='xs:py-1 py-4'>
											<label
												htmlFor='name'
												className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
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
												className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div className='pb-4 xs:py-1'>
											<label
												htmlFor='name'
												className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
											>
												Email
											</label>
											<input
												type='email'
												name='email'
												id='email'
												value={email}
												placeholder='johndoe@email.com'
												onChange={handleChange}
												className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div className='pb-4 xs:py-1'>
											<label
												htmlFor='password'
												className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
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
												className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div className='mb-4 xs:py-1'>
											<label
												htmlFor='confirmPassword'
												className='block mb-1 xs:text-[10px] sm:text-sm font-medium text-gray-900 dark:text-white'
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
												className='bg-gray-50 border border-gray-300 text-gray-900 xs:text-[10px] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 xs:p-1 lg:mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<button
											type='submit'
											className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 xs:py-2 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
										>
											Create an account
										</button>
										<p className='xs:text-[10px] sm:text-sm font-light text-gray-500 dark:text-gray-400'>
											Already have an account?{' '}
											<Link
												to='/login'
												className='font-medium text-blue-600 hover:underline dark:text-blue-500'
											>
												Login here
											</Link>
										</p>
									</div>
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
