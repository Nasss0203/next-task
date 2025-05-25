"use client";
import { useCreateAssignment } from "@/hooks/useAssignment";
import { useFetchUserInProject } from "@/hooks/useProject";
import { useTask } from "@/hooks/useTask";
import { Combobox } from "../combobox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export type Status = {
	value: string;
	label: string;
};

export const statuses: Status[] = [
	{
		value: "todo",
		label: "Todo",
	},
	{
		value: "doing",
		label: "In Progress",
	},
	{
		value: "done",
		label: "Done",
	},
];

export const priorities: Status[] = [
	{
		value: "low",
		label: "Low",
	},
	{
		value: "medium",
		label: "Medium",
	},
	{
		value: "high",
		label: "High",
	},
	{
		value: "urgent",
		label: "Urgent",
	},
];

const TaskDetail = ({
	status,
	id,
	priority,
	assigned_users,
	projectId,
	onSuccess,
}: {
	status?: "todo" | "done" | "doing";
	priority: "low" | "medium" | "high" | "urgent";
	id: string;
	assigned_users: any;
	projectId: string;
	onSuccess?: () => void;
}) => {
	const { updateTaskItem } = useTask({
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const { dataUser } = useFetchUserInProject({ id: projectId });
	console.log(" dataUser~", dataUser);
	const { createAssign } = useCreateAssignment();

	return (
		<div className=' mt-5'>
			<div className='flex flex-col gap-y-3 '>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Status
					</div>
					<Select
						onValueChange={(value) => {
							const selected =
								statuses.find((s) => s.value === value) || null;
							console.log("Selected Status:", selected);
							if (selected) {
								updateTaskItem({
									id,
									status: selected.value,
								});
							}
						}}
					>
						<SelectTrigger className='w-[150px]'>
							<SelectValue
								placeholder={
									status === "todo"
										? "Todo"
										: status === "doing"
										? "In Progress"
										: status === "done"
										? "Done"
										: "Todo"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{statuses.map((status) => (
								<SelectItem
									key={status.value}
									value={status.value}
								>
									{status.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Priority
					</div>
					<Select
						onValueChange={(value) => {
							const selected =
								priorities.find((p) => p.value === value) ||
								null;
							console.log("Selected Priority:", selected);
							if (selected) {
								updateTaskItem({
									id,
									priority: selected.value,
								});
							}
						}}
					>
						<SelectTrigger className='w-[150px]'>
							<SelectValue
								placeholder={
									priority === "low"
										? "Low"
										: priority === "medium"
										? "Medium"
										: priority === "high"
										? "High"
										: priority === "urgent"
										? "Urgent"
										: "Low"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{priorities.map((priority) => (
								<SelectItem
									key={priority.value}
									value={priority.value}
								>
									{priority.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Assigned to
					</div>
					<div className='text-sm text-black font-medium flex-1'>
						{assigned_users?.length > 0 ? (
							<div className='flex items-center gap-2'>
								<div className='flex items-center flex-wrap gap-1'>
									{assigned_users.map((user: any) => (
										<div
											className='px-2 py-1 rounded-md border border-neutral-200 bg-gray-400 text-white text-xs font-medium'
											key={user.id}
										>
											{user.username}
										</div>
									))}
								</div>
								<Combobox
									items={dataUser?.map((user: any) => ({
										value: user.id,
										label: user.username,
									}))}
									onSelect={(userId) => {
										console.log(
											"Selected User ID:",
											userId,
										);
										createAssign({
											user_id: userId,
											task_id: id,
										});
									}}
								/>
							</div>
						) : (
							<div className='flex items-center gap-2'>
								<div className='text-sm text-black font-medium '>
									No one assigned
								</div>
								<Combobox
									items={dataUser?.map((user: any) => ({
										value: user.id,
										label: user.username,
									}))}
									onSelect={(userId) => {
										console.log(
											"Selected User ID:",
											userId,
										);
										createAssign({
											user_id: userId,
											task_id: id,
										});
									}}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Due Date
					</div>
					<div className='text-sm text-black font-medium '>
						December 5, 2023
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<div className='text-base font-medium text-gray-400 w-24'>
						Tags
					</div>
					<div className='text-sm text-black p-1 bg-purple-200 rounded-md font-medium '>
						Developer
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
