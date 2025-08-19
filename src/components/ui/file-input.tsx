import { Trash2, UploadIcon } from "lucide-react";
import { useRef } from "react";

type FileInputProps = {
	label: string;
	name: string;
	selectedFile: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileInput({
	label,
	name,
	selectedFile,
	onChange,
}: FileInputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleInputClick() {
		(inputRef.current as HTMLInputElement).click();
	}

	return (
		<div>
			<label htmlFor={name} className="block mb-1">
				{label}
			</label>

			<div
				className="border border-blue-600 border-dashed rounded-2xl text-center p-8 cursor-pointer mb-4"
				onClick={handleInputClick}
			>
				<div className="w-fit mx-auto bg-blue-100 rounded-full p-4 mb-4">
					<UploadIcon size={32} className="text-blue-600" />
				</div>
				<p className="text-xl font-medium text-blue-600">Upload File</p>
			</div>

			{selectedFile && (
				<div className="flex justify-between items-center bg-blue-100 p-3 border-1 border-blue-200 rounded-full relative">
					<p className="font-semibold">{selectedFile}</p>
					<div className="text-white bg-blue-700 p-3 rounded-full absolute right-0">
						<Trash2 size={24} />
					</div>
				</div>
			)}

			<input
				type="file"
				name={name}
				id={name}
				onChange={onChange}
				className="hidden"
				ref={inputRef}
				accept="image/*"
			/>
		</div>
	);
}
