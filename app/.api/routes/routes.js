import { Router } from 'express';
import products from './products.routes.js';
import carts from './carts.routes.js';
import users from './user.routes.js';
import bodyParser from 'body-parser';
const router = Router();

router.use(bodyParser.json());
router.use('/products', products);
router.use('/carts', carts);
router.use('/users', users);
router.get('*', async (req, res) => {
	try {
		res.status(404).json({ status: 'error', msg: 'Route not found' });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ status: 'Error', msg: 'Error interno del servidor' });
	}
});
export default router;
