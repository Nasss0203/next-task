import { deleteTask, updateTask } from "@/api/task.api";
import { QueryKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
