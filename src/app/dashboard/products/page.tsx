"use client";

import ProductForm from "@/components/form/product-form";
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
import { Product } from "@/types";
import { useState } from "react";

const columns: string[] = [
	"Id",
	"Name",
	"Description",
	"Brand Name",
	"Category Name",
	"Is in stock",
	"",
];

export default function ProductsPage() {
	const [pagination, setPagination] = useState({
		pageNumber: 1,
		pageSize: 50,
	});

	const { data, isLoading, refetch } = useFetch<{ items: Product[] }>(
		`${config.apiBaseUrl}/products?PageNumber=${pagination.pageNumber}&PageSize=${pagination.pageSize}`
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

	async function handleDelete() {
		const response = await fetch(
			`${config.apiBaseUrl}/products/${deleteItemId}`,
			{ method: "DELETE" }
		);
		if (!response.ok) {
			throw new Error("Failed to delete product");
		}

		setDeleteItemId(null);
		refetch();
	}

	return (
		<>
			<PageHeader title="Products" onAdd={toggleAddModal} />
			{isLoading && <Spinner />}
			{!isLoading && data && data.items?.length == 0 && <NoData />}
			{data && data.items?.length > 0 && (
				<Table
					columns={columns}
					rows={data.items?.map((item: Product) => [
						item.id,
						item.name,
						item.description,
						item.brandName,
						item.categoryName,
						item.isInStock ? "Yes" : "No",
						<TableActions
							key={item.id}
							itemId={item.id}
							isInStock={item.isInStock}
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
					<ProductForm
						refetch={refetch}
						onClose={setEditItemId.bind(null, null)}
						productId={editItemId}
					/>
				</Modal>
			)}

			{isAddModalOpen && (
				<Modal onClose={toggleAddModal}>
					<ProductForm onClose={toggleAddModal} refetch={refetch} />
				</Modal>
			)}
		</>
	);
}
