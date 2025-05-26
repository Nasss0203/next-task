import { getRefreshToken } from "@/utils";
import axios from "./axios";

export type ProjectStatus = "todo" | "active" | "done";
export type ProjectPriority = "low" | "medium" | "high";

export interface Project {
	id?: string;
	name?: string;
	description?: string;
	status?: any;
	priority?: any;
	start_date?: any;
	end_date?: any;
	is_archived?: boolean;
	is_personal?: boolean;
	owner?: string;
	members?: string[];
	tasks?: any;
}

export const createProject = async ({
	name,
	priority,
	description,
	owner,
	status,
	end_date,
	is_archived,
	members,
	tasks,
	start_date,
	is_personal,
}: Project) => {
	const tokens = getRefreshToken();
	const response = await axios.post(
		"api/projects/create/",
		{
			name,
			priority,
			description,
			owner,
			status,
			end_date,
			is_archived,
			members,
			tasks,
			start_date,
			is_personal,
		},
		{
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	const data = response.data;

	return data;
};

export const fetchAllProject = async ({
	query,
}: {
	query?: {
		status?: string;
	};
}) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get("api/projects/", {
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

export const updateProject = async ({
	id,
	name,
	priority,
	description,
	owner,
	status,
	end_date,
	is_archived,
	members,
	tasks,
	start_date,
}: Project) => {
	const tokens = getRefreshToken();
	const response = await axios.put(
		`api/projects/update/${id}/`,
		{
			name,
			priority,
			description,
			owner,
			status,
			end_date,
			is_archived,
			members,
			tasks,
			start_date,
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

export const deleteProject = async ({ id }: { id: string }) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.delete(`api/projects/delete/${id}/`, {
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		});
		console.log(" response~", response);

		const data = response.data;

		return data;
	} catch (error) {
		return error;
	}
};

export const addMemberToProject = async ({
	id,
	user_id,
}: {
	id: string;
	user_id: string;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.post(
		`api/projects/add-member/${id}/`,
		{
			user_id,
		},
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

export const fetchUserInProject = async ({ id }: { id?: string }) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get(`api/projects/members/${id}/`, {
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

export const myProjectUser = async () => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get("api/projects/my-projects/", {
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

export const getProgressProject = async ({ id }: { id?: string }) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.get(`api/projects/progress/${id}/`, {
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

export const deleteMemberFromProject = async ({
	id,
	user_id,
}: {
	id?: string;
	user_id?: string;
}) => {
	try {
		const tokens = getRefreshToken();
		const response = await axios.post(
			`api/projects/remove-member/${id}/`,
			{ user_id },
			{
				headers: {
					Authorization: `Bearer ${tokens}`,
				},
			},
		);
		console.log(" response~", response);

		const data = response.data;

		return data;
	} catch (error) {
		return error;
	}
};
