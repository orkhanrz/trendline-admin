import { X } from "lucide-react";

type ModalProps = {
	children: React.ReactNode;
	onClose?: () => void;
	onConfirm?: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)] z-20">
			<div className="bg-white w-6/12 max-h-10/12 overflow-scroll rounded-md px-4 py-2">
				<header className=" flex items-center justify-end ">
					<button onClick={onClose} className="cursor-pointer">
						<X color="gray" />
					</button>
				</header>

				<main>{children}</main>
			</div>
		</div>
	);
}
