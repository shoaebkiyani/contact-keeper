// react-hooks
import { useState } from 'react';

// react-icons
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdDone } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
import { MdDescription } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdOutlinePhoneAndroid } from 'react-icons/md';

// types
import { IContact } from '../../../models/contactModel';

// react-redux slice
import {
	useDeleteContactMutation,
	useUpdateContactMutation,
} from '../../../slices/contactsApiSlice';

// react-toastify
import { toast } from 'react-toastify';

function ContactItem(contact: IContact) {
	const [isEdit, setIsEdit] = useState(false);

	const [currentContact, setCurrentContact] = useState<Partial<IContact>>();
	const { firstname, lastname, email, phone, notes } = contact;

	const [deleteContact] = useDeleteContactMutation();
	const [updateContact] = useUpdateContactMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentContact((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleEdit = async (id: string) => {
		if (id) {
			setIsEdit(true);
			setCurrentContact(contact);
		} else {
			setIsEdit(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Confirm delete')) {
			await deleteContact(id);
			toast.success('Record deleted successfully');
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (window.confirm('Are you sure you want to update the recored?')) {
			await updateContact(currentContact);
			toast.success('Record updated successfully');
		}
		setIsEdit(false);
	};

	return (
		<section className=''>
			<div className='flex justify-between bg-gray-800 mb-2 p-3 rounded-md font-small md:font-medium w-full border'>
				<div className='flex flex-col'>
					<div className='flex items-center'>
						<FaUser className='mr-2' size={12} />
						{isEdit ? (
							<form
								className='w-full flex justify-start bg-gray-800 rounded-md'
								onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
									handleSubmit(e)
								}
							>
								<input
									type='text'
									name='firstname'
									id='firstname'
									value={currentContact?.firstname}
									className='w-full border border-black lg:w-[100px] rounded-md bg-gray-200 text-black pl-2'
									onChange={handleChange}
								/>
								<input
									type='text'
									name='lastname'
									id='lastname'
									value={currentContact?.lastname}
									className='w-full border border-black lg:w-[100px] rounded-md bg-gray-200 text-black pl-2'
									onChange={handleChange}
								/>
								<div className='flex items-center justify-center bg-gray-800 rounded-sm'>
									<button
										type='button'
										className='text-red-400 mr-2'
										onClick={() => setIsEdit(false)}
									>
										<TiDeleteOutline size={20} />
									</button>
									<button
										type='submit'
										className='text-green-400 font-extrabold'
									>
										<MdDone size={20} />
									</button>
								</div>
							</form>
						) : (
							`${firstname} ${lastname}`
						)}
					</div>
					<div className='flex items-center'>
						<MdEmail className='mr-2' size={12} />
						{email}
					</div>
					<div className='flex items-center'>
						<MdOutlinePhoneAndroid className='mr-2' size={12} />
						{phone}
					</div>
					<div className='flex items-center'>
						<MdDescription className='mr-2' size={12} />
						<div className='w-full h-full'>{notes}</div>
					</div>
				</div>
				<div>
					{isEdit ? (
						<div className='flex items-center justify-center'>
							{/* <button
								type='button'
								className='text-red-400 mr-2'
								onClick={() => setIsEdit(false)}
							>
								<TiDeleteOutline size={20} />
							</button>
							<button type='submit' className='text-green-400 font-extrabold'>
								<MdDone size={20} />
							</button> */}
						</div>
					) : (
						<div className='flex justify-center items-center space-x-1'>
							<div
								className='text-green-400 cursor-pointer'
								onClick={() => handleEdit(contact._id!)}
							>
								<AiFillEdit size={20} />
							</div>
							<div
								className='text-red-400 cursor-pointer'
								onClick={() => handleDelete(contact._id!)}
							>
								<TiDelete size={20} />
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
export default ContactItem;
