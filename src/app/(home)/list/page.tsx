import { TaskColumn, TaskItem } from "@/components/task";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const page = () => {
	return (
		<div className='flex flex-col gap-5 flex-1 bg-white p-5'>
			<div className='flex items-center justify-between'>
				<div className='text-3xl font-bold'>Task</div>
				<div className='flex items-center gap-2.5'></div>
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<div className='grid grid-cols-4 gap-5 p-4 rounded-lg'>
					<div className='flex items-center justify-between px-2'>
						<div>Not Ready</div>
						<div>
							<HiOutlineDotsHorizontal />
						</div>
					</div>
					<div className='flex items-center justify-between px-2'>
						<div>To do</div>
						<div>
							<HiOutlineDotsHorizontal />
						</div>
					</div>
					<div className='flex items-center justify-between px-2'>
						<div>In Progress</div>
						<div>
							<HiOutlineDotsHorizontal />
						</div>
					</div>
					<div className='flex items-center justify-between px-2'>
						<div>Completed</div>
						<div>
							<HiOutlineDotsHorizontal />
						</div>
					</div>
				</div>
				<div className='flex-1 overflow-hidden'>
					<div className='grid grid-cols-4 gap-5 items-start content-start h-screen'>
						<TaskColumn>
							{Array(2)
								.fill(0)
								.map((index) => (
									<TaskItem key={index}></TaskItem>
								))}
						</TaskColumn>
						<TaskColumn>
							{Array(3)
								.fill(0)
								.map((index) => (
									<TaskItem key={index}></TaskItem>
								))}
						</TaskColumn>
						<TaskColumn>
							{Array(1)
								.fill(0)
								.map((index) => (
									<TaskItem key={index}></TaskItem>
								))}
						</TaskColumn>
						<TaskColumn>
							{Array(4)
								.fill(0)
								.map((index) => (
									<TaskItem key={index}></TaskItem>
								))}
						</TaskColumn>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
