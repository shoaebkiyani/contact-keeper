// url
import { CONTACTS_URL } from '../constants';

// api
import { apiSlice } from './apiSlice';

// types
import { IContact } from '../models/contactModel';

export const contactsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getContacts: builder.query<IContact[], void>({
			query: () => ({
				url: CONTACTS_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Contact'],
		}),
		addContact: builder.mutation<{}, IContact>({
			query: (newContact) => ({
				url: CONTACTS_URL + '/add-contact',
				method: 'POST',
				body: newContact,
			}),
			invalidatesTags: ['Contact'],
		}),
		getContactDetails: builder.query<{}, string>({
			query: (_id) => ({
				url: `${CONTACTS_URL}/${_id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		updateContact: builder.mutation<void, Partial<IContact> | undefined>({
			query: (contact) => ({
				url: `${CONTACTS_URL}/update-contact/${contact?._id}`,
				method: 'PUT',
				body: contact,
			}),
			invalidatesTags: ['Contact'],
		}),
		deleteContact: builder.mutation<void, string>({
			query: (_id) => ({
				url: CONTACTS_URL + `/delete-contact/${_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Contact'],
		}),
	}),
});

export const {
	useGetContactsQuery,
	useAddContactMutation,
	useGetContactDetailsQuery,
	useUpdateContactMutation,
	useDeleteContactMutation,
} = contactsApiSlice;
