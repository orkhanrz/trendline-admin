"use client";
import BrandForm from "@/components/form/brand-form";
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
import { Brand } from "@/types";
import Image from "next/image";

const columns = ["Id", "Name", "Description", "Logo", ""];

export default function BrandsPage() {
	const { data, isLoading, refetch } = useFetch(
		config.apiBaseUrl + "/brands"
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
			`${config.apiBaseUrl}/brands/${deleteItemId}`,
			{ method: "DELETE" }
		);
		if (!response.ok) {
			throw new Error("Failed to delete brand");
		}

		setDeleteItemId(null);
		refetch();
	}

	return (
		<>
			<PageHeader title="Brands" onAdd={toggleAddModal} />

			{isLoading && <Spinner />}
			{!isLoading && data.length == 0 && <NoData />}
			{data.length > 0 && (
				<Table
					columns={columns}
					rows={data.map((item: Brand) => [
						item.id,
						item.name,
						item.description,
						item.logoUrl ? (
							<Image
								src={config.minioBaseUrl + item.logoUrl}
								alt={item.name}
								width={32}
								height={32}
							/>
						) : (
							""
						),
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
					onConfirm={handleDelete}
				/>
			)}

			{editItemId && (
				<Modal onClose={setEditItemId.bind(null, null)}>
					<BrandForm
						refetch={refetch}
						onClose={setEditItemId.bind(null, null)}
						brandId={editItemId}
					/>
				</Modal>
			)}

			{isAddModalOpen && (
				<Modal onClose={toggleAddModal}>
					<BrandForm onClose={toggleAddModal} refetch={refetch} />
				</Modal>
			)}
		</>
	);
}
