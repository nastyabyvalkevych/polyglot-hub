import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import Syntax from '../models/syntaxModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  await Syntax.remove({});
  const createdSyntaxes = await Syntax.insertMany(data.syntaxes);
  res.send({ createdProducts, createdUsers, createdSyntaxes });
});
export default seedRouter;
