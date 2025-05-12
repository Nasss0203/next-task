import { Header, Sidebar } from "@/components/layouts";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='flex flex-col mx-auto container'>
			<Header></Header>
			<div className='flex h-screen'>
				<Sidebar></Sidebar>
				<div className='flex-1 h-screen'>{children}</div>
			</div>
		</div>
	);
};

export default layout;
