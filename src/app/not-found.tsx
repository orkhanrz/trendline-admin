import ErrorComponent from "@/components/ui/error-component";

export default function NotFound() {
	return (
		<ErrorComponent
			status={404}
			text={"Sorry, but the page you are looking for is not found :/"}
		/>
	);
}
