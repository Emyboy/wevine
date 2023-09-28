'use client'
import { CRUDTablePageProps } from '@/components/atoms/CRUDTable'
import { JobTitleData } from '@/types/option.types'
import { Tooltip } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { HiOutlinePlus, HiPencil } from 'react-icons/hi2'
import AddJobTitlePopup from './AddJobTitlePopup'
import dynamic from 'next/dynamic'
const CRUDTable = dynamic(() => import('@/components/atoms/CRUDTable'))

interface Props extends CRUDTablePageProps<JobTitleData> {}

export default function JobTitlePage({ dataList }: Props) {
	console.log('DATA LIST --', dataList)

	const [showAdd, setShowAdd] = useState(false)
	const [selectedTitle, setSelectedTitle] = useState<JobTitleData | null>(null)

	return (
		<div>
			{showAdd && (
				<AddJobTitlePopup
					isOpen={showAdd}
					onClose={() => setShowAdd(false)}
					jobTitleData={selectedTitle}
				/>
			)}
			<CRUDTable
				actionButtons={
					<>
						<Tooltip hasArrow label="Add Job Title" placement="top">
							<button
								type="button"
								className="btn btn-success bg-theme add-btn d-flex align-items-center"
								id="create-btn"
								onClick={() => setShowAdd(true)}
							>
								<HiOutlinePlus className="align-bottom me-1" /> Add Title
							</button>
						</Tooltip>
					</>
				}
				crudActions={(rowData?: any) => {
					return (
						<>
							<Tooltip label="Edit Title" placement="top" hasArrow>
								<button
									className="text-muted"
									onClick={() => {
										setSelectedTitle(rowData)
										setShowAdd(true)
									}}
								>
									<HiPencil size={17} />
								</button>
							</Tooltip>
						</>
					)
				}}
				columns={[
					{ title: 'Name' },
					{ title: 'Slug' },
					{ title: 'Created' },
					{ title: 'Updated' },
				]}
				rows={dataList.results.map((title) => ({
					data: title,
					id: title._id,
					items: [
						{
							type: 'text',
							value: title.name,
							style: { minWidth: '150px' },
							label: 'Name',
						},
						{
							type: 'text',
							value: title.slug,
							style: { minWidth: '150px' },
							label: 'Slug',
						},
						{
							type: 'text',
							value: moment(title.createdAt).fromNow(),
							style: { minWidth: '150px' },
							label: 'Create At',
						},
						{
							type: 'text',
							value: moment(title.updatedAt).fromNow(),
							style: { minWidth: '150px' },
							label: 'Updated At',
						},
					],
				}))}
			/>
		</div>
	)
}
