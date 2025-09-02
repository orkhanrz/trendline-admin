import { Pencil, Trash2 } from "lucide-react";

type TableActionsProps = {
	itemId: string;
	onDelete: (itemId: string) => void;
	onEdit: (itemId: string) => void;
};

export default function TableActions({
	itemId,
	onDelete,
	onEdit,
}: TableActionsProps) {
	return (
		<div className="flex justify-end items-center gap-2">
			<button type="button" onClick={() => onDelete(itemId)}>
				<Trash2 className="text-red-500 cursor-pointer" size={18} />
			</button>

			<button type="button" onClick={() => onEdit(itemId)}>
				<Pencil className="text-blue-600 cursor-pointer" size={18} />
			</button>
		</div>
	);
}
