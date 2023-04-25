import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    category: { type: String, required: true },
    developers: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: String, required: true },
    pros: [String],
    cons: [String],
    purpose: {
      type: String,
      required: true,
    },
    versions: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true },
    syntax: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Syntax',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
