import { config } from "@/constants/config";
import useFetch from "@/hooks/use-fetch";
import { Brand, Category, CreateOrEditProduct, Product } from "@/types";
import { useEffect, useState } from "react";
import Input from "../ui/input/input";
import SelectInput from "../ui/input/select-input";

type ProductFormProps = {
	productId?: string;
	refetch: () => Promise<void>;
	onClose: () => void;
};

const booleanOptions = [
	{ id: false, name: "No" },
	{ id: true, name: "Yes" },
];

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

	const [product, setProduct] = useState<CreateOrEditProduct>({
		id: "",
		name: "",
		attributeName: "",
		brandId: "",
		categoryId: "",
		description: "",
		gender: "",
		sizeAttributeName: "",
		isInStock: false,
		isDeleted: false,
	});

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`${config.apiBaseUrl}/products/${productId}`
			);

			if (!response.ok) {
				return;
			}

			const data = await response.json();
			setProduct(data);
		}

		if (productId) {
			fetchData();
		}
	}, [productId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setProduct((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formBody = productId
			? product
			: {
					id: productId,
					name: product.name,
			  };

		const response = await fetch(`${config.apiBaseUrl}/products`, {
			method: productId ? "PUT" : "POST",
			body: JSON.stringify(formBody),
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			return;
		}

		refetch();
		onClose();
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Name"
				placeHolder="Name"
				name="name"
				type="text"
				value={product.name}
				onChange={handleChange}
			/>

			<Input
				label="Gender"
				placeHolder="Gender"
				name="gender"
				type="text"
				value={product.gender}
				onChange={handleChange}
			/>

			<SelectInput
				label="Brand Name"
				placeHolder="Brand Name"
				name="brandId"
				options={brands || []}
				onSelect={() => {}}
				value={product.brandId}
			/>

			<SelectInput
				label="Category Name"
				placeHolder="Category Name"
				name="categoryId"
				options={categories || []}
				onSelect={() => {}}
				value={product.categoryId}
			/>

			<SelectInput
				label="Is in stock"
				placeHolder="Is in stock"
				name="isInStock"
				options={[]}
				value={product.isInStock ? "Yes" : "No"}
				onSelect={() => {}}
			/>

			<SelectInput
				label="Is deleted"
				placeHolder="Is deleted"
				name="isDeleted"
				options={[]}
				value={product.isDeleted ? "Yes" : "No"}
				onSelect={() => {}}
			/>

			<Input
				label="Size Attribute Name"
				placeHolder="Size Attribute Name"
				name="sizeAttributeName"
				type="text"
				value={product.sizeAttributeName}
				onChange={handleChange}
			/>

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
