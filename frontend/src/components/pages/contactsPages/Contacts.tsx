import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	useGetContactsQuery,
	useAddContactMutation,
} from '../../../slices/contactsApiSlice';
import { logout } from '../../../slices/authSlice';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';

import ContactItem from './ContactItem';

export interface ContactProps {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	notes: string;
}
function Contacts() {
	const [formInputs, setFormInputs] = useState({
		_id: '',
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		notes: '',
	});

	const { userInfo } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	const [searchInput, setSearchInput] = useState<string>('');

	const { data: contacts, isLoading, error } = useGetContactsQuery();
	const [addContact] = useAddContactMutation();

	const { firstname, lastname, email, phone, notes } = formInputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const filteredContacts = contacts?.filter((contact) => {
		return (
			contact.firstname.toLowerCase().includes(searchInput?.toLowerCase()) ||
			contact.lastname?.toLowerCase().includes(searchInput?.toLowerCase())
		);
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result: any = await addContact(formInputs);
			if (result.error) {
				if ('status' in result.error)
					toast.warn('Your session is expired. Please login again');
				dispatch(logout());
				navigate('/');
			} else {
				setFormInputs({
					_id: '',
					firstname: '',
					lastname: '',
					email: '',
					phone: '',
					notes: '',
				});
				toast.success('Contact added successfully');
			}
		} catch (error) {
			toast.warn('Error adding contact');
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			if ('status' in error) {
				dispatch(logout());
				navigate('/');
			}
		}
	}, [navigate, userInfo, error, contacts, handleSubmit]);

	return (
		<section className='w-full min-h-[calc(100vh-56px)] border-2'>
			<div className='flex flex-co justify-center mx-auto bg-slate-800 text-white bg-center bg-cover bg-blend-overlay bg-black/30'>
				{isLoading ? (
					'Loading...'
				) : (
					<div className='flex flex-col md:flex-row items-center justify-center md:items-start px-6 py-8 w-full mx-auto lg:py-0'>
						<div className='mx-auto md:p-5 py-2 md:mb-0 flex flex-col w-full'>
							<h1 className='font-medium text-2xl mb-2'>Add Form</h1>
							<div className='bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
								<div className='p-6 space-y-4 md:space-y-8 sm:p-6'>
									<h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
										Add contact
									</h1>
									<form
										className='space-y-2 md:space-y-4'
										onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
											handleSubmit(e)
										}
									>
										<div>
											<label
												htmlFor='firstname'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												First name
											</label>
											<input
												type='text'
												name='firstname'
												id='firstname'
												value={firstname}
												placeholder='john'
												onChange={handleChange}
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div>
											<label
												htmlFor='lastname'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Last name
											</label>
											<input
												type='text'
												name='lastname'
												id='lastname'
												value={lastname}
												placeholder='doe'
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
												autoComplete='off'
												value={email}
												placeholder='name@company.com'
												onChange={handleChange}
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div>
											<label
												htmlFor='phone'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Phone
											</label>
											<input
												type='tel'
												name='phone'
												id='phone'
												autoComplete='off'
												value={phone}
												placeholder='+358 46 123 4567'
												onChange={handleChange}
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<div>
											<label
												htmlFor='notes'
												className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
											>
												Notes
											</label>
											<input
												type='text'
												name='notes'
												id='notes'
												value={notes}
												placeholder='Notes...'
												onChange={handleChange}
												className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											/>
										</div>
										<button
											type='submit'
											className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
										>
											Add contact
										</button>
									</form>
								</div>
							</div>
						</div>
						<div className='md:p-5 w-full flex flex-col justify-start'>
							<div className='h-screen border-yellow-300'>
								<h2 className='font-medium text-2xl mb-2'>Contacts</h2>
								<div className='bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-full p-2 dark:bg-gray-800 dark:border-gray-700 h-[630px md:max-h-[630px h-full overflow-auto'>
									<div className='sticky scroll-m-2'>
										<input
											type='text'
											name='search'
											id='search'
											placeholder='Search...'
											className='mb-2 p-2 h-8 text-black rounded-md w-full bg-gray-200'
											onChange={handleSearchChange}
										/>
									</div>
									{filteredContacts
										? filteredContacts?.map((contact) => (
												<ContactItem key={contact._id} {...contact} />
										  ))
										: contacts?.map((contact) => (
												<ContactItem key={contact._id} {...contact} />
										  ))}
									<div>
										{filteredContacts?.length !== undefined &&
											filteredContacts.length < 1 && (
												<h2>No contact(s) found</h2>
											)}
									</div>
								</div>
							</div>
							{/* )} */}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
export default Contacts;
