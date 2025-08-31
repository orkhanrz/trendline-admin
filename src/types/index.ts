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

export interface Product {
	id: string;
	name: string;
	gender: string;
	brandId: string;
	brandName: string;
	categoryId: string;
	categoryName: string;
	description: string;
	attributeName: string;
	sizeAttributeName: string;
	isInStock: boolean;
	isDeleted: boolean;
}

export interface CreateOrEditProduct {
	id?: string;
	name: string;
	brandId: string;
	categoryId: string;
	gender: string;
	isInStock?: boolean;
	isDeleted?: boolean;
	description: string;
	attributeName: string;
	sizeAttributeName: string;
}
