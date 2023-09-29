'use client'
import CRUDTable, { CRUDTablePageProps } from '@/components/atoms/CRUDTable'
import React, { useEffect, useState } from 'react'
import {
	HiEnvelope,
	HiFunnel,
	HiMiniEye,
	HiOutlinePlus,
	HiPencil,
	HiTrash,
} from 'react-icons/hi2'
import { Tooltip } from '@chakra-ui/react'
import EachUser from './EachUser'
import { AuthUser } from '@/types/auth.types'

interface Props extends CRUDTablePageProps<AuthUser> {}

export default function UsersPage({ dataList }: Props) {
	const [users, setUsers] = useState<AuthUser[]>([])

	useEffect(() => {
		setUsers(dataList.results)
	}, [])

	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="card">
					<div className="card-header border-0">
						<div className="row g-4 align-items-center">
							<div className="col-sm-3">
								<div className="search-box">
									<input
										type="text"
										className="form-control search"
										placeholder="Search for..."
									/>
									<i className="ri-search-line search-icon"></i>
								</div>
							</div>
							<div className="col-sm-auto ms-auto">
								<div className="hstack gap-2">
									<button className="btn btn-soft-danger" id="remove-actions">
										<i className="ri-delete-bin-2-line"></i>
									</button>
									<button
										type="button"
										className="btn btn-info"
										data-bs-toggle="offcanvas"
									>
										<i className="ri-filter-3-line align-bottom me-1"></i>{' '}
										Fliters
									</button>
									<button
										type="button"
										className="btn btn-success add-btn"
										data-bs-toggle="modal"
										id="create-btn"
										data-bs-target="#showModal"
									>
										<i className="ri-add-line align-bottom me-1"></i> Add Leads
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="table-responsive table-card">
							<table className="table align-middle">
								<thead className="table-light">
									<tr>
										<th scope="col" style={{ width: '50px' }}>
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													id="checkAll"
													value="option"
												/>
											</div>
										</th>

										<th className="sort" data-sort="name">
											Name
										</th>
										<th className="sort" data-sort="company_name">
											Email
										</th>
										<th className="sort" data-sort="leads_score">
											Permissions
										</th>
										<th className="sort" data-sort="phone">
											Created
										</th>
										<th className="sort" data-sort="location">
											Updated
										</th>
										<th className="sort" data-sort="tags">
											Actions
										</th>
										{/* <th className="sort" data-sort="date">
											Create Date
										</th>
										<th className="sort" data-sort="action">
											Action
										</th> */}
									</tr>
								</thead>
								<tbody className="list form-check-all">
									{users.map((user) => {
										return (
											<EachUser key={`user-data-${user._id}`} data={user} />
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
