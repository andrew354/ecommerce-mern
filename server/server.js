import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import data from './data.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
dotenv.config();

const app = express();

// middleware for parsing json data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
	res.send('Server is ready');
});

// app.get('/api/products', (req, res) => {
// 	res.send(data.products);
// });

// app.get('/api/products/:id', (req, res) => {
// 	const productId = req.params.id;
// 	const product = data.products.find((product) => product._id === productId);
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({ message: 'Product not found' });
// 	}
// });

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// middleware error Catcher: when an error in router throw message error linked to ExpressAsyncHandler
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
