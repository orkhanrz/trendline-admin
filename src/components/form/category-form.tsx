import { config } from "@/constants/config";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import Input from "../ui/input/input";
import SelectInput from "../ui/input/select-input";
import { Category, CreateOrEditCategory } from "@/types";

type CategoryFormProps = {
	categoryId?: string;
	refetch: () => Promise<void>;
	onClose: () => void;
};

export default function CategoryForm({
	categoryId,
	refetch,
	onClose,
}: CategoryFormProps) {
	const { data } = useFetch<Category[]>(
		config.apiBaseUrl + "/categories/parents"
	);
	const [category, setCategory] = useState<CreateOrEditCategory>({
		id: "",
		name: "",
		parentCategoryId: null,
	});

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`${config.apiBaseUrl}/categories/${categoryId}`
			);

			if (!response.ok) {
				return;
			}

			const data = await response.json();
			setCategory(data);
		}

		if (categoryId) {
			fetchData();
		}
	}, [categoryId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setCategory((prev) => ({ ...prev, [name]: value }));
	}

	function handleParentCategoryChange(id: string) {
		setCategory((prev) => ({ ...prev, parentCategoryId: id }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formBody = categoryId
			? category
			: {
					id: categoryId,
					name: category.name,
					parentCategoryId: category.parentCategoryId,
			  };

		const response = await fetch(`${config.apiBaseUrl}/categories`, {
			method: categoryId ? "PUT" : "POST",
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
				value={category.name}
				onChange={handleChange}
			/>

			<SelectInput
				label="Parent Category Id"
				name="parentCategoryId"
				value={category.parentCategoryId}
				options={
					data?.filter((option) => option.id != categoryId) || []
				}
				onSelect={handleParentCategoryChange}
				placeHolder="Select Parent Category"
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
					{categoryId ? "Edit" : "Add"}
				</button>
			</div>
		</form>
	);
}
