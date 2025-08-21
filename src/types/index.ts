export interface Brand {
	id: string;
	name: string;
	description: string;
	logoUrl: string;
}

export interface CreateOrEditBrand {
	id?: string;
	name: string;
	description: string;
	altText: string;
	logoFile: null | File;
}

export interface Category {
	id: string;
	name: string;
	parentCategoryId: string | null;
}

export interface CreateOrEditCategory {
	id?: string;
	name: string;
	parentCategoryId?: string | null;
}
