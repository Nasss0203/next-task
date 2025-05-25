import {
	createAssignments,
	getTaskByAssignmentUser,
} from "@/api/assignment.api";
import { QueryKeys } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateAssignment() {
	const queryClient = useQueryClient();
	const { mutate: createAssign } = useMutation({
		mutationFn: async ({
			user_id,
			task_id,
		}: {
			user_id: string;
			task_id: string;
		}) => await createAssignments({ user_id, task_id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
		},
	});
	return { createAssign };
}

export function useTaskByAssignmentUser({ id }: { id: string }) {
	const { data } = useQuery({
		queryKey: [QueryKeys.PROJECT, id],
		queryFn: () => getTaskByAssignmentUser({ id }),
		enabled: !!id,
	});

	return { data };
}
