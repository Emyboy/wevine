export interface AuthUser {
	first_name: string
	last_name: string
	email: string
	permissions: UserPermissions[]
	account_status: UserAccountStatus
	bio: string | null
	username: string
	_id: string
	avatar_url?: string
	createdAt: string
	updatedAt: string
	phone_number: string
}

export interface AuthUserInfo {
	country: string
	createdAt: string
	identity_verified: boolean
	linkedin: string | null
	phone: string
	twitter: string
	updatedAt: string
	_id: string
}

export type UserPermissions =
	| 'admin'
	| 'content'
	| 'freelancer'
	| 'manager'
	| 'senior-manager'

export type UserAccountStatus =
	| 'pending'
	| 'onboarding'
	| 'active'
	| 'suspended'
