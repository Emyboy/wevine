import { BACKEND_URL } from '@/utils/CONSTANTS'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const jobTitleApi = createApi({
	reducerPath: 'jobTitleAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_URL + `/job-title`,
		prepareHeaders: (headers) => {
			const token = Cookies.get('we_auth')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['JobTitle'],
	endpoints: (builder) => ({
		getAllJobTitle: builder.query<any, void>({
			query: () => ({
				url: `/all`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			providesTags: ['JobTitle'],
		}),
		createJobTitle: builder.mutation<any, any>({
			query: (body) => ({
				url: `/create`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: body,
			}),
			invalidatesTags: ['JobTitle'],
		}),
		updateJobTitle: builder.mutation<any, { id: string | undefined; data: any }>({
			query: ({ data, id }) => ({
				url: `/update/${id}`,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			}),
			invalidatesTags: ['JobTitle'],
		}),
	}),
})

export const {
	useCreateJobTitleMutation,
	useUpdateJobTitleMutation,
	useGetAllJobTitleQuery
} = jobTitleApi
