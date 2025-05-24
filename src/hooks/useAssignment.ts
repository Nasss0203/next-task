import { createAssignments } from "@/api/assignment.api";
import { fetchUserInProject } from "@/api/project.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAssignment({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const { data: userInProject } = useQuery({
		queryKey: ["assignments"],
		queryFn: async () => await fetchUserInProject({ id }),
	});

	return { userInProject };
}

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
		},
	});
	return { createAssign };
}
