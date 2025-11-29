"use client";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
	const [error, setError] = useState<null | string>(null);
	const [formBody, setFormBody] = useState({ email: "", password: "" });
	const router = useRouter();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormBody((prev) => ({ ...prev, [name]: value }));
	}

	function handleResetError() {
		setError(null);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			await login(formBody);
			router.push("/dashboard");
		} catch (err: any) {
			console.log(err.message);
			setError(err.message || "An unexpected error occurred");
		}
	}

	return (
		<form
			className="bg-white shadow-sm border-0 rounded-xl p-6 w-md mx-8"
			onSubmit={handleSubmit}
			onClick={handleResetError}
		>
			<h1 className="text-3xl font-medium text-center mb-6">Login</h1>

			<input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				required
				className="block w-full mb-4 border-1 border-gray-300 p-2 rounded-md outline-none px-4 focus:border-blue-500"
				value={formBody.email}
				onChange={handleChange}
			/>

			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				required
				className="block w-full mb-4 border-1 border-gray-300 p-2 rounded-md outline-none px-4 focus:border-blue-500"
				value={formBody.password}
				onChange={handleChange}
			/>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			<button
				type="submit"
				className="w-full py-2 bg-blue-500 text-white text-lg font-medium rounded-md cursor-pointer"
			>
				Log In
			</button>
		</form>
	);
}
