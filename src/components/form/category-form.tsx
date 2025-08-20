import { config } from "@/constants/config";
import { useEffect, useState } from "react";
import FileInput from "../ui/input/file-input";
import Input from "../ui/input/input";

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
	const [category, setCategory] = useState<CreateOrEditCategory>({
		id: "",
		name: "",
		parentCategoryId: "",
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
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setCategory((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formBody = categoryId
			? category
			: { id: categoryId, name: category.name };

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
