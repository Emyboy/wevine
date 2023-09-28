import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AsyncDropdownSelect, {
	AsyncDropdownSelectData,
} from './WAsyncDropdownSelect'
import { SkillData } from '@/types/option.types'
import { APICall } from '@/utils/api.utils'
import { HiOutlineXMark } from 'react-icons/hi2'

type Props = {}

export default function SkillDropdownSelect({}: Props) {
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()
	const [options, setOptions] = useState<AsyncDropdownSelectData[]>([])
	const [selectedTitle, setSelectedTitle] = useState<AsyncDropdownSelectData[]>(
		[],
	)
	const [data, setData] = useState<SkillData[]>([])

	let getData = async () => {
		try {
			setIsLoading(true)
			let res = await APICall({
				route: `/skill/all/?limit=10&q=${searchQuery}`,
				isAuth: true,
			})
			setData(res.data.results)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			toast({ title: 'Error, please try again', status: 'error' })
		}
	}

	useEffect(() => {
		if (searchQuery) {
			getData()
		} else if (!searchQuery) {
			console.log('NO DATA')
			setData([])
		}
	}, [searchQuery])

	useEffect(() => {
		if (data) {
			const transformedOptions = data.map((item: SkillData) => ({
				label: item.name,
				value: item._id,
			}))
			setOptions(transformedOptions)
		}
	}, [data])

	return (
		<Box position={'relative'}>
			<Flex gap={3} flexWrap={'wrap'} mb={selectedTitle.length > 0 ? '3' : '0'}>
				{selectedTitle.map((item) => {
					return (
						<Flex
							rounded="lg"
							bg="theme_lighter"
							alignItems={'center'}
							fontSize={'sm'}
							color="theme"
							overflow={'hidden'}
						>
							<Box p="2px" flex={1}>
								{item.label}
							</Box>
							<Flex
								alignItems={'center'}
								justifyContent={'center'}
								w="5"
								h="full"
								cursor={'pointer'}
								_hover={{
									bg: 'theme',
									color: 'theme_lighter',
								}}
							>
								<HiOutlineXMark />
							</Flex>
						</Flex>
					)
				})}
			</Flex>
			<AsyncDropdownSelect
				onChange={setSearchQuery}
				data={options}
				isLoading={isLoading}
				value={selectedTitle}
				onSelect={(e) => setSelectedTitle([...selectedTitle, e])}
			/>
		</Box>
	)
}
