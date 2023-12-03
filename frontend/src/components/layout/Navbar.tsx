import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
		backgroundColor: isHome ? 'transparent' : '#00060e',
	};

	const handleNav = () => {
		setNavMenu(!navMenu);
	};

	const handleDropMenu = () => {
		setDropMenu(!dropMenu);
	};

	const [logoutApiCall] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutApiCall({}).unwrap();
			dispatch(logout());
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
		<nav className='fixed w-full text-white z-10' style={navStyle}>
			<div className='flex items-center justify-between flex-wrap mx-auto py-5 px-10 w-100'>
				<Link to='/'>
					<div className='flex justify-start items-center space-x-2'>
						<img className='w-10 h-10' src={Logo} alt='logo' />
						<span className='text-base font-medium'>{title}</span>
					</div>
				</Link>
				<button
					data-collapse-toggle='navbar-default'
					type='button'
					className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
					className={`w-full mt-4 md:mt-0 md:block md:w-auto ${
						navMenu ? '' : 'hidden'
					}`}
				>
					{userInfo ? (
						<div
							className='flex justify-end md:border md:border-red'
							key={userInfo._id}
						>
							<button
								id='dropdownInformationButton'
								data-dropdown-toggle='dropdownInformation'
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								type='button'
								onClick={handleDropMenu}
							>
								{userInfo.name}{' '}
								<svg
									className='w-2.5 h-2.5 ms-3'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 10 6'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='m1 1 4 4 4-4'
									/>
								</svg>
							</button>
							<div
								id='dropdownInformation'
								className={`z-10 text-center bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 dark:bg-gray-700 dark:divide-gray-600 ${
									dropMenu
										? 'absolute top-32 md:top-[4.5rem] right-[1.4rem]'
										: 'hidden'
								}`}
							>
								<div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
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
												<li className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
													<Link to={link.url}>{link.title}</Link>
												</li>
											</ul>
										))}
									</li>
									<li>
										<Link
											to='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
										>
											Profile
										</Link>
									</li>
									<li>
										<Link
											to='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
										>
											Settings
										</Link>
									</li>
								</ul>
								<div className='py-2'>
									<div
										className='block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
										onClick={handleLogout}
									>
										Logout
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<nav className='md:flex md:top-0 list-none md:space-x-10'>
								{navLinks.map((link, index) =>
									link.url === 'register' ? (
										<li
											key={index}
											className='text-center border-b-2 pb-2 md:pb-0 md:border-b-0'
										>
											<Link
												to={link.url}
												className='px-3 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
											>
												{link.title}
											</Link>
										</li>
									) : (
										<li
											key={index}
											className='text-base font-medium mb-8 border-b-2 md:border-b-0 md:mb-0 text-center'
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
