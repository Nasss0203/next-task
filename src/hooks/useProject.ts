"use client";
import {
	addMemberToProject,
	createProject,
	deleteProject,
	fetchAllProject,
	fetchUserInProject,
	getProgressProject,
	myProjectUser,
	Project,
	updateProject,
} from "@/api/project.api";
import { QueryKeys } from "@/constants";
import { ProjectSchema, ProjectSchemaType } from "@/validator/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "./useUser";

export function useFetchAllProject({
	status,
}: {
	status?: "todo" | "done" | "active" | "";
}) {
	const { data: dataProject } = useQuery({
		queryKey: [QueryKeys.PROJECT, status],
		queryFn: () => fetchAllProject({ query: { status } }),
		enabled: status !== undefined,
	});

	return { dataProject };
}

export function useCreateProject() {
	const queryClient = useQueryClient();
	const { user } = useUser();

	const form = useForm<ProjectSchemaType>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			description: "",
			end_date: new Date(),
			is_archived: false,
			members: [],
			name: "",
			owner: user?.id || "",
			priority: "low",
			start_date: new Date(),
			status: "todo",
			tasks: [],
			is_personal: false,
		},
	});

	const mutation = useMutation({
		mutationFn: (values: any) => createProject(values),
		onSuccess: (data: any) => {
			toast.success("create task successfully");
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
			form.reset();
		},
		onError: (error: any) => {
			console.error("Đăng ký thất bại:", error?.response.data?.error);
			toast.error(error?.response.data?.error);
		},
	});

	function onSubmit(values: ProjectSchemaType) {
		console.log(" values~", values);
		const formattedValues = {
			...values,
			start_date: format(new Date(values.start_date), "yyyy-MM-dd"),
			end_date: format(new Date(values.end_date), "yyyy-MM-dd"),
		};

		mutation.mutate(formattedValues);
	}

	return {
		onSubmit,
		form,
	};
}

export function useProjectDetail(initStatus?: string, initPriority?: string) {
	const [selectedStatus, setSelectedStatus] = useState(initStatus || "");
	const [selectedPriority, setSelectedPriority] = useState(
		initPriority || "",
	);

	useEffect(() => {
		setSelectedStatus(initStatus || "");
	}, [initStatus]);
	useEffect(() => {
		setSelectedPriority(initPriority || "");
	}, [initPriority]);

	const handleSelectStatus = (value: string) => {
		setSelectedStatus(value);
	};

	const handleSelectPriority = (value: string) => {
		setSelectedPriority(value);
	};

	return {
		selectedStatus,
		handleSelectStatus,
		selectedPriority,
		handleSelectPriority,
	};
}

export function useProjectUpdate(options?: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();

	const { mutate: updateItem } = useMutation({
		mutationFn: async ({
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
			await updateProject({
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
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
			options?.onSuccess?.();
		},
	});

	return { updateItem };
}

export function useProjectDelete() {
	const queryClient = useQueryClient();

	const { mutate: deleteItem } = useMutation({
		mutationFn: async ({ id }: { id: string }) => deleteProject({ id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
		},
	});

	return { deleteItem };
}

export function useProject() {
	const queryClient = useQueryClient();

	const { mutate: addMember } = useMutation({
		mutationFn: async ({ id, user_id }: { id: string; user_id: any }) => {
			await addMemberToProject({ id, user_id });
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECT] });
		},
	});

	return { addMember };
}

export function useFetchUserInProject({ id }: { id: string }) {
	const { data: dataUser } = useQuery({
		queryKey: [QueryKeys.PROJECT, id],
		queryFn: () => fetchUserInProject({ id }),
		enabled: !!id,
	});

	return { dataUser };
}

export function useMyProjects() {
	const { user } = useUser();
	const { data } = useQuery({
		queryKey: [QueryKeys.PROJECT, user?.id],
		queryFn: async () => await myProjectUser(),
		enabled: !!user?.id,
	});

	return { data };
}

export function useProgressProject({ id }: { id?: string }) {
	const { data } = useQuery({
		queryKey: [QueryKeys.PROJECT, "progress", id],
		queryFn: async () => await getProgressProject({ id }),
	});

	return { data };
}
