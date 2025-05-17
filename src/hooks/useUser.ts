"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

	return { user, setUser };
}
