import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SelectInputProps = {
	label: string;
	name: string;
	options: { id: string; name: string }[];
	value?: string | null;
	placeHolder?: string;
	onSelect: (id: string) => void;
};

export default function SelectInput({
	label,
	name,
	options,
	value,
	placeHolder,
	onSelect,
}: SelectInputProps) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleSelect() {
		setIsOpen((prev) => !prev);
	}

	const selectedParentName = options.find(
		(option) => option.id == value
	)?.name;

	return (
		<div className="mb-3">
			<label htmlFor={name} className="block mb-1">
				{label}
			</label>

			<div
				className={`w-full border flex justify-between items-center cursor-pointer p-1.75 rounded-md relative ${
					isOpen && "border-blue-500"
				}`}
				onClick={toggleSelect}
			>
				<p>{selectedParentName || placeHolder}</p>

				<button type="button">
					<ChevronDown
						className={`${
							isOpen && "text-blue-500 rotate-180 transition-all"
						}`}
					/>
				</button>

				{isOpen && options.length > 0 && (
					<ul className="absolute bg-white w-full border rounded-md top-12 left-0 overflow-hidden">
						{options.map((option) => (
							<li
								onClick={() => onSelect(option.id)}
								className="p-1.75 cursor-pointer hover:bg-blue-200 font-semibold"
								key={option.id}
							>
								{option.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
