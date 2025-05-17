import { getRefreshToken } from "@/utils";
import axios from "./axios";

export const createTask = async ({
	title,
	due_date,
	priority,
	description,
	userId,
	status,
}: {
	userId: string;
	title: string;
	status?: string;
	description?: string;
	priority: string;
	due_date: Date;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.post(
		"api/tasks/",
		{ title, due_date, priority, description, userId, status },
		{
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	const data = response.data;

	return data;
};

export const fetchAllTask = async ({
	query,
}: {
	query?: {
		status?: string;
		priority?: string;
		due_date?: any;
	};
}) => {
	const tokens = getRefreshToken();
	const response = await axios.get(
		"api/tasks/",

		{
			params: {
				...query,
			},

			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	const data = response.data;

	return data;
};

export const updateTask = async ({
	id,
	status,
}: {
	id: string;
	status: any;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.put(
		`api/tasks/update/${id}/`,
		{
			status,
		},
		{
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	console.log("response: ", response);

	const data = response.data;

	return data;
};
