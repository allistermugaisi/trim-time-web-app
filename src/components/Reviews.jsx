import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
	const [currentUser, setCurrentUser] = useState([]);
	const [reviews, setReviews] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let email = sessionStorage.getItem('email');
		let user_type = sessionStorage.getItem('user_type');

		if (email === '' || email === null) {
			navigate('/auth/login');
		}

		if (user_type === 'barber') {
			fetch(`https://trim-time-api.onrender.com/barbers?email=${email}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					setCurrentUser(res[0]);
				})
				.catch((error) => {
					toast.error('Failed to fetch current user' + error.response.message);
				});
		} else {
			fetch(`https://trim-time-api.onrender.com/users?email=${email}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					setCurrentUser(res[0]);
				})
				.catch((error) => {
					toast.error('Failed to fetch current user' + error.response.message);
				});
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (currentUser.type === 'owner') {
					const response = await axios.get(
						'https://trim-time-api.onrender.com/reviews'
					);
					setReviews(response.data);
					setLoading(false);
				} else if (currentUser.type === 'client') {
					const response = await axios.get(
						`https://trim-time-api.onrender.com/reviews?client.email=${currentUser.email}`
					);
					setReviews(response.data);
					setLoading(false);
				} else {
					const response = await axios.get(
						`https://trim-time-api.onrender.com/reviews?barber.id=${currentUser.id}`
					);
					setReviews(response.data);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [currentUser]);

	return (
		<>
			{reviews?.length > 0 ? (
				<div className="flex justify-center mt-8 overflow-hidden overflow-y-scroll">
					<div className="max-w-7xl overflow-hidden mb-8">
						<div className="w-full overflow-x-auto no-scrollbar">
							<table className="w-full whitespace-nowrap">
								<thead className="text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100">
									<tr>
										<td className="px-4 py-3">Rating ID</td>
										<td className="px-4 py-3">Customer Name</td>
										<td className="px-4 py-3">Barber Name</td>
										<td className="px-4 py-3">Rating</td>
										<td className="px-4 py-3">Message</td>
										<td className="px-4 py-3">Date</td>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-100 text-gray-700">
									{reviews?.map((review) => {
										const { id, rating, message, client, barber, date } =
											review;

										return (
											<tr
												key={id}
												role="button"
												onClick={() => setShowModal(true)}
											>
												<td className="px-4 py-3">
													<span className="text-sm">{id}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{client?.name}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{barber?.name}</span>
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
													<span className="text-sm">{message}</span>
												</td>
												<td className="px-4 py-3">
													<span className="text-sm">{date}</span>
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
			) : (
				<div className="flex justify-center mt-32">
					<h3>You have no reviews</h3>
				</div>
			)}
		</>
	);
};

export default Reviews;
