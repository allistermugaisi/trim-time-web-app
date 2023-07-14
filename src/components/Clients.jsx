import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
	const [clients, setClients] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://trim-time-api.onrender.com/users'
				);
				setClients(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
			<div className="max-w-7xl overflow-hidden mb-8">
				<div className="w-full overflow-x-auto no-scrollbar">
					<table className="w-full whitespace-nowrap">
						<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
							<tr>
								<td className="px-4 py-3">Client ID</td>
								<td className="px-4 py-3">Avatar</td>
								<td className="px-4 py-3">Name</td>
								<td className="px-4 py-3">Email address</td>
								<td className="px-4 py-3">User type</td>
								{/* <td className="px-4 py-3">Appointments</td>
								<td className="px-4 py-3">Total Amount Paid</td> */}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
							{clients?.map((client) => {
								const { id, name, profile, email, type } = client;
								return (
									<tr key={id} role="button" onClick={() => setShowModal(true)}>
										<td className="px-4 py-3">
											<span className="text-sm">{id}</span>
										</td>
										<span className="text-sm">
											<img
												className="w-10 h-10 rounded-full"
												src={profile}
												alt="Rounded avatar"
											/>
										</span>
										<td className="px-4 py-3">
											<span className="text-sm">{name}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{email}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{type}</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
					<div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
						<span className="flex items-center font-semibold tracking-wide uppercase">
							Showing 1-5 of 25
						</span>
						<div className="flex mt-2 sm:mt-auto sm:justify-end"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Clients;

const customers = [
	{
		id: 0,
		customer_id: '092EUHDA23',
		customer_name: 'Allister Mugaisi',
		phone: 790516067,
		gender: 'Male',
		total_items_ordered: 76,
		total_amount_paid: 12999,
		customer_rating: 3.75,
	},
];

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
