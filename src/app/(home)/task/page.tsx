"use client";
import { ProjectCreate, ProjectItem } from "@/components/projects";
import { TaskColumn, TaskCreate, TaskItem } from "@/components/task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const page = () => {
	return (
		<div className='flex flex-col gap-5 w-full h-screen'>
			<div className='flex flex-col gap-5 flex-1 bg-white p-5 rounded-xl shadow-md'>
				<div className='flex items-center justify-between'>
					<div className='text-3xl font-bold'>Project</div>
					<ProjectCreate></ProjectCreate>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<Tabs defaultValue='project' className=''>
						<TabsList>
							<TabsTrigger value='project'>Project</TabsTrigger>
							<TabsTrigger value='todo'>Not Started</TabsTrigger>
							<TabsTrigger value='active'>
								In Progress
							</TabsTrigger>
							<TabsTrigger value='done'>Done</TabsTrigger>
						</TabsList>
						<TabsContent value='project'>
							<ProjectItem status=''></ProjectItem>
						</TabsContent>
						<TabsContent value='todo'>
							<ProjectItem status='todo'></ProjectItem>
						</TabsContent>
						<TabsContent value='active'>
							<ProjectItem status='active'></ProjectItem>
						</TabsContent>
						<TabsContent value='done'>
							<ProjectItem status='done'></ProjectItem>
						</TabsContent>
					</Tabs>
					<div className='flex flex-col gap-2 w-full'></div>
				</div>
			</div>
			<div className='flex flex-col gap-5 flex-1 bg-white p-5 rounded-xl shadow-md'>
				<div className='flex items-center justify-between'>
					<div className='text-3xl font-bold'>Task</div>
					<TaskCreate>
						<PlusIcon className='size-5' />
					</TaskCreate>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<div className='grid grid-cols-3 gap-5 p-4 rounded-lg'>
						<div className='flex items-center justify-between px-2'>
							<div className='px-5 py-0.5 bg-gray-300 text-white rounded-full text-base font-medium'>
								To do
							</div>
							<div>
								<HiOutlineDotsHorizontal />
							</div>
						</div>
						<div className='flex items-center justify-between px-2'>
							<div className='px-5 py-0.5 bg-blue-600 text-white rounded-full text-base font-medium'>
								In Progress
							</div>
							<div>
								<HiOutlineDotsHorizontal />
							</div>
						</div>
						<div className='flex items-center justify-between px-2'>
							<div className='px-5 py-0.5 bg-green-600 text-white rounded-full text-base font-medium'>
								Done
							</div>
							<div>
								<HiOutlineDotsHorizontal />
							</div>
						</div>
					</div>
					<div className='flex-1 overflow-hidden'>
						<div className='grid grid-cols-3 gap-5 items-start content-start'>
							<TaskColumn>
								<TaskItem status='todo'></TaskItem>
							</TaskColumn>
							<TaskColumn>
								<TaskItem status='doing'></TaskItem>
							</TaskColumn>
							<TaskColumn>
								<TaskItem status='done'></TaskItem>
							</TaskColumn>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
