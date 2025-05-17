import { updateTask } from "@/api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTaskUpdate(options?: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();

	const { mutate: updateTaskItem } = useMutation({
		mutationFn: async ({ id, status }: { id: string; status: string }) => {
			await updateTask({ id, status });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			options?.onSuccess?.();
		},
	});

	return { updateTaskItem };
}
