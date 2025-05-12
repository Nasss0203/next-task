import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='p-5'>
			<Link href={"/"}>
				<div className='flex items-center gap-2'>
					<ArrowLeft />
					<span>Back home</span>
				</div>
			</Link>
			<div className='flex items-center justify-center h-screen'>
				<div className='w-[500px]  p-16 rounded-md bg-white shadow border-neutral-100'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default layout;
