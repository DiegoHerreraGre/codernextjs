import express from 'express';
import __dirname from './dirname.js';
import { connectMongoDB } from './config/mongoDB.config.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || undefined;

connectMongoDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(express.static('public')); */
app.use(cookieParser());
app.use('/api', router);

app.get('/', (req, res) => {
	res.status(200).send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
