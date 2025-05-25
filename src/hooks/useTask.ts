import {
	deleteTask,
	fetchAllTask,
	fetchAllTaskForProjects,
	updateTask,
} from "@/api/task.api";
import { QueryKeys } from "@/constants";
import { getRefreshToken } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import { useMyProjects } from "./useProject";

export function useTask(options?: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();

	const { mutate: updateTaskItem } = useMutation({
		mutationFn: async ({
			id,
			status,
			priority,
		}: {
			id: string;
			status?: string;
			priority?: string;
		}) => {
			await updateTask({ id, status, priority });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.TASK, "TasksByUserProjects"],
			});
			options?.onSuccess?.();
		},
	});

	const { mutate: deleteTaskItem } = useMutation({
		mutationFn: async (id: string) => {
			await deleteTask(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
			options?.onSuccess?.();
		},
	});

	return { updateTaskItem, deleteTaskItem };
}

export function useGetAllTasks({
	status,
}: {
	status?: "todo" | "done" | "doing";
}) {
	const { data } = useQuery({
		queryKey: [QueryKeys.TASK, status],
		queryFn: () => fetchAllTask({ query: { status } }),
	});
	return { data };
}

export function useGetAllTasksForProject({
	id,
	query,
}: {
	id: string;
	query: {
		status?: any;
	};
}) {
	const { data } = useQuery({
		queryKey: [QueryKeys.TASK, id, query],
		queryFn: () => fetchAllTaskForProjects({ id, query }),
		enabled: !!id,
	});
	return { data };
}

export const useTasksByUserProjects = (status?: "todo" | "done" | "doing") => {
	const { data: listProject } = useMyProjects();

	const tokens = getRefreshToken();

	return useQuery({
		queryKey: [QueryKeys.TASK, "TasksByUserProjects"],
		enabled: !!listProject && listProject?.length > 0,
		queryFn: async () => {
			if (!listProject || listProject?.length === 0) {
				return [];
			}

			const taskResponses = await Promise.all(
				listProject.map(async (project: any) => {
					try {
						const res = await axios.get(
							`/api/tasks/project/${project.id}/`,
							{
								params: { status },
								headers: {
									Authorization: `Bearer ${tokens}`,
								},
							},
						);
						console.log(
							`Tasks for project ${project.id}:`,
							res.data,
						);
						return res.data;
					} catch (error) {
						console.error(error);
						return [];
					}
				}),
			);

			const allTasks = taskResponses?.flatMap((res) => {
				if (Array.isArray(res)) {
					return res;
				} else {
					return [];
				}
			});

			return allTasks;
		},
	});
};
