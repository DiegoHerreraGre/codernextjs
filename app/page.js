import React from 'react';
import Card from './components/Card';

export default function Home() {
  return (
    <>
       <section className='p-4 m-4 border-2 border-black shadow-md rounded-xl dark:border-white'>
          <p className='text-3xl text-center text-black dark:text-white'>Bienvenido al e-commerce de mentira</p>
          <p className='text-lg text-center text-black dark:text-white'>Esto funciona con MongoDB, por favor debe registrarse para hacer válido un ID de usuario y de carro para poder crear un carro de compra y que funcione la app.</p>
        </section>
         <Card />
    </>
  );
}
