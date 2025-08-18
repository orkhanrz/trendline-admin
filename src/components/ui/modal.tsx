type ModalProps = {
	title: string;
	children: React.ReactNode;
	onClose: () => void;
	onConfirm?: () => void;
};

export default function Modal({
	children,
	title,
	onClose,
	onConfirm,
}: ModalProps) {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
			<div className="bg-white w-4/12 rounded-2xl px-4 py-2 relative">
				<header>
					<h2 className="text-center text-3xl font-semibold">
						{title}
					</h2>
				</header>

				<main>{children}</main>

				<footer className="flex justify-end gap-2">
					<button
						className="text-lg bg-red-500 font-medium text-white rounded-lg px-4 py-2 cursor-pointer"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="text-lg bg-blue-500 font-medium text-white rounded-lg px-4 py-2 cursor-pointer"
						onClick={onConfirm}
					>
						Confirm
					</button>
				</footer>
			</div>
		</div>
	);
}
