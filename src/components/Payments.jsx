import React from 'react';

const Payments = () => {
	return (
		<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
			<div className="max-w-7xl overflow-hidden mb-8">
				<div className="w-full overflow-x-auto no-scrollbar">
					<table className="w-full whitespace-nowrap">
						<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
							<tr>
								<td className="px-4 py-3">Transaction ID</td>
								<td className="px-4 py-3">Customer Name</td>
								<td className="px-4 py-3">Phone</td>
								<td className="px-4 py-3">Barber Name</td>
								<td className="px-4 py-3">Type of Service</td>
								<td className="px-4 py-3">Total Amount Paid</td>
								<td className="px-4 py-3">Date</td>
								<td className="px-4 py-3">Status</td>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
							{payments.map((client) => {
								const {
									id,
									transaction_id,
									customer_name,
									phone,
									barber_name,
									type_of_service,
									total_amount_paid,
									date,
									status,
								} = client;

								return (
									<tr key={id} role="button" onClick={() => setShowModal(true)}>
										<td className="px-4 py-3">
											<span className="text-sm">{transaction_id}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{customer_name}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{phone}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{barber_name}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{type_of_service[0]}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">
												{formatter.format(total_amount_paid)}
											</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{date}</span>
										</td>
										<td className="px-4 py-3">
											<span
												className={
													status === 'Paid'
														? 'text-sm text-green-500'
														: status === 'Refund'
														? 'text-sm text-gray-500'
														: 'text-sm text-red-500'
												}
											>
												{status}
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

export default Payments;

const payments = [
	{
		id: 0,
		transaction_id: '092EUHDA23',
		customer_name: 'John Doe',
		phone: 720817069,
		barber_name: 'Shawn Sims',
		type_of_service: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
		total_amount_paid: 18500,
		date: 'Friday, 14 July 2023',
		status: 'Paid', // Paid, Refund, Unpaid
	},
];

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
