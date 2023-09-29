import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'

type Props = {
    label: string
    onRemove?: () => void
}

export default function WBadge({label, onRemove}: Props) {
  return (
		<Flex
			rounded="lg"
			bg="theme_lighter"
			alignItems={'center'}
			color="theme"
			overflow={'hidden'}
		>
			<Box p="2px" flex={1} fontSize={'sm'}>
				{label}
			</Box>
			{onRemove && (
				<Flex
					onClick={onRemove}
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
			)}
		</Flex>
	)
}