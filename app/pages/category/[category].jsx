'use client';

import { useState, useEffect } from 'react';

export default function CategoryPage() {
	const [category, setCategory] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Suscribirse a los eventos del servidor
		const eventSource = new EventSource('/api/category-events');

		eventSource.onmessage = event => {
			const data = JSON.parse(event.data);
			if (data.category) {
				setCategory(data.category);
			}
		};

		return () => {
			eventSource.close();
		};
	}, []);

	useEffect(
		() => {
			if (category) {
				const fetchProducts = async () => {
					try {
						setLoading(true);
						const response = await fetch(
							`http://localhost:8080/api/products?category=${category}`
						);
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						const data = await response.json();
						setProducts(data);
					} catch (error) {
						console.error('Error fetching products:', error);
						setError('Failed to load products. Please try again later.');
					} finally {
						setLoading(false);
					}
				};

				fetchProducts();
			}
		},
		[category]
	);

	if (loading) return <div>Loading...</div>;
	if (error)
		return (
			<div>
				{error}
			</div>
		);
	if (!category) return <div>Please select a category</div>;

	return (
		<div>
			<h1>
				Productos en la categoría: {category}
			</h1>
			{products.map(product =>
				<div key={product._id}>
					<h2>
						{product.title}
					</h2>
					<p>
						{product.description}
					</p>
					<p>
						Precio: ${product.price}
					</p>
				</div>
			)}
		</div>
	);
}
