import { config } from "@/constants/config";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import FileInput from "../ui/file-input";
import Input from "../ui/input";

type BrandFormProps = {
	brandId?: string;
	refetch: () => Promise<void>;
	onClose: () => void;
};

export default function BrandForm({
	brandId,
	refetch,
	onClose,
}: BrandFormProps) {
	const [brand, setBrand] = useState<CreateOrEditBrand>({
		id: "",
		name: "",
		description: "",
		altText: "",
		logoFile: "",
	});

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`${config.apiBaseUrl}/brands/${brandId}`
			);

			if (!response.ok) {
				return;
			}

			const data = await response.json();
			setBrand(data);
		}

		if (brandId) {
			fetchData();
		}
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setBrand((prev) => ({ ...prev, [name]: value }));
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file) {
			const image = URL.createObjectURL(file);
			setBrand((prev) => ({ ...prev, logoFile: image }));
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(brand).forEach((entry) =>
			formData.set(entry[0], entry[1])
		);

		const response = await fetch(`${config.apiBaseUrl}/brands`, {
			method: brandId ? "PUT" : "POST",
			body: formData,
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
				value={brand.name}
				onChange={handleChange}
			/>

			<Input
				label="Description"
				placeHolder="description"
				name="description"
				type="text"
				value={brand.description}
				onChange={handleChange}
			/>
			<Input
				label="Alt Text"
				placeHolder="Alt Text"
				name="altText"
				type="text"
				value={brand.altText}
				onChange={handleChange}
			/>

			<FileInput
				label="Logo"
				name="logoFile"
				selectedFile={brand.logoFile}
				onChange={handleFileInputChange}
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
					{brandId ? "Edit" : "Add"}
				</button>
			</div>
		</form>
	);
}
