export interface OptionData {
	_id: string
	name: string
	createdAt: string
	updatedAt: string
	slug: string
}

export interface SkillData extends OptionData {
	icon_url: string
}


//! Delete this
export interface SkillDataList {
	currentPage: number
	totalPages: number
	results: SkillData[]
}


export interface JobTitleData extends OptionData {
	description: string
}