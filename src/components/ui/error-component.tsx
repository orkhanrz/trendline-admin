"use client";

type ErrorProps = {
	status: number;
	text: string;
};

export default function ErrorComponent({ text, status }: ErrorProps) {
	return (
		<div>
			<h1>{status}</h1>
			<p>{text}</p>
		</div>
	);
}
