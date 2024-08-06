'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [cartId, setCartId] = useState(null);
	const [userId, setUserId] = useState(null);
	const [error, setError] = useState(null);
	const [quantities, setQuantities] = useState({});
	const [userDetails, setUserDetails] = useState({
		complete_name: '',
		email: '',
		age: ''
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const productsResponse = await fetch(
					'http://localhost:8080/api/products'
				);
				if (!productsResponse.ok) {
					throw new Error('Failed to fetch products');
				}
				const productsData = await productsResponse.json();
				const productList =
					productsData.products?.docs || productsData.docs || [];
				setProducts(productList);

				const initialQuantities = {};
				productList.forEach((product) => {
					initialQuantities[product._id] = 1;
				});
				setQuantities(initialQuantities);
			} catch (e) {
				console.error('Error fetching data:', e);
				setError(e.message);
			}
		}

		fetchData();
	}, []);

	const handleQuantityChange = (productId, newQuantity) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[productId]: Math.max(1, parseInt(newQuantity) || 1)
		}));
	};

	const handleUserDetailChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value
		});
	};

	const handleRegisterUser = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const queryParams = new URLSearchParams({
				complete_name: userDetails.complete_name,
				email: userDetails.email,
				age: userDetails.age
			}).toString();

			const response = await fetch(
				`http://localhost:8080/api/users/register?${queryParams}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.msg || 'Failed to register user');
			}

			if (!data.user || !data.user._id) {
				throw new Error('User creation failed: No user data received');
			}

			setUserId(data.user._id);
			console.log('User registered successfully:', data.user);

			// Create a cart for the new user
			const cartResponse = await fetch('http://localhost:8080/api/carts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userId: data.user._id })
			});

			if (!cartResponse.ok) {
				const cartData = await cartResponse.json();
				throw new Error(cartData.msg || 'Failed to create cart');
			}

			const cartData = await cartResponse.json();
			setCartId(cartData.payload._id);

			alert('User registered and cart created successfully!');
		} catch (error) {
			console.error('Error registering user:', error);
			setError(error.message);
		}
	};

	const handleAddToCart = async (productId) => {
		if (!cartId) {
			setError('No cart available. Please register first.');
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8080/api/carts/${cartId}/product/${productId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.msg || 'Failed to add product to cart');
			}

			const data = await response.json();
			console.log('Product added to cart:', data);
			alert('Product added to cart successfully!');
		} catch (error) {
			console.error('Error adding product to cart:', error);
			setError(error.message);
		}
	};

	return (
		<div className='container px-4 mx-auto'>
			<h1 className='my-8 text-3xl font-bold'>Product List</h1>
			{error && (
				<div className='p-4 mb-4 text-red-700 bg-red-100 rounded-lg'>
					{error}
				</div>
			)}
			{!userId && (
				<form onSubmit={handleRegisterUser} className='mb-8 space-y-4'>
					<div>
						<label htmlFor='complete_name' className='block mb-2'>
							Complete Name:
						</label>
						<input
							type='text'
							id='complete_name'
							name='complete_name'
							value={userDetails.complete_name}
							onChange={handleUserDetailChange}
							required
							className='w-full px-3 py-2 text-black border rounded'
						/>
					</div>
					<div>
						<label htmlFor='email' className='block mb-2'>
							Email:
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={userDetails.email}
							onChange={handleUserDetailChange}
							required
							className='w-full px-3 py-2 text-black border rounded'
						/>
					</div>
					<div>
						<label htmlFor='age' className='block mb-2'>
							Age:
						</label>
						<input
							type='number'
							id='age'
							name='age'
							value={userDetails.age}
							onChange={handleUserDetailChange}
							className='w-full px-3 py-2 text-black border rounded'
						/>
					</div>
					<button
						type='submit'
						className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600'
					>
						Register and Create Cart
					</button>
				</form>
			)}
			{userId && <p>User ID: {userId}</p>}
			{cartId && <p>Cart ID: {cartId}</p>}
			{products.length === 0 ? (
				<p>Loading products...</p>
			) : (
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{products.map((product) => (
						<div key={product._id} className='p-4 border rounded-lg shadow-md'>
							<h2 className='mb-2 text-xl font-semibold'>{product.title}</h2>
							<p className='mb-2 text-gray-600'>{product.description}</p>
							<p className='mb-4 text-lg font-bold'>
								${product.price.toFixed(2)}
							</p>
							<div className='flex items-center mb-4'>
								<label htmlFor={`quantity-${product._id}`} className='mr-2'>
									Quantity:
								</label>
								<input
									type='number'
									id={`quantity-${product._id}`}
									value={quantities[product._id]}
									onChange={(e) =>
										handleQuantityChange(product._id, e.target.value)
									}
									className='w-16 px-2 py-1 text-black border rounded'
									min='1'
								/>
							</div>
							<div className='flex justify-between'>
								<button
									onClick={() => handleAddToCart(product._id)}
									className='px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600'
									disabled={!cartId}
								>
									Agregar al carro
								</button>
								<Link href={`/pages/products/${product._id}`} passHref>
									<button className='px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600'>
										Ver Detalles
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
