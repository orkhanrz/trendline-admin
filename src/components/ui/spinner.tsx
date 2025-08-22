type SpinnerProps = {
	color?: string;
	size?: number;
	border?: number;
};

export default function Spinner({ size, color, border }: SpinnerProps) {
	const spinnerSize = size || 12;
	const spinnerColor = color || "blue-500";
	const spinnerBorder = border || 8;
	const className = `w-${spinnerSize} h-${spinnerSize} rounded-full border-${spinnerBorder} border-l-${spinnerColor} border-t-${spinnerColor} border-b-${spinnerColor} border-r-transparent animate-spin [animation-duration:500ms]`;

	return (
		<div className="flex justify-center items-center">
			<div className={className}></div>
		</div>
	);
}
