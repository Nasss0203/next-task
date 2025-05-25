import TableComponent from "@/components/table/TableComponent";

const page = async () => {
	return (
		<div className='flex flex-col gap-5'>
			<TableComponent status='todo'></TableComponent>
			<TableComponent status='doing'></TableComponent>
			<TableComponent status='done'></TableComponent>
		</div>
	);
};

export default page;
