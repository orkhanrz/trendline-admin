import { config } from "@/constants/config";
import { useEffect, useState } from "react";
import FileInput from "../ui/input/file-input";
import Input from "../ui/input/input";
import { CreateOrEditBrand } from "@/types";
import { createBrand, editBrand } from "@/services/brand";

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
		logoFile: null,
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
	}, [brandId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setBrand((prev) => ({ ...prev, [name]: value }));
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file) {
			setBrand((prev) => ({ ...prev, logoFile: file }));
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			if (brandId) {
				await editBrand(brand);
			} else {
				await createBrand(brand);
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
				selectedFile={brand.logoFile?.name}
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
