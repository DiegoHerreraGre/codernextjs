import { Router } from 'express';
import cartDao from '../dao/mongoDB/cart.dao.js';
import productDao from '../dao/mongoDB/product.dao.js';

const router = Router();

router.post('/', async (req, res) => {
	try {
		const cart = await cartDao.create();

		if (!cart) {
			throw new Error('Cart creation failed: No cart data returned');
		}

		console.log('Cart created successfully:', cart);
		res.status(201).json({ status: 'success', payload: cart });
	} catch (error) {
		console.error('Error in cart creation:', error);

		let errorMessage = 'Error interno del servidor';
		let statusCode = 500;

		if (error.name === 'ValidationError') {
			errorMessage = 'Validation error: ' + error.message;
			statusCode = 400;
		} else if (error.name === 'MongoError' && error.code === 11000) {
			errorMessage = 'Duplicate key error: ' + JSON.stringify(error.keyValue);
			statusCode = 409;
		} else if (error.message.includes('Cart creation failed')) {
			errorMessage = error.message;
			statusCode = 400;
		}

		res.status(statusCode).json({
			status: 'Error',
			msg: errorMessage,
			error: process.env.NODE_ENV === 'development' ? error.stack : undefined
		});
	}
});

router.get('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartDao.getById(cid);
		if (!cart)
			return res
				.status(404)
				.json({ status: 'Error', msg: 'Carrito no encontrado' });

		res.status(200).json({ status: 'success', cart });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.post('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;

		console.log(`Attempting to add product ${pid} to cart ${cid}`);

		let cart = await cartDao.getById(cid);
		if (!cart) {
			console.log(`Cart ${cid} not found. Creating new cart.`);
			cart = await cartDao.create(cid);
		}

		const product = await productDao.getById(pid);
		if (!product) {
			console.log(`Product ${pid} not found`);
			return res.status(404).json({
				status: 'Error',
				msg: `No se encontró el producto con el id ${pid}`
			});
		}

		console.log(`Adding product ${pid} to cart ${cid}`);
		const updatedCart = await cartDao.addProductToCart(cid, pid);

		console.log(`Product added successfully. Updated cart:`, updatedCart);
		res.status(200).json({ status: 'success', payload: updatedCart });
	} catch (error) {
		console.error('Error in add to cart route:', error);
		res.status(500).json({
			status: 'Error',
			msg: 'Error interno del servidor',
			error: error.message
		});
	}
});

router.delete('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const product = await productDao.getById(pid);
		if (!product)
			return res.status(404).json({
				status: 'Error',
				msg: `No se encontró el producto con el id ${pid}`
			});
		const cart = await cartDao.getById(cid);
		if (!cart)
			return res.status(404).json({
				status: 'Error',
				msg: `No se encontró el carrito con el id ${cid}`
			});

		const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

		res.status(200).json({ status: 'success', payload: cartUpdate });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.put('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const { quantity } = req.query;

		const product = await productDao.getById(pid);
		if (!product)
			return res.status(404).json({
				status: 'Error',
				msg: `No se encontró el producto con el id ${pid}`
			});
		const cart = await cartDao.getById(cid);
		if (!cart)
			return res.status(404).json({
				status: 'Error',
				msg: `No se encontró el carrito con el id ${cid}`
			});

		const cartUpdate = await cartDao.updateQuantityProductInCart(
			cid,
			pid,
			Number(quantity)
		);

		res.status(200).json({ status: 'success', payload: cartUpdate });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

router.delete('/:cid', async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartDao.clearProductsToCart(cid);
		if (!cart)
			return res
				.status(404)
				.json({ status: 'Error', msg: 'Carrito no encontrado' });

		res.status(200).json({ status: 'success', cart });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});

export default router;
