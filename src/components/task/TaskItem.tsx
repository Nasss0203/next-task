const TaskItem = () => {
	return (
		<div className=' flex flex-col space-y-3'>
			<div className='bg-gray-50 rounded-lg p-3 space-y-2 shadow-sm'>
				<div className='w-full h-28 bg-gray-200 rounded' />
				<p className='text-sm font-medium'>Commodo ex esse in no</p>
				<div className='flex flex-wrap gap-1 text-xs'>
					<span className='bg-gray-200 px-2 py-0.5 rounded'>
						Label
					</span>
					<span className='bg-gray-200 px-2 py-0.5 rounded'>
						Label
					</span>
					<span className='bg-gray-200 px-2 py-0.5 rounded'>
						Label
					</span>
				</div>
				<div className='flex justify-between items-center text-sm text-gray-500'>
					<div className='flex items-center gap-2'>
						<span>📎 3</span>
						<span>💬 1</span>
					</div>
					<div className='flex -space-x-2'>
						<img
							className='w-6 h-6 rounded-full border-2 border-white'
							src='https://via.placeholder.com/24'
						/>
						<img
							className='w-6 h-6 rounded-full border-2 border-white'
							src='https://via.placeholder.com/24'
						/>
						<img
							className='w-6 h-6 rounded-full border-2 border-white'
							src='https://via.placeholder.com/24'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskItem;
