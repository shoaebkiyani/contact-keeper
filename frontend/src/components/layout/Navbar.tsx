import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
	Logo: string;
	title: string;
	navLinks: { title: string; url: string }[];
}

function Navbar({ Logo, title, navLinks }: NavbarProps) {
	const location = useLocation();

	const isHome = location.pathname === '/';

	const navStyle = {
		backgroundColor: isHome ? 'transparent' : '#00060e',
	};

	return (
		<div className='fixed w-full text-white' style={navStyle}>
			<div className='flex items-center justify-between py-5 px-10 w-100'>
				<Link to='/'>
					<div className='flex justify-start items-center space-x-2'>
						<img className='w-10 h-10' src={Logo} alt='logo' />
						<span>{title}</span>
					</div>
				</Link>
				<nav className='flex list-none space-x-5'>
					{navLinks.map((link, index) => (
						<li key={index}>
							<Link to={link.url}>{link.title}</Link>
						</li>
					))}
				</nav>
			</div>
		</div>
	);
}
export default Navbar;
