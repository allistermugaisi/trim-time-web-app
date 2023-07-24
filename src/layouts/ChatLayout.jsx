import React from 'react';
import { Outlet } from 'react-router-dom';

const ChatLayout = () => {
	return (
		<main>
			<Outlet />
		</main>
	);
};

export default ChatLayout;
