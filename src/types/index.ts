interface Brand {
	id: string;
	name: string;
	description: string;
	logoUrl: string;
}

interface CreateOrEditBrand {
	id?: string;
	name: string;
	description: string;
	altText: string;
	logoFile: null | File;
}

interface Category {
	id: string;
	name: string;
	parentCategoryId: string | null;
}

interface CreateOrEditCategory {
	id?: string;
	name: string;
	parentCategoryId?: string;
}
