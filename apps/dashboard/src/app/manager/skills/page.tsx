import { SkillDataList } from '@/types/option.types'
import React from 'react'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { BACKEND_URL } from '@/utils/CONSTANTS'
import { CRUDPageProps } from '@/types/page.types'
import DefaultLayout from '@/components/layouts/DefaultLayout'


const SkillsPage = dynamic(() => import('@/components/pages/skills/SkillsPage'))

export default async function _page(props: CRUDPageProps) {
	const { searchParams } = props

	let { sortBy, limit, sortOrder, q, page } = searchParams

	let sort = sortBy ? `sortBy=${sortBy}` : ''
	let order = sortOrder ? `&sortOrder=${sortOrder}` : ''
	let limited = limit ? `&limit=${limit}` : ''
	let pageCount = page ? `&page=${page}` : ''
	let query = q ? `?q=${q}` : `?${sort}${order}${limited}${pageCount}`

	const cookieStore = cookies()
	const we_auth = cookieStore.get('we_auth')

	let res = await fetch(BACKEND_URL + `/skill/all/${query}`, {
		headers: {
			Authorization: `Bearer ${we_auth}`,
		},
	})
	let data = await res.json()

	let skills: SkillDataList = data

	return (
		<DefaultLayout title="Skills" name="skills">
			<SkillsPage
				dataList={skills}
				count={limit}
				currentPage={skills.currentPage}
				totalPages={skills.totalPages}
			/>
		</DefaultLayout>
	)
}
