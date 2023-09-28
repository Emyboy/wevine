import {
	Button,
	Flex,
	HStack,
	Select,
	Spinner,
	Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import {
	HiChevronLeft,
	HiChevronRight,
	HiMagnifyingGlass,
} from 'react-icons/hi2'
import { DebounceInput } from 'react-debounce-input'

export interface CRUDTablePageProps<T> {
	dataList: {
		results: T[]
		currentPage?: number
		totalPages?: number
	}
	count?: string
	currentPage?: number
	totalPages?: number
	page?: number
}

type TableItem = {
	type: 'text' | 'badge'
	value: string
	style?: React.CSSProperties
	label: string
}

type TableRowData = {
	id: string
	image_url?: string
	actions?: any
	items: TableItem[]
	data: any
}

type TableColumnData = {
	title: string
}

type Props = {
	actionButtons?: any
	crudActions?: any
	children?: any
	rows: TableRowData[]
	columns: TableColumnData[]
	selectable?: boolean
	isLoading?: boolean
	onLimitSelect?: (limit: string) => void
	defaultCount?: number | string
	onSearch?: (searchQuery: string) => void
	currentPage?: number
	totalPages?: number
	onPageChange?: (page: number) => void
}

export default function CRUDTable({
	actionButtons,
	children,
	columns,
	rows,
	selectable,
	crudActions,
	isLoading,
	onLimitSelect,
	defaultCount,
	onSearch,
	currentPage,
	totalPages,
	onPageChange,
}: Props) {
	// console.log('CRUD TABLE', { currentPage, totalPages })
	return (
		<div className="row">
			<div className="col-lg-12">
				<div className="card" id="leadsList">
					<div className="card-header border-0">
						<div className="row g-4 align-items-center">
							<div className="col-sm-3">
								{onSearch && (
									<div className="search-box">
										<DebounceInput
											minLength={3}
											debounceTimeout={500}
											type="search"
											className="form-control search"
											placeholder="Search for..."
											onChange={(e) => onSearch(e.target.value.trim())}
										/>
										<HiMagnifyingGlass className="search-icon" />
									</div>
								)}
							</div>
							<div className="col-sm-auto ms-auto">
								<div className="hstack gap-2">{actionButtons}</div>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<div className="table-responsive table-card">
							{isLoading ? (
								<Flex
									h="540px"
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									color="theme"
								>
									<Spinner />
								</Flex>
							) : (
								<table className="table align-middle" id="customerTable">
									<thead className="table-light">
										<tr>
											{selectable && (
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
											)}

											{columns.map((column, index) => {
												return (
													<th
														data-sort="name"
														key={`crud-table-colum-${index}`}
													>
														{column.title}
													</th>
												)
											})}
											{crudActions && <th data-sort="name">Actions</th>}
										</tr>
									</thead>
									<tbody className="list form-check-all">
										<tr />
										{rows.map((row, index) => {
											return (
												<tr key={`crud-table-row-${index}`}>
													{selectable && (
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
													)}

													{row.items.map((item, i) => {
														let { value, type } = item
														return (
															<td
																key={`table-row-item-${i}`}
																style={item.style || {}}
															>
																<div className="d-flex align-items-center">
																	{row.image_url && i === 0 ? (
																		<div className="flex-shrink-0">
																			<img
																				src={row.image_url}
																				alt={'preview'}
																				width={100}
																				className="avatar-xxs rounded-circle image_src object-fit-cover"
																			/>
																		</div>
																	) : null}
																	{type === 'text' && (
																		<span className="flex-grow-1 ms-2 name">
																			{value}
																		</span>
																	)}
																	{type === 'badge' && (
																		<span className="badge bg-primary-subtle text-primary me-1">
																			{value}
																		</span>
																	)}
																</div>
															</td>
														)
													})}
													{crudActions && <td>{crudActions(row.data)}</td>}
												</tr>
											)
										})}
									</tbody>
								</table>
							)}
							{children}
						</div>
						{!isLoading && (
							<HStack
								flexDirection={['column', 'row']}
								justifyContent={'space-between'}
								alignItems={'center'}
								gap={6}
							>
								<Select
									w="100px"
									size={'sm'}
									alignSelf={'flex-end'}
									onChange={(e) =>
										onLimitSelect ? onLimitSelect(e.target.value) : () => {}
									}
									value={defaultCount || 10}
								>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</Select>
								<div className="d-flex justify-content-end mt-5">
									{currentPage && totalPages && (
										<div className="pagination-wrap hstack gap-2 d-flex">
											<Tooltip hasArrow label="Previous Page" placement="top">
												<Button
													size="sm"
													colorScheme="green"
													color="theme"
													className="page-item pagination-prev d-flex align-items-center gap-2"
													variant={'ghost'}
													isDisabled={currentPage === 1}
													onClick={() =>
														onPageChange
															? onPageChange(currentPage - 1)
															: () => {}
													}
												>
													<HiChevronLeft /> Previous
												</Button>
											</Tooltip>
											{/* <ul className="pagination listjs-pagination mb-0">
											<li className="active">
												<a className="page" href="#" data-i="1" data-page="8">
													1
												</a>
											</li>
											<li>
												<a className="page" href="#" data-i="2" data-page="8">
													2
												</a>
											</li>
										</ul> */}
											<Tooltip hasArrow label="Next Page" placement="top">
												<Button
													size="sm"
													colorScheme="green"
													color="theme"
													className="page-item pagination-prev d-flex align-items-center gap-2"
													variant={'ghost'}
													isDisabled={
														totalPages === 1 || totalPages === currentPage
													}
													onClick={() =>
														onPageChange
															? onPageChange(currentPage + 1)
															: () => {}
													}
												>
													Next <HiChevronRight />
												</Button>
											</Tooltip>
										</div>
									)}
								</div>
							</HStack>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
