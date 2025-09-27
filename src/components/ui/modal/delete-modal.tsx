import { CircleX, X } from "lucide-react";

type DeleteModalProps = {
	onCancel?: () => void;
	onConfirm?: () => void;
};

export default function DeleteModal({ onCancel, onConfirm }: DeleteModalProps) {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
			<div className="bg-white w-10/12 md:w-6/12 xl:w-3/12 rounded-md px-4 py-2">
				<header className=" flex items-center justify-end ">
					<button onClick={onCancel} className="cursor-pointer">
						<X color="gray" />
					</button>
				</header>

				<main>
					<CircleX
						width={96}
						height={96}
						className="text-red-500"
						style={{ marginInline: "auto", marginBottom: 16 }}
					/>

					<h1 className="text-center text-3xl text-gray-700 font-medium mt-8">
						Are you sure?
					</h1>

					<p className="text-center text-lg text-gray-700 my-10">
						Do you really want to delete these record? This process
						cannot be undone.
					</p>
				</main>

				<footer className="flex justify-center gap-3 my-10">
					<button
						onClick={onCancel}
						className="bg-gray-400 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-500 text-white text-lg rounded-sm px-8 py-2 cursor-pointer"
					>
						Delete
					</button>
				</footer>
			</div>
		</div>
	);
}
