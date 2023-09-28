'use client'
import CRUDTable from '@/components/atoms/CRUDTable'
import { SkillData, SkillDataList } from '@/types/option.types'
import React, { useEffect, useState } from 'react'
import { HiPencil } from 'react-icons/hi2'
import moment from 'moment'
import AddSkillPopup from './AddSkillPopup'
import { Tooltip } from '@chakra-ui/react'
import SkillActionButtons from './SkillActionButtons'
import { useRouter } from 'next/navigation'

type Props = {
	skillListData: SkillDataList
	count?: string
	currentPage?: number
	totalPages?: number
}

export default function SkillsPage(props: Props) {
	const {
		skillListData,
		count,
		currentPage: page,
		totalPages: pageTotal,
	} = props
	const skills = skillListData.results
	const [_skills, setSkills] = useState<SkillData[]>([])
	const [showAdd, setShowAdd] = useState(false)
	const [selectedSkill, setSelectedSkill] = useState(null)
	const router = useRouter()
	const [limit, setLimit] = useState<string | null>(count ? count : null)
	const [searchQuery, setSearchQuery] = useState('')

	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const [queryURL, setQueryURL] = useState<string | null>(null)

	useEffect(() => {
		const queryParams = []

		if (searchQuery) {
			queryParams.push(`q=${encodeURIComponent(searchQuery)}`)
		}

		if (currentPage && currentPage > 1) {
			queryParams.push(`page=${currentPage}`)
		}

		if (limit) {
			queryParams.push(`limit=${limit}`)
		}

		const queryStr = queryParams.join('&')

		const fullQueryURL = queryURL
			? `/manager/skills/${queryURL}&${queryStr}`
			: `/manager/skills/?${queryStr}`

		// console.log('THE QUERY URL --', fullQueryURL, page)

		router.push(fullQueryURL)
	}, [queryURL, limit, searchQuery, currentPage])

	useEffect(() => {
		setSkills(skills || [])
	}, [skills])

	useEffect(() => {
		if (page && pageTotal) {
			setTotalPages(pageTotal)
			setCurrentPage(page)
		}
	}, [pageTotal, page])

	// console.log('SKILL PAGE --', { page, pageTotal })

	return (
		<div>
			{showAdd && (
				<AddSkillPopup
					isOpen={showAdd}
					onClose={(newSkill, isUpdate) => {
						setSelectedSkill(null)
						setShowAdd(false)
						if (newSkill && !isUpdate) {
							setSkills([newSkill, ..._skills])
						} else if (newSkill && isUpdate) {
							let items = _skills
							let index = items.findIndex((x) => x._id === newSkill._id)
							items[index] = newSkill
							setSkills(items)
						}
					}}
					skillData={selectedSkill}
				/>
			)}
			<CRUDTable
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(p) => setCurrentPage(p)}
				onSearch={(q) => setSearchQuery(q)}
				defaultCount={limit || 10}
				onLimitSelect={(limit) => setLimit(limit)}
				columns={[
					{ title: 'Name' },
					{ title: 'Slug' },
					{ title: 'Created' },
					{ title: 'Updated' },
				]}
				// selectable
				crudActions={(rowData?: any) => {
					return (
						<>
							<Tooltip label="Edit Skill" placement="top" hasArrow>
								<button
									className="text-muted"
									onClick={() => {
										setSelectedSkill(rowData)
										setShowAdd(true)
									}}
								>
									<HiPencil size={17} />
								</button>
							</Tooltip>
						</>
					)
				}}
				rows={_skills.map((skill) => ({
					id: skill._id,
					image_url: skill.icon_url,
					data: skill,
					items: [
						{
							type: 'text',
							value: skill.name,
							style: { minWidth: '150px' },
							label: 'name',
						},
						{
							type: 'text',
							value: skill.slug,
							label: 'slug',
							style: { minWidth: '150px' },
						},
						{
							type: 'text',
							value: moment(skill.createdAt).fromNow(),
							style: { minWidth: '150px' },
							label: 'createdAt',
						},
						{
							type: 'text',
							value: moment(skill.updatedAt).fromNow(),
							style: { minWidth: '150px' },
							label: 'updatedAt',
						},
					],
				}))}
				actionButtons={
					<>
						<SkillActionButtons
							setShowAdd={setShowAdd}
							onQueryFilter={(query) => setQueryURL(query)}
						/>
					</>
				}
			></CRUDTable>
		</div>
	)
}

export const dynamic = 'force-dynamic'
