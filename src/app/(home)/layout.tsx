import { Header, Sidebar } from "@/components/layouts";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<Header />
				<main className='flex-1 overflow-auto bg-gray-50 p-6 rounded-md'>
					{children}
				</main>
			</div>
		</div>
	);
};

export default layout;
