import React from 'react';

const Clients = () => {
	return (
		<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
			<div className="max-w-7xl overflow-hidden mb-8">
				<div className="w-full overflow-x-auto no-scrollbar">
					<table className="w-full whitespace-nowrap">
						<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
							<tr>
								<td className="px-4 py-3">Client ID</td>
								<td className="px-4 py-3">Name</td>
								<td className="px-4 py-3">Phone</td>
								<td className="px-4 py-3">Gender</td>
								<td className="px-4 py-3">Appointments</td>
								<td className="px-4 py-3">Total Amount Paid</td>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
							{customers.map((client) => {
								const {
									id,
									customer_id,
									customer_name,
									phone,
									gender,
									total_items_ordered,
									total_amount_paid,
									customer_rating,
								} = client;
								return (
									<tr key={id} role="button" onClick={() => setShowModal(true)}>
										<td className="px-4 py-3">
											<span className="text-sm">{customer_id}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{customer_name}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{phone}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{gender}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{total_items_ordered}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">
												{formatter.format(total_amount_paid)}
											</span>
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
