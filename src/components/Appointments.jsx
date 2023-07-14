import React from 'react';

const Appointments = () => {
	return (
		<>
			<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
				<div className="max-w-7xl overflow-hidden mb-8">
					<div className="w-full overflow-x-auto no-scrollbar">
						<table className="w-full whitespace-nowrap">
							<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
								<tr>
									<td className="px-4 py-3">Booking ID</td>
									<td className="px-4 py-3">Customer Name</td>
									<td className="px-4 py-3">Email address</td>
									<td className="px-4 py-3">Barber Name</td>
									<td className="px-4 py-3">Amount Paid</td>
									<td className="px-4 py-3">Location</td>
									<td className="px-4 py-3">Date</td>
									<td className="px-4 py-3">Status</td>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
								{appointments.map((client) => {
									const {
										id,
										customer_id,
										customer_name,
										email,
										barber_name,
										price,
										location,
										date,
										status,
									} = client;

									return (
										<tr
											key={id}
											role="button"
											onClick={() => setShowModal(true)}
										>
											<td className="px-4 py-3">
												<span className="text-sm">{customer_id}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{customer_name}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{email}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{barber_name}</span>
											</td>

											<td className="px-4 py-3">
												<span className="text-sm">
													{formatter.format(price)}
												</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{location}</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-sm">{date}</span>
											</td>
											<td className="px-4 py-3">
												<span
													className={
														status === 'Scheduled'
															? 'text-sm text-green-500'
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
			{/* <div className="flex justify-center mt-32">
			<h3>Appointments</h3>
		</div> */}
		</>
	);
};

export default Appointments;

const appointments = [
	{
		id: 0,
		customer_id: '092EUHDA23',
		customer_name: 'Allister Mugaisi',
		email: 'allistermugaisi@example.com',
		barber_name: 'Keith Miller',
		price: 17100,
		location: 'Mombasa, Kenya',
		date: 'Friday, 14 July 2023',
		status: 'Scheduled', // Waiting, Scheduled
	},
];

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
