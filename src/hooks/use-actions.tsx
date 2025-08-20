import { useState } from "react";

export default function useActions() {
	const [deleteItemId, setDeleteItemId] = useState<null | string>(null);
	const [editItemId, setEditItemId] = useState<null | string>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

	function openDeleteModal(itemId: string) {
		setDeleteItemId(itemId);
	}

	function openEditModal(itemId: string) {
		setEditItemId(itemId);
	}

	function toggleAddModal() {
		setIsAddModalOpen((prev) => !prev);
	}

	return {
		deleteItemId,
		editItemId,
		isAddModalOpen,
		setDeleteItemId,
		setEditItemId,
		openDeleteModal,
		openEditModal,
		toggleAddModal,
	};
}
