import { config } from "@/constants/config";
import { genders } from "@/constants/options";
import useFetch from "@/hooks/use-fetch";
import { CreateOrEditProduct, ProductVariant } from "@/types";
import { useEffect, useState } from "react";
import Input from "../ui/input/input";
import SelectInput from "../ui/input/select-input";
import ProductVariants from "../product/product-variants";
import { createProduct, editProduct } from "@/services/product";

type ProductFormProps = {
	productId?: string;
	refetch: () => Promise<void>;
	onClose: () => void;
};

export default function ProductForm({
	productId,
	refetch,
	onClose,
}: ProductFormProps) {
	const { data: brands } = useFetch<{ id: string; name: string }[]>(
		`${config.apiBaseUrl}/brands`
	);
	const { data: categories } = useFetch<{ id: string; name: string }[]>(
		`${config.apiBaseUrl}/categories`
	);

	const [formValues, setFormValues] = useState<CreateOrEditProduct>({
		name: "",
		attributeName: "",
		brandId: "",
		categoryId: "",
		description: "",
		gender: "",
		sizeAttributeName: "",
	});

	const [variants, setVariants] = useState<ProductVariant[]>([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`${config.apiBaseUrl}/products/${productId}`
			);

			if (!response.ok) {
				return;
			}

			const data = await response.json();

			console.log(data);

			setFormValues({
				name: data.name,
				attributeName: data.attributeName,
				brandId: data.brandId,
				categoryId: data.categoryId,
				description: data.description,
				gender: data.gender,
				sizeAttributeName: data.sizeAttributeName,
			});
			setVariants(data.variants);
		}

		if (productId) {
			fetchData();
		}
	}, [productId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setFormValues((prev) => ({ ...prev, [name]: value }));
	}

	function handleBrandSelect(id: string) {
		setFormValues((prev) => ({ ...prev, brandId: id }));
	}

	function handleCategorySelect(id: string) {
		setFormValues((prev) => ({ ...prev, categoryId: id }));
	}

	function handleGenderSelect(value: string) {
		setFormValues((prev) => ({ ...prev, gender: value }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			if (productId) {
				await editProduct(productId, formValues);
			} else {
				await createProduct(formValues);
			}

			refetch();
			onClose();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Name"
				placeHolder="Name"
				name="name"
				type="text"
				value={formValues.name}
				onChange={handleChange}
			/>

			<Input
				label="Description"
				placeHolder="Description"
				name="description"
				type="text"
				value={formValues.description}
				onChange={handleChange}
			/>

			<SelectInput
				label="Gender"
				placeHolder="Gender"
				name="gender"
				value={formValues.gender}
				options={genders}
				onSelect={handleGenderSelect}
			/>

			<SelectInput
				label="Brand Name"
				placeHolder="Brand Name"
				name="brandId"
				options={brands || []}
				onSelect={handleBrandSelect}
				value={formValues.brandId}
			/>

			<SelectInput
				label="Category Name"
				placeHolder="Category Name"
				name="categoryId"
				options={categories || []}
				onSelect={handleCategorySelect}
				value={formValues.categoryId}
			/>

			<Input
				label="Attribute Name"
				placeHolder="Attribute Name"
				name="attributeName"
				type="text"
				value={formValues.attributeName}
				onChange={handleChange}
			/>

			<Input
				label="Size Attribute Name"
				placeHolder="Size Attribute Name"
				name="sizeAttributeName"
				type="text"
				value={formValues.sizeAttributeName}
				onChange={handleChange}
			/>

			{productId && (
				<ProductVariants productId={productId} variants={variants} />
			)}

			<div className="flex justify-center gap-3 my-10">
				<button
					type="button"
					onClick={onClose}
					className="bg-gray-400 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="bg-blue-600 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
				>
					{productId ? "Edit" : "Add"}
				</button>
			</div>
		</form>
	);
}
