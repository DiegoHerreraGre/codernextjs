'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const categories = ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Libros'];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleCategoryClick = category => {
		// Aquí enviamos la solicitud con la categoría en el cuerpo
		fetch('/api/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ category: category })
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				// Aquí puedes manejar la respuesta, por ejemplo, navegar a una nueva página o actualizar el estado
			})
			.catch(error => {
				console.error('Error:', error);
			});

		setIsOpen(false);
	};

	return (
		<nav className="p-4 bg-gray-800">
			<div className="container flex items-center justify-between mx-auto">
				<Link href="/" className="text-xl font-bold text-white">
					Inicio
				</Link>
				<div className="relative">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center text-white"
					>
						Categorías <ChevronDown className="ml-1" />
					</button>
					{isOpen &&
						<div className="absolute right-0 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
							{categories.map((category, index) =>
								<button
									key={index}
									onClick={() => handleCategoryClick(category)}
									className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
								>
									{category}
								</button>
							)}
						</div>}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
