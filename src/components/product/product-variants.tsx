import { ProductVariant } from "@/types";
import Table from "../ui/table/table";
import TableActions from "../ui/table/table-actions";
import useActions from "@/hooks/use-actions";
import DeleteModal from "../ui/modal/delete-modal";
import { deleteProductVariant } from "@/services/product";
import PageHeader from "../ui/page-header";
import Modal from "../ui/modal/modal";
import ProductVariantForm from "../form/product-variant-form";

const variantsColumns = ["Id", "Product id", "Color", "In Stock", ""];

export default function ProductVariants({
	productId,
	variants,
	refetch,
}: {
	productId: string;
	variants: ProductVariant[];
	refetch: () => Promise<void>;
}) {
	const {
		deleteItemId,
		editItemId,
		isAddModalOpen,
		openDeleteModal,
		openEditModal,
		toggleAddModal,
		setDeleteItemId,
		setEditItemId,
	} = useActions();

	async function handleDelete(deleteItemId: string) {
		try {
			await deleteProductVariant(productId, deleteItemId);
		} catch (err) {
			console.error(err);
		}
	}

	const productVariant = variants.find(
		(variant) => variant.id === editItemId
	);

	return (
		<>
			<PageHeader title="Variants" onAdd={toggleAddModal} />

			<Table
				columns={variantsColumns}
				rows={variants
					?.filter((variant) => !variant.isDeleted)
					.map((variant) => [
						variant.id,
						variant.productId,
						variant.color,
						variant.isInStock ? "Yes" : "No",
						<TableActions
							key={variant.id}
							itemId={variant.id}
							onDelete={openDeleteModal}
							onEdit={openEditModal}
						/>,
					])}
			/>

			{deleteItemId && (
				<DeleteModal
					onCancel={setDeleteItemId.bind(null, null)}
					onConfirm={handleDelete.bind(null, deleteItemId)}
				/>
			)}

			{isAddModalOpen && (
				<Modal onClose={toggleAddModal}>
					<ProductVariantForm
						productId={productId}
						onClose={toggleAddModal}
						refetch={refetch}
					/>
				</Modal>
			)}

			{editItemId && (
				<Modal onClose={setEditItemId.bind(null, null)}>
					<ProductVariantForm
						productId={productId}
						productVariant={productVariant}
						onClose={setEditItemId.bind(null, null)}
						refetch={refetch}
					/>
				</Modal>
			)}
		</>
	);
}
