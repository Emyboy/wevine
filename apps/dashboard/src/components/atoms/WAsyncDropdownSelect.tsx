'use client'
import { Box, Flex, Input, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export type AsyncDropdownSelectData = {
	label: string
	value: string
}

type Props = {
	isLoading?: boolean
	isDisabled?: boolean
	data: AsyncDropdownSelectData[]
	onSelect: (data: AsyncDropdownSelectData) => void
	value?: AsyncDropdownSelectData[]
	onChange: (query: string) => void
}

export default function AsyncDropdownSelect({ onChange, data, isLoading, onSelect }: Props) {
	const [queryText, setQueryText] = useState('')
    const [options, setOptions] = useState<AsyncDropdownSelectData[]>([])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null


		if (queryText ) {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}

			timeoutId = setTimeout(() => {
				onChange(queryText)
			}, 500)
		}else {
            onChange('')
        }

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [onChange, queryText])

    useEffect(() => {
        // if(data && data.length > 0){
            setOptions(data)
        // }
    },[data])

	return (
		<Box position={'relative'}>
			<Flex
				border={'1px'}
				borderColor={'gray.200'}
				gap={3}
				alignItems={'center'}
				rounded="md"
				overflow={'hidden'}
			>
				<Input
					border={0}
					outline={'none'}
					className="form-control border-0"
					onChange={(e) => setQueryText(e.target.value)}
				/>
				{isLoading && (
					<Flex px="4">
						<Spinner size="sm" color="theme" />
					</Flex>
				)}
			</Flex>
			{options && options.length ? (
				<Box
					rounded="md"
					minH={'100px'}
					maxH={'180px'}
					overflow={'auto'}
					bg="white"
					border={'1px'}
					borderColor={'gray.200'}
					zIndex={50}
					w="full"
					shadow={'lg'}
					position={'absolute'}
					className="live-preview simplebar-scrollable-y"
				>
					{options.map((option, index) => {
						return (
							<Box
								onClick={() => onSelect(option)}
								key={`options-${index}`}
								p="2"
								m="1"
								rounded={'md'}
								fontWeight={'normal'}
								_hover={{
									bg: 'theme_lighter',
									color: 'theme',
									shadow: 'sm',
								}}
								cursor={'pointer'}
							>
								{option.label}
							</Box>
						)
					})}
				</Box>
			):null}
		</Box>
	)
}
