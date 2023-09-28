'use client'
import React from 'react'
import {
	HiChartBar,
	HiPower,
	HiWallet,
	HiBriefcase,
	HiChatBubbleOvalLeft,
	HiMiniBell,
	HiBuildingStorefront,
	HiUsers,
	HiDocumentText,
	HiBookmark,
	HiMegaphone,
	HiNewspaper,
	HiCircleStack,
	HiStar,
} from 'react-icons/hi2'
import { Avatar, Box, Flex, Show, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AppStore } from '@/types/store.types'
import Link from 'next/link'

type Props = {
	activePage: string
}

export default function SideNav({ activePage }: Props) {
	const { user } = useSelector((state: AppStore) => state.app.auth)
	const router = useRouter()

	return (
		<>
			<Flex
				zIndex={'overlay'}
				flexDirection={'column'}
				id="scrollbar"
				className="h-100 simplebar-scrollable-y"
			>
				<Box mb={'20px'} p="4">
					<Link href="/" className="logo logo-dark">
						<span className="logo-lg-">
							<h1 className="text-white fw-bold">WeVine</h1>
						</span>
					</Link>
				</Box>
				<Flex
					flexDirection={'column'}
					gap={'50px'}
					flex={1}
					overflowY={'scroll'}
					pb="10"
					px="4"
				>
					<EachNavSection title="Pages">
						<EachNav
							onClick={() => router.push('/')}
							title="Overview"
							Icon={HiChartBar}
							active={activePage === 'overview'}
						/>
						<EachNav onClick={() => {}} title="Gigs" Icon={HiBriefcase} />
						<EachNav onClick={() => {}} title="Payments" Icon={HiWallet} />
						<EachNav
							onClick={() => {}}
							title="Discussions"
							Icon={HiChatBubbleOvalLeft}
						/>
						<EachNav
							onClick={() => {}}
							title="Notifications"
							Icon={HiMiniBell}
						/>
					</EachNavSection>
					<EachNavSection title="Clients">
						<EachNav onClick={() => {}} title="Overview" Icon={HiChartBar} />
						<EachNav onClick={() => {}} title="Projects" Icon={HiDocumentText} />
						<EachNav onClick={() => {}} title="Invoices" Icon={HiNewspaper} />
					</EachNavSection>
					<EachNavSection title="Content">
						<EachNav onClick={() => {}} title="Job Titles" Icon={HiBookmark} />
						<EachNav
							onClick={() => router.push('/manager/skills')}
							title="Skills"
							Icon={HiStar}
							active={activePage === 'skills'}
						/>
						<EachNav
							onClick={() => router.push('/manager/users')}
							title="Users"
							Icon={HiUsers}
							active={activePage === 'users'}
						/>
					</EachNavSection>
					<EachNavSection title="Management">
						<EachNav
							onClick={() => {}}
							title="Projects"
							Icon={HiDocumentText}
						/>
						<EachNav
							onClick={() => {}}
							title="Clients"
							Icon={HiBuildingStorefront}
						/>
						<EachNav
							onClick={() => {}}
							title="Project Requests"
							Icon={HiMegaphone}
						/>
						<EachNav onClick={() => {}} title="Invoice" Icon={HiNewspaper} />
						<EachNav
							onClick={() => {}}
							title="Activity Logs"
							Icon={HiCircleStack}
						/>
					</EachNavSection>
					{/* <EachNavSection title="Admins"></EachNavSection> */}
				</Flex>
				<Flex
					h="60px"
					alignItems={'center'}
					gap={3}
					px={'6'}
					justifyContent={'space-between'}
				>
					<Flex gap={3} alignItems={'center'} cursor={'pointer'}>
						<Avatar size="sm" />
						<Flex alignItems={'flex-start'} flexDirection={'column'}>
							<Text m="0" textTransform={'capitalize'}>
								{user?.first_name} {user?.last_name[0]}
							</Text>
							<Text m="0" fontSize={'xs'}>
								First Name
							</Text>
						</Flex>
					</Flex>
					<Box _hover={{ color: 'theme' }} color={'white'} cursor={'pointer'}>
						<HiPower size={20} />
					</Box>
				</Flex>
			</Flex>
			<Show below='md'>
				<Box
					bg="green.900"
					left={0}
					position={'fixed'}
					top={0}
					right={0}
					bottom={0}
					zIndex={-1}
					opacity={0.4}
				/>
			</Show>
		</>
	)
}

const EachNav = ({
	active,
	title,
	Icon,
	onClick,
}: {
	active?: boolean
	title: string
	Icon: any
	onClick: () => void
}) => {
	return (
		<Flex
			onClick={onClick}
			_hover={{
				color: 'theme_darker',
				backgroundColor: 'theme_light',
				fontWeight: 'bold',
				shadow: 'md',
			}}
			alignItems={'center'}
			gap={3}
			background={active ? 'theme_light' : 'none'}
			rounded="md"
			p="2"
			color={active ? 'theme_darker' : 'none'}
			fontWeight={active ? 'bold' : 'normal'}
			cursor={'pointer'}
			shadow={active ? 'md' : 'none'}
		>
			<Icon size={20} />
			<Text fontSize={'md'} m={0}>
				{title}
			</Text>
		</Flex>
	)
}

const EachNavSection = ({
	children,
	title,
}: {
	children: any
	title: string
}) => {
	return (
		<Flex flexDirection={'column'}>
			<Text fontSize={'xs'} fontWeight={'light'} color="theme_light">
				{title}
			</Text>
			<Flex flexDirection={'column'} gap={4}>
				{children}
			</Flex>
		</Flex>
	)
}
