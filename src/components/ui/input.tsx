import { HTMLInputTypeAttribute } from "react";

type InputProps = {
	label: string;
	name: string;
	value?: string;
	placeHolder?: string;
	type?: HTMLInputTypeAttribute;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
	label,
	name,
	value,
	placeHolder,
	type,
	onChange,
}: InputProps) {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="block mb-1">
				{label}
			</label>
			<input
				type={type || "text"}
				id={name}
				name={name}
				placeholder={placeHolder}
				className="block w-full border-1 rounded-md p-2 focus:border-blue-500 outline-none"
				value={value || ""}
				onChange={onChange}
			/>
		</div>
	);
}
