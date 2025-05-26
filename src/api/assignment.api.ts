import { getRefreshToken } from "@/utils";
import axios from "./axios";

export const createAssignments = async ({
	user_id,
	task_id,
}: {
	user_id: string;
	task_id: string;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.post(
		`/api/assignments/`,
		{
			user_id,
			task_id,
		},
		{
			headers: {
				Authorization: `Bearer ${tokens}`,
			},
		},
	);
	console.log(" response~", response);
	return response.data;
};

export const getTaskByAssignmentUser = async ({ id }: { id?: string }) => {
	const tokens = getRefreshToken();
	const response = await axios.get(`api/assignments/user/${id}/`, {
		headers: {
			Authorization: `Bearer ${tokens}`,
		},
	});
	return response.data;
};

export const getUserByAssignmentTask = async ({ id }: { id?: string }) => {
	const tokens = getRefreshToken();
	const response = await axios.get(`api/assignments/task/${id}/`, {
		headers: {
			Authorization: `Bearer ${tokens}`,
		},
	});
	return response.data;
};

export const deteleAssignment = async ({
	user_id,
	task_id,
}: {
	user_id?: string;
	task_id?: string;
}) => {
	const tokens = getRefreshToken();
	const response = await axios.delete(`/api/assignments/delete/`, {
		data: {
			user_id,
			task_id,
		},
		headers: {
			Authorization: `Bearer ${tokens}`,
		},
	});
	console.log(" response~", response);
	return response.data;
};
