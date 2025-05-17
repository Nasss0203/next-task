import React from "react";

const TaskColumn = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='bg-gray-100 shadow p-3 flex flex-col gap-3 overflow-y-auto max-h-screen'>
			{children}
		</div>
	);
};

export default TaskColumn;
