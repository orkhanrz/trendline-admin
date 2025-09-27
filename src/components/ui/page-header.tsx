import { PlusCircle } from "lucide-react";

type PageHeaderProps = {
	title: string;
	onAdd: () => void;
};

export default function PageHeader({ title, onAdd }: PageHeaderProps) {
	return (
		<div className="flex justify-between items-center mb-4">
			<h1 className="text-2xl font-bold">{title}</h1>
			<button type="button" className="cursor-pointer" onClick={onAdd}>
				<PlusCircle className="text-blue-600" />
			</button>
		</div>
	);
}
