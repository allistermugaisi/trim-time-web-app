import React, { useState } from 'react';

const Barbers = () => {
	const [rating, setRating] = useState(0);

	return (
		<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
			<div className="max-w-7xl overflow-hidden mb-8">
				<div className="w-full overflow-x-auto no-scrollbar">
					<table className="w-full whitespace-nowrap">
						<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
							<tr>
								<td className="px-4 py-3">Barber ID</td>
								<td className="px-4 py-3">Avatar</td>
								<td className="px-4 py-3">Name</td>
								<td className="px-4 py-3">Clients</td>
								<td className="px-4 py-3">Location</td>
								<td className="px-4 py-3">Charges</td>
								<td className="px-4 py-3">Customer Rating</td>
								<td className="px-4 py-3">Experience</td>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
							{barbers.map((client) => {
								const {
									id,
									name,
									imageUrl,
									price,
									location,
									experience,
									rating,
									clients,
									services,
								} = client;

								return (
									<tr key={id} role="button" onClick={() => setShowModal(true)}>
										<td className="px-4 py-3">
											<span className="text-sm">{id}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">
												<img
													className="w-10 h-10 rounded-full"
													src={imageUrl}
													alt="Rounded avatar"
												/>
											</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{name}</span>
										</td>

										<td className="px-4 py-3">
											<span className="text-sm">{clients}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{location}</span>
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">{formatter.format(price)}</span>
										</td>
										<td className="px-4 py-3">
											{[...Array(5)].map((star, index) => {
												index += 1;
												return (
													<button
														type="button"
														key={index}
														className={
															index <= rating
																? 'text-orange-600'
																: 'text-gray-300'
														}
														onClick={() => setRating(index)}
													>
														<span className="star text-cxs">&#9733;</span>
													</button>
												);
											})}
										</td>
										<td className="px-4 py-3">
											<span className="text-sm">
												{experience === 1
													? `${experience}yr`
													: `${experience}yrs`}
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

export default Barbers;

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

const barbers = [
	{
		id: 1,
		name: 'Scott Logan',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233942/trim-time/Low-fade-haircut-with-full-beard-gray-abbas_ahmadifard_yth3fp.jpg',
		price: 20000,
		location: 'Nairobi, Kenya',
		experience: 4,
		rating: 4.5,
		clients: 372,
		services: ["Men's haircut", 'Hairstyling', 'Razor shave', 'Head camo'],
	},
	{
		id: 2,
		name: 'Keith Miller',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233938/trim-time/beard-with-mid-fade_tfi0cq.jpg',
		price: 17100,
		location: 'Mombasa, Kenya',
		experience: 2,
		rating: 4.5,
		clients: 301,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 3,
		name: 'Shawn Sims',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233940/trim-time/full-beard-and-undercut-fade_c2e1ed.jpg',
		price: 18500,
		location: 'Kiambu, Kenya',
		experience: 3,
		rating: 4.8,
		clients: 251,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 4,
		name: 'Marcus Tyler',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/long-messy-top-with-a-faded-beard-for-men_zijrhs.jpg',
		price: 16000,
		location: 'Machakos, Kenya',
		experience: 1,
		rating: 4.2,
		clients: 189,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 5,
		name: 'Eric Cross',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689233937/trim-time/7374005ebb2fb14f77171024529dc17e_xm6xht.jpg',
		price: 15215,
		location: 'Kisumu, Kenya',
		experience: 2,
		rating: 5,
		clients: 64,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 6,
		name: 'Virginia Clarke',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234043/trim-time/modern-hairstyles-1x1-1_csrdvn.jpg',
		price: 13005,
		location: 'Kericho, Kenya',
		experience: 7,
		rating: 4.6,
		clients: 59,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 7,
		name: 'Jane Nguma',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234045/trim-time/short-hairstyles-for-women-over-50_r566fd.jpg',
		price: 14200,
		location: 'Nyali, Kenya',
		experience: 5,
		rating: 4.3,
		clients: 86,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 8,
		name: 'Mercy Njebiu',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234044/trim-time/2-feminine-blonde-short-haircut-with-skin-fade_m2ebp4.jpg',
		price: 12300,
		location: 'Ngong, Kenya',
		experience: 8,
		rating: 4.4,
		clients: 71,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 9,
		name: 'Nancy Akinyi',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234044/trim-time/hottest-short-haircuts-women-spiked-pixie-undercut_x8b5lp.jpg',
		price: 11000,
		location: 'Eldoret, Kenya',
		experience: 3,
		rating: 4.1,
		clients: 63,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
	{
		id: 10,
		name: 'Julia Wambui',
		imageUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1689234043/trim-time/woman-with-short-haircut-and-shaved-side_f0yssz.jpg',
		price: 14150,
		location: 'Nyandarua, Kenya',
		experience: 6,
		rating: 4.9,
		clients: 77,
		services: [
			"Men's haircut",
			'Hairstyling',
			'Razor shave',
			'Head camo',
			`Hair + beard haircut`,
		],
	},
];

const formatter = new Intl.NumberFormat('en-KE', {
	style: 'currency',
	currency: 'KES',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
