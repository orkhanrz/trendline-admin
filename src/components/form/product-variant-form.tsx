import { useEffect, useState } from "react";
import FileInput from "../ui/input/file-input";
import Input from "../ui/input/input";
import SelectInput from "../ui/input/select-input";
import { CreateOrEditProductVariant } from "@/types";
import { config } from "@/constants/config";

type Props = {
	productId: string;
	onClose: () => void;
};

const options = [
	{
		id: "False",
		name: "False",
	},
	{
		id: "True",
		name: "True",
	},
];

export default function ProductVariantForm({ productId, onClose }: Props) {
	const [variant, setVariant] = useState<CreateOrEditProductVariant>({
		color: "",
		isDeleted: false,
		isInStock: true,
		mainImageFile: null,
		mainImageAltText: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setVariant((prev) => ({ ...prev, [name]: value }));
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file) {
			setVariant((prev) => ({ ...prev, mainImageFile: file }));
		}
	}

	async function handleSubmit() {
		const formData = new FormData();

		Object.entries(variant).forEach((entry) =>
			formData.append(entry[0], entry[1])
		);

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
			console.error(err);
		}
	}

	return (
		<div>
			<FileInput
				label="Main Image"
				name="mainImageFile"
				selectedFile={variant.mainImageFile?.name}
				onChange={handleFileInputChange}
			/>

			<Input
				label="Color"
				placeHolder="Color"
				name="color"
				type="text"
				value={variant.color}
				onChange={handleChange}
			/>

			<Input
				label="Main Image Alt Text"
				placeHolder="Main Image Alt Text"
				name="mainImageAltText"
				type="text"
				value={variant.mainImageAltText}
				onChange={handleChange}
			/>

			<SelectInput
				label="Is In Stock"
				placeHolder="Is In Stock"
				name="isInStock"
				options={options}
				value={String(variant.isDeleted)}
				onSelect={() => {}}
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
					onClick={handleSubmit}
					type="button"
					className="bg-blue-600 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
				>
					Edit or Add
				</button>
			</div>
		</div>
	);
}
