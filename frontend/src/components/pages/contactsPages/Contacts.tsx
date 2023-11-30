import { useState } from 'react';
import {
	useGetContactsQuery,
	useAddContactMutation,
} from '../../../slices/contactsApiSlice';
import ContactItem from './ContactItem';
import { toast } from 'react-toastify';

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

	const { data: contacts, isLoading, error } = useGetContactsQuery();
	const [addContact] = useAddContactMutation();

	const { firstname, lastname, email, phone, notes } = formInputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await addContact(formInputs);
		toast.success('Contact added successfully');
		setFormInputs({
			_id: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			notes: '',
		});
		if (error) {
			toast.warn('Error adding contact');
		}
	};

	return (
		<section className='absolute w-full min-h-[calc(100vh-5rem)] mt-20'>
			<div className='flex flex-col justify-center mx-auto min-h-screen bg-slate-800 text-white bg-center bg-cover bg-blend-overlay bg-black/30'>
				<div className='flex flex-col md:flex-row items-center justify-center md:items-start px-6 py-8 w-full mx-auto min-h-[calc(100vh-5rem)] lg:py-0'>
					<div className='mx-auto md:p-5 mb-2 md:mb-0 flex flex-col w-full'>
						<h1 className='font-medium text-2xl mb-2'>Add Form</h1>
						<div className='bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
							<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
								<h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
									Add contact
								</h1>
								<form
									className='space-y-4 md:space-y-6'
									onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div>
										<label
											htmlFor='name'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											First name
										</label>
										<input
											type='name'
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
											htmlFor='name'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Last name
										</label>
										<input
											type='name'
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
						{isLoading ? (
							<h2>Loading...</h2>
						) : error ? (
							<>{error!}</>
						) : (
							<>
								<h2 className='font-medium text-2xl mb-2'>Contacts</h2>
								<div className='bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-full p-2 dark:bg-gray-800 dark:border-gray-700 h-[calc(100vh-26.3px)] overflow-scroll'>
									<div className='sticky scroll-m-2'>
										<input
											type='text'
											className='mb-2 h-8 rounded-md w-full bg-gray-200'
										/>
									</div>
									{contacts?.map((contact) => (
										<ContactItem key={contact._id} {...contact} />
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
export default Contacts;
