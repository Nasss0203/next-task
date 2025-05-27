import Link from "next/link";

const page = () => {
	return (
		<div className='text-center mt-20 flex flex-col gap-2'>
			<h1 className='text-3xl font-bold'>403 - Unauthorized</h1>
			<p>Bạn không có quyền truy cập trang này.</p>
			<div className=''>
				<Link
					href={"/list"}
					className='px-5 py-2 rounded-md text-white font-medium bg-blue-400 inline-block'
				>
					Quay lại
				</Link>
			</div>
		</div>
	);
};

export default page;
