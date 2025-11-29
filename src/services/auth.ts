import { config } from "@/constants/config";
import { LoginRequestBody } from "@/types";

export async function login(body: LoginRequestBody) {
	try {
		const response = await fetch(`${config.apiBaseUrl}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.detail || "Login failed");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || "Login failed");
		}
	}
}
