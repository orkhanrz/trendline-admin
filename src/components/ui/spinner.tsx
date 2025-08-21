export default function Spinner() {
	return (
		<div className="flex justify-center items-center">
			<div className="w-12 h-12 rounded-full border-8 border-l-blue-500 border-t-blue-500 border-b-blue-500 border-r-transparent animate-spin [animation-duration:500ms]"></div>
		</div>
	);
}
