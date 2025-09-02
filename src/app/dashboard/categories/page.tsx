"use client";

import CategoryForm from "@/components/form/category-form";
import DeleteModal from "@/components/ui/modal/delete-modal";
import Modal from "@/components/ui/modal/modal";
import PageHeader from "@/components/ui/page-header";
import Spinner from "@/components/ui/spinner";
import NoData from "@/components/ui/table/no-data";
import Table from "@/components/ui/table/table";
import TableActions from "@/components/ui/table/table-actions";
import { config } from "@/constants/config";
import useActions from "@/hooks/use-actions";
import useFetch from "@/hooks/use-fetch";
import { deleteCategory } from "@/services/category";
import { Category } from "@/types";

const columns: string[] = ["Id", "Name", "Parenty category id", ""];

export default function CategoriesPage() {
	const { data, isLoading, refetch } = useFetch<Category[]>(
		config.apiBaseUrl + "/categories"
	);
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
			await deleteCategory(deleteItemId);
			setDeleteItemId(null);
			refetch();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<PageHeader title="Categories" onAdd={toggleAddModal} />
			{isLoading && <Spinner />}
			{!isLoading && data && data.length == 0 && <NoData />}
			{data && data.length > 0 && (
				<Table
					columns={columns}
					rows={data.map((item: Category) => [
						item.id,
						item.name,
						item.parentCategoryId || "",
						<TableActions
							key={item.id}
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
					onConfirm={handleDelete.bind(null, deleteItemId)}
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
