import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
	Logo: string;
	title: string;
	navLinks: { title: string; url: string }[];
}

function Navbar({ Logo, title, navLinks }: NavbarProps) {
	const [navMenu, setNavMenu] = useState(false);
	const location = useLocation();

	const isHome = location.pathname === '/';

	const navStyle = {
		backgroundColor: isHome ? 'transparent' : '#00060e',
	};

	const handleNav = () => {
		setNavMenu(!navMenu);
	};

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
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
