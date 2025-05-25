'use client";';
import { useTask } from "@/hooks/useTask";
import { Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import TaskDetail from "./TaskDetail";

// PRIORITY_CHOICES = [
// 	('low', 'Low'),
// 	('medium', 'Medium'),
// 	('high', 'High'),
// 	('urgent', 'Urgent'),
// ]

const TaskDialog = ({
	id,
	children,
	title,
	status,
	priority,
	assigned_users,
	projectId,
}: {
	id: string;
	children: ReactNode;
	assigned_users?: any;
	projectId: string;
	title: string;
	status: "todo" | "done" | "doing";
	priority: "low" | "medium" | "high" | "urgent";
}) => {
	console.log(" status~", status);
	const [open, setOpen] = useState(false);
	const { deleteTaskItem } = useTask();
	return (
		<div className='relative group'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className='cursor-pointer w-full'>
					{children}
				</DialogTrigger>
				<DialogContent className='min-w-[600px]'>
					<DialogHeader>
						<DialogTitle className='text-2xl font-semibold line-clamp-2 '>
							{title}
						</DialogTitle>
						<DialogDescription>
							<TaskDetail
								projectId={projectId}
								priority={priority}
								status={status}
								assigned_users={assigned_users}
								id={id}
								onSuccess={() => setOpen(false)}
							/>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<div className=' absolute top-0 right-0 px-2 py-1 cursor-pointer'>
				<Popover>
					<PopoverTrigger>
						<BsThreeDots />
					</PopoverTrigger>
					<PopoverContent className='w-[100px] p-1 cursor-pointer'>
						<div
							className='flex items-center gap-1 cursor-pointer text-sm'
							onClick={() => deleteTaskItem(id)}
						>
							<Trash2 className='size-4' />
							<span>Delete</span>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default TaskDialog;
