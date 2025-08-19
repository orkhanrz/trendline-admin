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
	logoFile: string;
}
