import Logo from '../../assets/Logo/logo.png';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCredentials } from '../../slices/authSlice';
import { AppDispatch, RootState } from '../../app/store';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { useGetContactsQuery } from '../../slices/contactsApiSlice';

// Google OAuth
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';

import { toast } from 'react-toastify';

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

	const { data: contacts, isLoading, error } = useGetContactsQuery();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo, contacts, isLoading, error]);

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

	const handleGoogleAuth = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);
			const response = await fetch('/api/users/google', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});
			const googleUser = await response.json();
			dispatch(setCredentials({ ...googleUser }));
		} catch (error) {
			console.log('Error logging in');
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
					<div className='flex items-center justify-center mx-auto xs:w-[80%] sm:min-w-[80%] md:w-[50%] h-[85%] my-auto xs:mt-[4rem] sm:mt-20 mt-20'>
						<div className='w-full xs:h-[90%] sm:h-[85%] md:h-[88%] lg:h-[90%] xs:py-4 sm:py-4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
							<div className='h-full flex flex-col items-center justify-evenly'>
								<Link
									to='/'
									className='flex items-center justify-center mb-2 text-lg xs:text-[12px] sm:text-md font-semibold text-gray-900 dark:text-white xs:hidde'
								>
									<img
										className='w-8 h-8 xs:w-5 xs:h-5 mr-2'
										src={Logo}
										alt='logo'
									/>
									Contact Keeper
								</Link>

								<form
									className='space-y-4'
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div className='flex flex-col justify-center items-center py-2 sm:space-y-2 md:space-y-2'>
										<h1 className='xs:text-[12px] text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white'>
											Login with your email
										</h1>
									</div>

									<div className='w-[90%] xs:w-full md:w-full sm:w-full mx-auto'>
										<label
											htmlFor='email'
											className='block mb-1 xs:mb-1 text-sm xs:text-[12px] font-medium text-gray-900 dark:text-white'
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
									<div className='py-1 mb-1'>
										<label
											htmlFor='password'
											className='block mb-2 xs:mb-1 text-sm xs:text-[12px] font-medium text-gray-900 dark:text-white'
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
									<div className='text-center'>
										<span className='text-white xs:text-[12px]'>or</span>
									</div>
									<button
										type='button'
										className='w-full flex justify-center items-center text-white py- space-x-2 bg-red-900 hover:opacity-90 rounded-lg py-2 cursor-pointer'
										onClick={handleGoogleAuth}
									>
										<span className='w-6 h-6 xs:w-5 xs:h-5 items-center justify-center inline-flex rounded-full font-bold xs:text-[12px] text-sm border-2 border-white'>
											G+
										</span>
										<h2 className='text-sm'>Login with Google</h2>
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
	);
}
export default Login;
