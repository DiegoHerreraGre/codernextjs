import React from 'react';
import Card from './components/Card';

export default function Home() {
    return (
        <>
            <section className='p-6 m-6 bg-gradient-to-r from-purple-600 to-indigo-800 border-4 border-neon-green shadow-neon rounded-2xl'>
                <h1 className='text-white text-4xl font-bold text-center text-neon-green mb-4 animate-pulse'>Bienvenido al E-Commerce Gamer</h1>
                <p className='text-xl text-center text-cyan-300'>¡Prepárate para una experiencia de compra épica! Regístrate ahora para obtener tu ID de usuario y desbloquear tu carrito de compras. ¡Que comience la aventura!</p>
            </section>
            <Card className='transform hover:scale-105 transition-transform duration-300' />
        </>
    );
}
