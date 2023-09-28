// import DefaultLayout from '@/components/layouts/DefaultLayout'
// import SkillsPage from '@/components/pages/skills/SkillsPage'
import { SkillDataList } from '@/types/option.types'
import React from 'react'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { BACKEND_URL } from '@/utils/CONSTANTS'

const DefaultLayout = dynamic(
	() => import('@/components/layouts/DefaultLayout'),
)
const SkillsPage = dynamic(() => import('@/components/pages/skills/SkillsPage'))

export default async function _page(props: {
	searchParams: {
		sortOrder: string
		limit: string
		sortBy: string
		q: string | null
		page: string | null
	}
}) {
	const { searchParams } = props

	let { sortBy, limit, sortOrder, q, page } = searchParams

	let sort = sortBy ? `sortBy=${sortBy}` : ''
	let order = sortOrder ? `sortBy=${sortOrder}` : ''
	let search = q ? `&q=${q}` : ''
	let limited = limit ? `limit=${limit}` : ''
	let pageCount = page ? `&page=${page}` : ''
	let query = q ? `?q=${q}`: `?${sort}&${order}&${limited}&${pageCount}`

	const cookieStore = cookies()
	const we_auth = cookieStore.get('we_auth')

	let res = await fetch(BACKEND_URL + `/skill/all${query ? query : ''}`, {
		headers: {
			Authorization: `Bearer ${we_auth}`,
		},
	})
	let data = await res.json()

	let skills: SkillDataList = data

	return (
		<DefaultLayout title="Skills" name="skills">
			<SkillsPage
				skillListData={skills}
				count={limit}
				currentPage={skills.currentPage}
				totalPages={skills.totalPages}
			/>
		</DefaultLayout>
	)
}
