import { Pencil, Trash2 } from "lucide-react";

type TableActionsProps = {
	itemId: string;
	isInStock?: boolean;
	onDelete: (itemId: string) => void;
	onEdit: (itemId: string) => void;
};

export default function TableActions({
	itemId,
	isInStock = true,
	onDelete,
	onEdit,
}: TableActionsProps) {
	return (
		<div className="flex justify-end items-center gap-2">
			{isInStock && (
				<button onClick={() => onDelete(itemId)}>
					<Trash2 className="text-red-500 cursor-pointer" size={18} />
				</button>
			)}

			<button onClick={() => onEdit(itemId)}>
				<Pencil className="text-blue-600 cursor-pointer" size={18} />
			</button>
		</div>
	);
}
