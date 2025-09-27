import { ProductVariantImage } from "@/types";
import PageHeader from "../ui/page-header";
import Image from "next/image";
import { config } from "@/constants/config";
import { useRef } from "react";
import {
	addProductVariantImage,
	deleteProductVariantImage,
} from "@/services/product";
import { Trash2 } from "lucide-react";

type Props = {
	productId: string;
	productVariantId: string;
	images: ProductVariantImage[];
	refetch: () => Promise<void>;
};

export default function ProductImages({
	productId,
	productVariantId,
	images,
	refetch,
}: Props) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleOpenFileInput() {
		inputRef.current!.click();
	}

	async function handleDeleteImage(
		productId: string,
		productVariantId: string,
		imageId: string
	) {
		try {
			await deleteProductVariantImage(
				productId,
				productVariantId,
				imageId
			);

			refetch();
		} catch (err) {
			console.log(err);
		}
	}

	async function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		try {
			if (file) {
				await addProductVariantImage(
					productId,
					productVariantId,
					file,
					"Test"
				);

				refetch();
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<PageHeader title="Images" onAdd={handleOpenFileInput} />

			<div className="grid grid-cols-3 gap-4">
				{images.map((image) => (
					<div
						key={image.id}
						onClick={() =>
							handleDeleteImage(
								productId,
								productVariantId,
								image.id
							)
						}
						className="aspect-square relative overflow-hidden rounded-md cursor-pointer"
					>
						<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 opacity-0 hover:opacity-100 transition">
							<div className="absolute inset-0 bg-red-600 opacity-50" />

							<Trash2
								size={32}
								color="#FFFFFF"
								className="relative z-20"
							/>
						</div>

						<Image
							objectFit="cover"
							src={`${config.minioBaseUrl}/${image.urn}`}
							alt={image.altText}
							fill
						/>
					</div>
				))}
			</div>

			<input
				type="file"
				hidden
				ref={inputRef}
				onChange={handleChangeImage}
			/>
		</div>
	);
}
