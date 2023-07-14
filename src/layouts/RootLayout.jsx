import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const RootLayout = () => {
	return (
		<div>
			<ScrollRestoration />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
