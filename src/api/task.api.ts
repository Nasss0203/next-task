import { getRefreshToken } from "@/utils";
import axios from "./axios";

export const createTask = async ({
	title,
	due_date,
	priority,
	description,
	userId,
	status,
	projectId,
}: {
	userId: string;
	title: string;
	status?: string;
	description?: string;
	priority: string;
	due_date: Date;
	projectId?: string;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.post(
		"api/tasks/",
		{ title, due_date, priority, description, userId, status, projectId },
		{
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	console.log(" response~", response);
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
	try {
		const tokens = getRefreshToken();
		const response = await axios.get("api/tasks/", {
			params: {
				...query,
			},
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

export const fetchAllTaskForProjects = async ({
	query,
	id,
}: {
	query?: {
		status?: string;
	};
	id: string;
}) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get(`api/tasks/project/${id}`, {
			params: {
				...query,
			},
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		});
		const data = response.data;
		console.log(" response~", response);

		return data;
	} catch (error) {
		return error;
	}
};

export const updateTask = async ({
	id,
	status,
	priority,
}: {
	id: string;
	status?: any;
	priority?: any;
}) => {
	console.log(" id~", id);
	const tokens = getRefreshToken();
	const response = await axios.put(
		`api/tasks/update/${id}/`,
		{
			status,
			priority,
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

export const deleteTask = async (id: string) => {
	const tokens = getRefreshToken();
	const response = await axios.delete(`api/tasks/delete/${id}/`, {
		headers: {
			Authorization: `Bearer ${tokens}`,
		},
	});
	console.log("response: ", response);

	const data = response.data;

	return data;
};
