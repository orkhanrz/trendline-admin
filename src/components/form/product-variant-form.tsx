import { createProductVariant, editProductVariant } from "@/services/product";
import { CreateOrEditProductVariant, ProductVariant } from "@/types";
import { createImageFile } from "@/utils";
import { useEffect, useState } from "react";
import FileInput from "../ui/input/file-input";
import Input from "../ui/input/input";
import SelectInput from "../ui/input/select-input";
import ProductImages from "../product/product-images";

type Props = {
	productId: string;
	productVariant?: ProductVariant;
	onClose: () => void;
	refetch: () => Promise<void>;
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

export default function ProductVariantForm({
	productId,
	productVariant,
	onClose,
	refetch,
}: Props) {
	const [formBody, setFormBody] = useState<CreateOrEditProductVariant>({
		color: "",
		isDeleted: false,
		isInStock: true,
		mainImageFile: null,
		mainImageAltText: "",
	});

	useEffect(() => {
		if (productVariant) {
			const mainImageFile = createImageFile(productVariant.images[0].urn);

			setFormBody({
				color: productVariant.color,
				isDeleted: productVariant.isDeleted,
				isInStock: productVariant.isInStock,
				mainImageFile: mainImageFile,
				mainImageAltText: productVariant.images[0].altText,
			});
		}
	}, [productVariant]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setFormBody((prev) => ({ ...prev, [name]: value }));
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file) {
			setFormBody((prev) => ({ ...prev, mainImageFile: file }));
		}
	}

	async function handleSubmit() {
		try {
			if (!productVariant) {
				const formData = new FormData();

				Object.entries(formBody).forEach((entry) =>
					formData.append(entry[0], entry[1])
				);

				await createProductVariant(productId, formData);
			} else {
				await editProductVariant(
					productId,
					productVariant.id,
					formBody
				);
			}

			refetch();
			onClose();
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<FileInput
				label="Main Image"
				name="mainImageFile"
				selectedFile={formBody.mainImageFile}
				onChange={handleFileInputChange}
			/>

			<Input
				label="Color"
				placeHolder="Color"
				name="color"
				type="text"
				value={formBody.color}
				onChange={handleChange}
			/>

			<Input
				label="Main Image Alt Text"
				placeHolder="Main Image Alt Text"
				name="mainImageAltText"
				type="text"
				value={formBody.mainImageAltText}
				onChange={handleChange}
			/>

			<SelectInput
				label="Is In Stock"
				placeHolder="Is In Stock"
				name="isInStock"
				options={options}
				value={String(formBody.isDeleted)}
				onSelect={() => {}}
			/>

			{productVariant?.images && (
				<ProductImages
					productId={productId}
					productVariantId={productVariant.id}
					images={productVariant.images}
					refetch={refetch}
				/>
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
					onClick={handleSubmit}
					type="button"
					className="bg-blue-600 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
				>
					{productVariant ? "Edit" : "Add"}
				</button>
			</div>
		</div>
	);
}
