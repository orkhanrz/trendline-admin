"use client";

import ErrorComponent from "@/components/ui/error-component";

export default function Error() {
	return (
		<ErrorComponent
			status={500}
			text={"Something went wrong. Please come back later :/"}
		/>
	);
}
