"use client";

import { fetchAllUSers, logout } from "@/api/auth.api";
import { QueryKeys } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USER_LOCAL_STORAGE_KEY = "users";

function getUserFromLocalStorage() {
	if (typeof window === "undefined") return null;
	const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
	return user ? JSON.parse(user) : null;
}

export function useUser() {
	const queryClient = useQueryClient();
	const { data: user } = useQuery({
		queryKey: ["users"],
		queryFn: async () => getUserFromLocalStorage(),
		initialData: () => getUserFromLocalStorage(),
	});

	const setUser = (newUser: any) => {
		if (typeof window !== "undefined") {
			if (newUser) {
				localStorage.setItem(
					USER_LOCAL_STORAGE_KEY,
					JSON.stringify(newUser),
				);
			} else {
				localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
			}
			queryClient.setQueryData(["users"], newUser);
		}
	};

	const { data: fetchUser } = useQuery({
		queryKey: [QueryKeys.USER, "list-user"],
		queryFn: async () => fetchAllUSers(),
	});

	return { user, setUser, fetchUser };
}
export function useLogoutUser() {
	const queryClient = useQueryClient();

	let parsedTokens: { refresh: string } | null = null;

	if (typeof window !== "undefined") {
		const tokens = localStorage.getItem("tokens");
		parsedTokens = tokens ? JSON.parse(tokens) : null;
	}

	const mutation = useMutation({
		mutationFn: async () => {
			if (!parsedTokens?.refresh) {
				throw new Error("No refresh token available");
			}
			await logout({ refresh: parsedTokens.refresh });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
		},
		onError: (error) => {
			console.error("Logout failed:", error);
		},
	});

	const handleLogout = async () => {
		try {
			await mutation.mutateAsync();
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return { handleLogout };
}
