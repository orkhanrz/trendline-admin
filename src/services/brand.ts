import { config } from "@/constants/config";
import { CreateOrEditBrand } from "@/types";
import { apiFetch } from "@/utils";

export async function deleteBrand(id: string) {
	try {
		const response = await apiFetch(`${config.apiBaseUrl}/brands/${id}`, {
			method: "DELETE",
		});

		console.log(response);

		if (!response.ok) {
			throw new Error("Failed to delete brand");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function createBrand(brand: CreateOrEditBrand) {
	const formData = new FormData();
	formData.append("name", brand.name);
	formData.append("description", brand.description);
	formData.append("altText", brand.altText);
	brand.id && formData.append("id", brand.id);
	brand.logoFile &&
		formData.append("logoFile", brand.logoFile, brand.logoFile.name);

	try {
		const response = await apiFetch(`${config.apiBaseUrl}/brands`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to create a new brand!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function editBrand(brand: CreateOrEditBrand) {
	const formData = new FormData();
	formData.append("name", brand.name);
	formData.append("description", brand.description);
	formData.append("altText", brand.altText);
	brand.id && formData.append("id", brand.id);
	brand.logoFile &&
		formData.append("logoFile", brand.logoFile, brand.logoFile.name);

	try {
		const response = await apiFetch(`${config.apiBaseUrl}/brands`, {
			method: "PUT",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to edit brand!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}
