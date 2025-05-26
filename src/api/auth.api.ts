import { getRefreshToken } from "@/utils";
import { LoginSchemaType, RegisterSchemaType } from "@/validator/auth.schema";
import axios from "./axios";

export const register = async ({
	email,
	username,
	password,
}: RegisterSchemaType) => {
	const response = await axios.post("api/users/create/", {
		email,
		username,
		password,
	});
	const data = response.data;
	console.log("data: ", data);
	return data;
};

export const login = async ({ email, password }: LoginSchemaType) => {
	const response = await axios.post("/api/users/login/", {
		email,
		password,
	});

	// const metadata = response.data;

	// if (metadata) {
	// 	const { tokens, ...userData } = metadata.data;
	// 	localStorage.setItem("auth", JSON.stringify(userData));
	// 	localStorage.setItem("tokens", JSON.stringify(tokens));
	// }
	const data = response.data;
	localStorage.setItem("tokens", JSON.stringify(data.tokens));
	localStorage.setItem("users", JSON.stringify(data.data));

	return data;
};

export const fetchAllUSers = async () => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get("/api/users/list-user/", {
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		});
		const data = response.data;

		return data;
	} catch (error) {
		return error;
	}
};

export const logout = async ({ refresh }: { refresh: string }) => {
	try {
		const refreshToken = getRefreshToken();
		const response = await axios.post(
			"api/users/logout/",
			{
				refresh,
			},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);

		if (typeof window !== "undefined") {
			localStorage.removeItem("users");
			localStorage.removeItem("tokens");
		}
		console.log(" response~", response);

		return response;
	} catch (error) {
		console.error("Error during log out:", error);
		throw error;
	}
};
