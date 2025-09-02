import { config } from "@/constants/config";
import { Category, CreateOrEditCategory } from "@/types";

export async function getSingleCategory(id: string): Promise<Category> {
	try {
		const response = await fetch(`${config.apiBaseUrl}/categories/${id}`);

		if (!response.ok) {
			throw new Error("Failed to fetch category!");
		}

		const data: Category = await response.json();

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}

		throw new Error("Unknown error occurred while fetching category!");
	}
}

export async function deleteCategory(id: string) {
	try {
		const response = await fetch(`${config.apiBaseUrl}/categories/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete category");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function createCategory(category: CreateOrEditCategory) {
	try {
		const formBody = {
			name: category.name,
			parentCategoryId: category.parentCategoryId,
		};

		const response = await fetch(`${config.apiBaseUrl}/categories`, {
			method: "POST",
			body: JSON.stringify(formBody),
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to create category!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function editCategory(category: CreateOrEditCategory) {
	try {
		const response = await fetch(`${config.apiBaseUrl}/categories`, {
			method: "PUT",
			body: JSON.stringify(category),
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to create category!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}
