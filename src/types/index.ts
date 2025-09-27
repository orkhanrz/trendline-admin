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
	logoFile: File | null;
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

export interface ProductTableItem {
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

export interface ProductItem extends ProductTableItem {
	variants: ProductVariant[];
}

export interface ProductVariant {
	id: string;
	productId: string;
	color: string;
	isInStock: boolean;
	isDeleted: boolean;
	sizes: ProductVariantSize[];
	images: ProductVariantImage[];
}

export interface ProductVariantImage {
	id: string;
	productVariantId: string;
	urn: string;
	altText: string;
}

export interface AddProductVariantImageDto {
	imageFile: File;
	altText?: string;
}

export interface CreateOrEditProductVariant {
	mainImageFile: File | null;
	color: string;
	mainImageAltText: string;
	isInStock: boolean;
	isDeleted: boolean;
}

export interface ProductVariantSize {
	id: string;
	productVariantId: string;
	size: string;
	priceAmount: number;
	oldPriceAmount: number;
	isInStock: boolean;
}

export interface CreateOrEditProduct {
	id?: string;
	name: string;
	brandId: string;
	categoryId: string;
	gender: string;
	description: string;
	attributeName: string;
	sizeAttributeName: string;
}

export enum Gender {
	Male = "Male",
	Female = "Female",
}
