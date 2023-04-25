import mongoose from 'mongoose';

const syntaxSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    syntaxName: [String],
    codeExamples: { type: String, required: true },
    libraries: { type: String, required: true },
    frameworks: { type: String, required: true },
    articles: { type: String, required: true },
    news: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Syntax = mongoose.model('Syntax', syntaxSchema);
export default Syntax;
