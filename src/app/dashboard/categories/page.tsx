"use client";

import CategoryForm from "@/components/form/category-form";
import DeleteModal from "@/components/ui/modal/delete-modal";
import Modal from "@/components/ui/modal/modal";
import PageHeader from "@/components/ui/page-header";
import NoData from "@/components/ui/table/no-data";
import Table from "@/components/ui/table/table";
import TableActions from "@/components/ui/table/table-actions";
import { config } from "@/constants/config";
import useActions from "@/hooks/use-actions";
import useFetch from "@/hooks/use-fetch";

const columns: string[] = ["Id", "Name", "Parenty category id", ""];

export default function CategoriesPage() {
	const { data, refetch } = useFetch(config.apiBaseUrl + "/categories");
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

	async function handleDelete() {
		const response = await fetch(
			`${config.apiBaseUrl}/categories/${deleteItemId}`,
			{ method: "DELETE" }
		);
		if (!response.ok) {
			throw new Error("Failed to delete category");
		}

		setDeleteItemId(null);
		refetch();
	}

	return (
		<>
			<PageHeader title="Categories" onAdd={toggleAddModal} />

			{data.length === 0 ? (
				<NoData />
			) : (
				<Table
					columns={columns}
					rows={data.map((item: Category) => [
						item.id,
						item.name,
						item.parentCategoryId || "",
						<TableActions
							itemId={item.id}
							onDelete={openDeleteModal}
							onEdit={openEditModal}
						/>,
					])}
				/>
			)}

			{deleteItemId && (
				<DeleteModal
					onCancel={setDeleteItemId.bind(null, null)}
					onConfirm={handleDelete}
				/>
			)}

			{editItemId && (
				<Modal onClose={setEditItemId.bind(null, null)}>
					<CategoryForm
						refetch={refetch}
						onClose={setEditItemId.bind(null, null)}
						categoryId={editItemId}
					/>
				</Modal>
			)}

			{isAddModalOpen && (
				<Modal onClose={toggleAddModal}>
					<CategoryForm onClose={toggleAddModal} refetch={refetch} />
				</Modal>
			)}
		</>
	);
}
