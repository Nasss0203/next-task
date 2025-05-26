import {
	createAssignments,
	deteleAssignment,
	getTaskByAssignmentUser,
	getUserByAssignmentTask,
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
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
	return { createAssign };
}

export function useDeleteAssignment() {
	const queryClient = useQueryClient();
	const { mutate: deleteAssign } = useMutation({
		mutationFn: async ({
			user_id,
			task_id,
		}: {
			user_id: string;
			task_id: string;
		}) => await deteleAssignment({ user_id, task_id }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [["assignments"], "user"],
			});
			queryClient.invalidateQueries({
				queryKey: [["assignments"], "task"],
			});

			queryClient.invalidateQueries({ queryKey: [QueryKeys.TASK] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
	return { deleteAssign };
}

export function useTaskByAssignmentUser({ id }: { id: string }) {
	const { data } = useQuery({
		queryKey: [["assignments"], "user"],
		queryFn: () => getTaskByAssignmentUser({ id }),
		enabled: !!id,
	});

	return { data };
}

export function useUserByAssignmentTask({ id }: { id?: string }) {
	const { data } = useQuery({
		queryKey: [["assignments"], "task"],
		queryFn: () => getUserByAssignmentTask({ id }),
		enabled: !!id,
	});

	return { data };
}
