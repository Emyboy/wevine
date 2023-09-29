import { AuthUser } from '@/types/auth.types'
import { IMG_PLACEHOLDER } from '@/utils/CONSTANTS'
import { Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { HiEnvelope, HiPhone } from 'react-icons/hi2'

type Props = {
	data: AuthUser
}

export default function EachUser({ data }: Props) {
	let iconSize = 20
	return (
		<tr>
			<th scope="row">
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						name="chk_child"
						value="option1"
					/>
				</div>
			</th>
			<td className="id" style={{ display: 'none' }}>
				<a href="javascript:void(0);" className="fw-medium link-primary">
					#VZ10
				</a>
			</td>
			<td style={{ minWidth: '221px' }}>
				<div className="d-flex align-items-center">
					<div className="flex-shrink-0">
						<img
							src={data?.avatar_url || IMG_PLACEHOLDER}
							alt={data.first_name}
							className="avatar-xxs rounded-circle image_src object-fit-cover"
						/>
					</div>
					<Text
						textTransform={'capitalize'}
						isTruncated
						className="flex-grow-1 ms-2 name m-0"
					>
						{data.first_name} {data.last_name}
					</Text>
				</div>
			</td>
			<td className="company_name" style={{ minWidth: '211px' }}>
				<Text isTruncated m="0">
					{data.email}
				</Text>
			</td>
			<td className="tags" style={{ minWidth: '151px' }}>
				{data.permissions?.map((permission) => {
					return (
						<span
							className="badge bg-primary-subtle text-primary me-1"
							key={permission}
						>
							{permission}
						</span>
					)
				})}
			</td>
			<td className="leads_score" style={{ minWidth: '151px' }}>
				<Text m='0' isTruncated>{moment(data.createdAt).fromNow()}</Text>
			</td>
			<td className="leads_score" style={{ minWidth: '151px' }}>
				<Text m='0' isTruncated>{moment(data.updatedAt).fromNow()}</Text>
			</td>
			{/* <td className="date">23 Nov, 2021</td> */}
			<td>
				<ul className="list-inline hstack gap-2 mb-0">
					{data?.phone_number && (
						<li
							className="list-inline-item edit"
							data-bs-toggle="tooltip"
							data-bs-trigger="hover"
							data-bs-placement="top"
							title="Call"
						>
							<a
								href={`tell:${data.phone_number}`}
								className="text-muted d-inline-block"
							>
								<HiPhone size={iconSize} />
							</a>
						</li>
					)}
					<li
						className="list-inline-item edit"
						data-bs-toggle="tooltip"
						data-bs-trigger="hover"
						data-bs-placement="top"
						title="Message"
					>
						<a href="javascript:void(0);" className="text-muted d-inline-block">
							<HiEnvelope size={iconSize} />
						</a>
					</li>
				</ul>
			</td>
		</tr>
	)
}
