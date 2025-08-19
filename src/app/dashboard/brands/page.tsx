"use client";
import BrandForm from "@/components/form/brand-form";
import DeleteModal from "@/components/ui/delete-modal";
import Modal from "@/components/ui/modal";
import NoData from "@/components/ui/no-data";
import PageHeader from "@/components/ui/page-header";
import Table from "@/components/ui/table";
import { config } from "@/constants/config";
import useFetch from "@/hooks/use-fetch";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const columns = ["Id", "Name", "Description", "Logo", ""];

export default function BrandsPage() {
	const [deleteItemId, setDeleteItemId] = useState<null | string>(null);
	const [editItemId, setEditItemId] = useState<null | string>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const { data, refetch } = useFetch(config.apiBaseUrl + "/brands");

	function openDeleteModal(itemId: string) {
		setDeleteItemId(itemId);
	}

	function openEditModal(itemId: string) {
		setEditItemId(itemId);
	}

	function toggleAddModal() {
		setIsAddModalOpen((prev) => !prev);
	}

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

			{data && data.length > 0 ? (
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
						<div className="flex gap-2">
							<button onClick={() => openDeleteModal(item.id)}>
								<Trash2
									className="text-red-500 cursor-pointer"
									size={18}
								/>
							</button>

							<button onClick={() => openEditModal(item.id)}>
								<Pencil
									className="text-blue-600 cursor-pointer"
									size={18}
								/>
							</button>
						</div>,
					])}
				/>
			) : (
				<NoData />
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
