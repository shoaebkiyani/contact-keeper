import Navbar from '../layout/Navbar';

import { Outlet } from 'react-router-dom';

import Logo from '../../assets/Logo/logo.png';

function RootLayout() {
	const title = 'Contact Keeper';
	const navLinks = [
		{ title: 'Home', url: '/' },
		{ title: 'About', url: 'about' },
		{ title: 'Login', url: 'login' },
		{ title: 'Register', url: 'register' },
	];
	return (
		<div className='font-mono'>
			<nav>
				<Navbar Logo={Logo} title={title} navLinks={navLinks} />
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default RootLayout;
