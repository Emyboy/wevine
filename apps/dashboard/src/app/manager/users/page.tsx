import DefaultLayout from '@/components/layouts/DefaultLayout'
import UsersPage from '@/components/pages/users/UsersPage'
import { AuthUser } from '@/types/auth.types'
import { CRUDPageProps, QueryPaginationResponse } from '@/types/page.types'
import { BACKEND_URL } from '@/utils/CONSTANTS'
import { cookies } from 'next/headers'
import React from 'react'

export default async function page(props: CRUDPageProps) {
	const { searchParams } = props

	let { sortBy, limit, sortOrder, q, page } = searchParams

	let sort = sortBy ? `sortBy=${sortBy}` : ''
	let order = sortOrder ? `&sortOrder=${sortOrder}` : ''
	let limited = limit ? `&limit=${limit}` : ''
	let pageCount = page ? `&page=${page}` : ''
	let query = q ? `?q=${q}` : `?${sort}${order}${limited}${pageCount}`

	const cookieStore = cookies()
	const we_auth = cookieStore.get('we_auth')

	console.log('TOKEN --', we_auth)

	let res = await fetch(BACKEND_URL + `/user/all/${query}`, {
		headers: {
			Authorization: `Bearer ${we_auth?.value}`,
		},
	})
	let data = await res.json()

	let dataList: QueryPaginationResponse<AuthUser> = data


	return (
		<DefaultLayout title="Users" name="users">
			<UsersPage dataList={dataList} />
		</DefaultLayout>
	)
}
