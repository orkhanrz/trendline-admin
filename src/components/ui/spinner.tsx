type SpinnerProps = {
	color?: string;
	width?: number;
	borderWidth?: number;
};

export default function Spinner({
	width = 48,
	borderWidth = 8,
	color = "#2C7FFF",
}: SpinnerProps) {
	return (
		<div className="flex justify-center items-center">
			<div
				className="rounded-full animate-spin [animation-duration:500ms]"
				style={{
					width: width,
					aspectRatio: 1,
					borderWidth: borderWidth,
					borderStyle: "solid",
					borderColor: `${color} ${color} ${color} transparent`,
					marginBlock: width,
				}}
			></div>
		</div>
	);
}
