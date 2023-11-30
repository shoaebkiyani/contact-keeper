import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import RootLayout from './components/routerLayout/RootLayout';

import PrivateRoute from './components/routerLayout/PrivateRoute';
import Contact from './components/pages/contactsPages/Contacts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='' element={<PrivateRoute />}>
					<Route path='/contacts' element={<Contact />} />
				</Route>
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />
		</>
	);
}

export default App;
