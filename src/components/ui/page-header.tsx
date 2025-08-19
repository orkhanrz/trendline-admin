import { PlusCircle } from "lucide-react";

type PageHeaderProps = {
	title: string;
	onAdd: () => void;
};

export default function PageHeader({ title, onAdd }: PageHeaderProps) {
	return (
		<div className="flex justify-between items-center">
			<h1 className="text-2xl font-bold mb-4">{title}</h1>
			<button className="cursor-pointer" onClick={onAdd}>
				<PlusCircle className="text-blue-600" />
			</button>
		</div>
	);
}
