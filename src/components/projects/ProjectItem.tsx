import { useFetchAllProject } from "@/hooks/useProject";
import ProjectDialog from "./ProjectDialog";

type Project = {
	id: string;
	name: string;
	status: "todo" | "active" | "done";
	start_date: Date;
	end_date: Date;
	members: any;
	priority: "low" | "medium" | "high";
	tasks: any;
};

const ProjectItem = ({
	status,
}: {
	status?: "todo" | "done" | "active" | "";
}) => {
	const { dataProject } = useFetchAllProject({ status });

	return (
		<div className='grid lg:grid-cols-5 2xl:grid-cols-7 gap-3  '>
			{dataProject && dataProject?.length > 0 ? (
				<>
					{dataProject?.map((items: Project) => (
						<ProjectDialog
							id={items.id}
							key={items.id}
							name={items.name}
							end_date={items.end_date}
							start_date={items.start_date}
							members={items.members}
							priority={items.priority}
							status={items.status}
							tasks={items.tasks}
						>
							<div className='flex flex-col space-y-3 relative'>
								<div className='bg-white rounded-lg p-3 space-y-2 shadow-sm'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium line-clamp-1 text-left'>
											{items.name}
										</p>
									</div>
									<div className='flex justify-start'>
										<div
											className={`px-2 py-0.5 rounded inline-block   text-[8px] font-medium text-white uppercase ${
												items.status === "todo"
													? "bg-gray-300"
													: items.status === "active"
													? "bg-blue-600"
													: items.status === "done"
													? "bg-green-600"
													: ""
											}`}
										>
											{items.status === "todo"
												? "Not Started"
												: items.status === "active"
												? "In Progress"
												: items.status === "done"
												? "Completed"
												: ""}
										</div>
									</div>
									<div className='flex justify-start'>
										<div
											className={`px-2 py-0.5 rounded inline-block   text-[8px] font-medium  uppercase ${
												items.priority === "low"
													? "bg-[#E0F7FA] text-[#00796B] "
													: items.priority ===
													  "medium"
													? "bg-[#FFF9C4] text-[#F57F17] "
													: "bg-[#FFCDD2] text-[#C62828] "
											}`}
										>
											{items.priority === "low"
												? "Low"
												: items.priority === "medium"
												? "Medium"
												: "High"}
										</div>
									</div>

									<div className='flex items-center gap-2'>
										<div>
											{items.members.length > 0 ? (
												<div className='flex items-center gap-2 font-medium text-xs'>
													{items.members.length}
													<span>members</span>
												</div>
											) : (
												<div className='flex items-center gap-2 font-medium text-xs'>
													0<span>member</span>
												</div>
											)}
										</div>
										<div>
											{items.tasks.length > 0 ? (
												<div className='flex items-center gap-2 font-medium text-xs'>
													{items.tasks.length}
													<span>task</span>
												</div>
											) : (
												<div className='flex items-center gap-2 font-medium text-xs'>
													0<span>task</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</ProjectDialog>
					))}
				</>
			) : null}
		</div>
	);
};

export default ProjectItem;
