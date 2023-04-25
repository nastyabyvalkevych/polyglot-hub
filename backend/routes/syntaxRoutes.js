import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Syntax from '../models/syntaxModel.js';
import { isAuth, isAdmin } from '../utils.js';
import circularJSON from 'circular-json';

const syntaxRouter = express.Router();

syntaxRouter.get('/', async (req, res) => {
  const syntaxes = await Syntax.find();
  const jsonString = circularJSON.stringify(syntaxes);
  res.send(jsonString);
});

syntaxRouter.get('/slug/:slug', async (req, res) => {
  const syntax = await Syntax.findOne({ slug: req.params.slug });
  if (syntax) {
    const jsonString = circularJSON.stringify(syntax);
    res.send(jsonString);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
export default syntaxRouter;
