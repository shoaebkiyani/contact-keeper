// react-hook
import { useState } from 'react';

// react-router
import { Link, useLocation, useNavigate } from 'react-router-dom';

// react-redux-store
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';

interface NavbarProps {
	Logo: string;
	title: string;
	navLinks: { title: string; url: string }[];
}

function Navbar({ Logo, title, navLinks }: NavbarProps) {
	const [navMenu, setNavMenu] = useState(false);
	const [dropMenu, setDropMenu] = useState(false);

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const location = useLocation();

	const isHome = location.pathname === '/';

	const navStyle = {
		backgroundColor: isHome ? 'transparent' : '#111827',
	};

	const handleNav = () => {
		setNavMenu(!navMenu);
		setDropMenu(!dropMenu);
	};

	const [logoutApiCall] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutApiCall({}).unwrap();
			dispatch(logout());
			setDropMenu(!dropMenu);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};
	const navLinks1 = navLinks.filter(
		(link) =>
			link.title.toLowerCase() !== 'register' &&
			link.title.toLowerCase() !== 'login'
	);

	return (
		<nav className='fixed h-[5rem] w-full text-white z-10' style={navStyle}>
			<div className='flex items-center justify-between flex-wrap mx-auto py-5 px-10 w-full'>
				<Link to='/'>
					<div className='flex justify-start items-center space-x-2'>
						<img className='w-10 h-10 xs:w-8 xs:h-8' src={Logo} alt='logo' />
						<span className='text-base font-medium xs:text-sm'>{title}</span>
					</div>
				</Link>
				{/* mobile burger menu */}
				<button
					data-collapse-toggle='navbar-default'
					type='button'
					className='inline-flex items-center p-2 w-10 h-10 xs:w-8 xs:h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
					aria-controls='navbar-default'
					aria-expanded='false'
					onClick={handleNav}
				>
					<span className='sr-only'>Open main menu</span>
					<svg
						className='w-5 h-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 17 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M1 1h15M1 7h15M1 13h15'
						/>
					</svg>
				</button>
				<div
					className={`h-10 xs:h-70 w-full mt-4 md:mt-0  md:w-auto md:flex md:items-center ${
						navMenu ? '' : 'hidden'
					}`}
				>
					{userInfo ? (
						<div
							className='flex flex-col justify-end md:border-red'
							key={userInfo._id}
						>
							<button
								id='dropdownInformationButton'
								data-dropdown-toggle='dropdownInformation'
								className='h-12 md:h-12 md:w-12 text-white bg-gray-900 hover:bg-gray-900 md:rounded-full xs:bg-blue-700 sm:bg-blue-700 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium xs:rounded-lg sm:rounded-lg text-sm text-center inline-flex items-center justify-center flex-col md:dark:bg-gray-900 md:hover:bg-gray-800 dark:hover:bg-blue-600 xs:dark:bg-blue-700
								sm:dark:bg-blue-700 dark:focus:ring-blue-800'
								type='button'
								onClick={handleNav}
							>
								{
									<img
										className='h-7 w-7 rounded-full bg-cover'
										src={userInfo.profileImage}
										alt='profile'
									></img>
								}
							</button>
							<div
								id='dropdownInformation'
								className={`md:absolute md:top-[4.5rem] md:right-10 z-10 text-center bg-white divide-y divide-gray-800 focus:ring-0 focus:outline-none focus:ring-blue-300 rounded-lg rounded-t-none shadow md:w-72 dark:bg-blue-700 dark:divide-gray-800 
								${dropMenu ? 'mt-[-5px]' : 'hidden'}
								`}
							>
								<div className='px-4 py-3 text-sm text-gray-900 dark:text-white bg-blue-900'>
									<div>{userInfo.name}</div>
									<div className='font-medium truncate'>{userInfo.email}</div>
								</div>
								<ul
									className='py-2 text-sm text-gray-700 dark:text-gray-200'
									aria-labelledby='dropdownInformationButton'
								>
									<li>
										{navLinks1.map((link, index) => (
											<ul key={index}>
												<li className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-600 dark:hover:text-white border-b border-1'>
													<Link to={link.url}>{link.title}</Link>
												</li>
											</ul>
										))}
									</li>
									<li>
										<Link
											to='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-600 dark:hover:text-white border-b border-1'
										>
											Profile
										</Link>
									</li>
									<li>
										<Link
											to='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-600 dark:hover:text-white'
										>
											Settings
										</Link>
									</li>
								</ul>
								<div className='py-2 bg-blue-900 dark:hover:bg-blue-600'>
									<div
										className='block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-600 dark:text-gray-200 dark:hover:text-white font-bold'
										onClick={handleLogout}
									>
										Logout
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<nav className='md:flex md:items-center md:top-0 list-none md:space-x-10 xs:bg-blue-800 sm:bg-blue-800 h-80 rounded-md'>
								{navLinks.map((link, index) =>
									link.url === 'register' ? (
										<li
											key={index}
											className='text-center border-b xs:py-4 sm:py-6 md:pb-0 md:border-b-0'
										>
											<Link
												to={link.url}
												className='px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
											>
												{link.title}
											</Link>
										</li>
									) : (
										<li
											key={index}
											className='text-base font-medium xs:mb-8 xs:py-6 sm:py-6 xs:pb-2 border-b md:border-b-0 md:mb-0 text-center xs:hover:bg-blue-500 sm:hover:bg-blue-500'
										>
											<Link to={link.url}>{link.title}</Link>
										</li>
									)
								)}
							</nav>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
