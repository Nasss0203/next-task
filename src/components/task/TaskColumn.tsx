import React from "react";

const TaskColumn = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='bg-gray-100 shadow p-3 flex flex-col gap-3 overflow-y-auto '>
			{children}
			<div className='mt-3 border border-dashed border-gray-300 rounded p-2 text-center cursor-pointer text-sm text-gray-500'>
				+ Add task
			</div>
		</div>
	);
};

export default TaskColumn;
