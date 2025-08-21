"use client";
import { config } from "@/constants/config";
import { useState } from "react";

export default function LoginForm() {
	const [error, setError] = useState<null | string>(null);
	const [form, setForm] = useState({ email: "", password: "" });

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			const response = await fetch(`${config.apiBaseUrl}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await response.json();

			if (data.status != 200 || data.status != 201) {
				return setError(data.detail || data.title);
			}

			console.log(data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message || "An error occurred.");
			}
		}
	}

	return (
		<form
			className="bg-white shadow-sm border-0 rounded-xl p-6 w-md mx-8"
			onSubmit={handleSubmit}
		>
			<h1 className="text-3xl font-medium text-center mb-6">Login</h1>

			<input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				required
				className="block w-full mb-4 border-1 border-gray-300 p-2 rounded-md outline-none px-4 focus:border-blue-500"
				value={form.email}
				onChange={handleChange}
			/>

			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				required
				className="block w-full mb-4 border-1 border-gray-300 p-2 rounded-md outline-none px-4 focus:border-blue-500"
				value={form.password}
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
