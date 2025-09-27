import { config } from "@/constants/config";
import { CreateOrEditProduct, CreateOrEditProductVariant } from "@/types";

export async function deleteProduct(id: string) {
	try {
		const response = await fetch(`${config.apiBaseUrl}/products/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Failed to delete product");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function createProduct(product: CreateOrEditProduct) {
	const formData = new FormData();

	Object.entries(product).forEach((entry) =>
		formData.set(entry[0], entry[1])
	);

	try {
		const response = await fetch(`${config.apiBaseUrl}/products`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to create a product!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function editProduct(id: string, product: CreateOrEditProduct) {
	try {
		const response = await fetch(`${config.apiBaseUrl}/products/${id}`, {
			method: "PUT",
			body: JSON.stringify(product),
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to edit a product!");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function deleteProductVariant(
	productId: string,
	variantId: string
) {
	try {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${productId}/variants/${variantId}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete product variant");
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function editProductVariant(
	productId: string,
	productVariantId: string,
	variant: CreateOrEditProductVariant
) {
	const { color, isInStock, isDeleted } = variant;

	const formBody = {
		color,
		isInStock,
		isDeleted,
	};

	try {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${productId}/variants/${productVariantId}`,
			{
				method: "PUT",
				body: JSON.stringify(formBody),
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create a variant!");
		}

		console.log(response);
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function createProductVariant(
	productId: string,
	formData: FormData
) {
	try {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${productId}/variants`,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create a variant!");
		}

		console.log(response);
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function addProductVariantImage(
	productId: string,
	productVariantId: string,
	imageFile: File,
	altText: string
) {
	const formData = new FormData();
	formData.append("imageFile", imageFile);
	formData.append("altText", altText);

	try {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${productId}/variants/${productVariantId}/images`,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create a variant image!");
		}

		console.log(response);
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}

export async function deleteProductVariantImage(
	productId: string,
	productVariantId: string,
	productVariantImageId: string
) {
	try {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${productId}/variants/${productVariantId}/images/${productVariantImageId}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete the variant image!");
		}

		console.log(response);
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}
