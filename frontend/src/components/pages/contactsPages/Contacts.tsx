import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	useGetContactsQuery,
	useAddContactMutation,
} from '../../../slices/contactsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
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

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
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

	const result: FetchBaseQueryError | SerializedError | undefined = error;

	useEffect(() => {
		if (result) {
			if ('status' in result) {
				dispatch(logout());
				navigate('/');
			}
		}
	}, [navigate, userInfo, contacts, isLoading, error, filteredContacts]);

	return (
		<div className='w-full min-h-screen h-full bg-gray-900 text-white'>
			<section className='bg-gray-50 dark:bg-gray-900 min-h-screen h-full flex justify-center items-center xs:p-0 py-4 pb-1 xs:px-2 sm:px-4'>
				{isLoading ? (
					<div className='flex justify-center items-center h-screen'>
						Loading...
					</div>
				) : (
					<div className='flex flex-col gap-2 items-center justify-center mx-auto xs:w-[95%] sm:min-w-[90%] md:w-[70%] lg:w-[50%] h-full my-auto xs:mt-[4.5rem] sm:mt-20 mt-14'>
						<Link
							to='/'
							className='mt-4 border border-gray-700 rounded-md w-full hover:bg-gray-700'
						>
							<button className='text-center w-full'>Back</button>
						</Link>
						<div className='h-ful w-full rounded-md border border-gray-700 shadow-md text-sm'>
							<form
								className='h-ful w-[95%] mx-auto flex flex-col justify-center p-3'
								onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
									handleSubmit(e);
								}}
							>
								<h2 className='text-center text-lg'>Contact Form</h2>
								<div className='flex justify-center items-center gap-2 py-2'>
									<div className='w-full'>
										<input
											type='text'
											placeholder='firstname'
											id='firstname'
											value={firstname}
											onChange={handleChange}
											className='w-full p-2 rounded-md dark:bg-gray-800 border border-gray-700 xs:text-[12px] xs:p-1'
										/>
									</div>
									<div className='w-full'>
										<input
											type='text'
											placeholder='lastname'
											id='lastname'
											value={lastname}
											onChange={handleChange}
											className='w-full p-2 rounded-md dark:bg-gray-800 border border-gray-700 xs:text-[12px] xs:p-1'
										/>
									</div>
								</div>
								<div className='flex justify-center items-center gap-2 py-2'>
									<div className='w-full'>
										<input
											type='email'
											placeholder='email@company.com'
											autoComplete='off'
											id='email'
											value={email}
											onChange={handleChange}
											className='w-full p-2 rounded-md dark:bg-gray-800 border border-gray-700 xs:text-[12px] xs:p-1'
										/>
									</div>
									<div className='w-full'>
										<input
											type='tel'
											placeholder='+358 123 456 789 3'
											autoComplete='off'
											id='phone'
											value={phone}
											onChange={handleChange}
											className='w-full p-2 rounded-md dark:bg-gray-800 border border-gray-700 xs:text-[12px] xs:p-1'
										/>
									</div>
								</div>
								<div className='flex justify-center items-center py-2'>
									<textarea
										rows={3}
										placeholder='notes'
										id='notes'
										value={notes}
										onChange={handleChange}
										className='w-full p-2 rounded-md dark:bg-gray-800 border border-gray-700 xs:text-[12px] xs:p-1'
									/>
								</div>
								<button className='w-full border border-blue-600 p-2 rounded-md bg-blue-800 hover:bg-blue-700 xs:text-[12px] xs:p-1'>
									Add Contact
								</button>
							</form>
						</div>
						<div className='w-full min-w-full border border-gray-700 rounded-md text-sm'>
							<div className='w-[95%] mx-auto flex flex-col justify-start gap-2 p-3'>
								<div className='w-full mx-auto pb-1'>
									<input
										type='text'
										id='search'
										placeholder='Search Contact'
										className='w-full p-1 rounded-md dark:bg-gray-800 border border-gray-700'
										onChange={handleSearchChange}
									/>
								</div>
								<div className='h-full xs:max-h-24 sm:max-h-44 md:max-h-56 lg:max-h-56 xs:text-[12px] w-full overflow-auto whitespace-wrap'>
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
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
export default Contacts;
