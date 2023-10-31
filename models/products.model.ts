import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  averageQuantity: string;
  quantity: number;
  price: number;
  distribution: string;
  made: string;
  category: string;
}

interface ProductModel extends mongoose.Model<ProductDocument> {}

const productSchema = new mongoose.Schema<ProductDocument, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageQuantity: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  distribution: {
    type: String,
    required: true,
  },
  made: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const ProductModel = mongoose.model("Products", productSchema);
