import Product from "../models/product";
import Category from "../models/category";
import Promotion from "../models/promotion";
import { object, string, number, array } from "yup";

const productSchema = new object({
  sticker: string(),
  name: string().required(),
  priceNew: number().min(1000).required(),
  priceOld: number(),
  image: string().required(),
  promotionId: array(),
  categoryId: string().required(),
});

const getProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate("promotionId");
    const {
      _sort = "createdAt",
      _order = "asc",
      _page = 1,
      _limit = 10,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? 1 : -1,
      },
      populate: ["promotionId"],
    };

    const products = await Product.paginate({}, options);
    if (products.length === 0) {
      return res.json({
        message: "No products!!!",
      });
    }
    return res.json(products.docs);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productDetail = await Product.findOne({ _id: req.params.id });
    const productList = await Product.findById(productDetail._id).populate(
      "promotionId"
    );
    // .populate("categoryId")
    if (!productList) {
      return res.json({
        message: "No product!!!",
      });
    }
    return res.json(productList);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    await productSchema.validate(req.body, { abortEarly: false });
    const product = await Product.create(req.body);
    // const populateProduct = await Product.findById(product._id).populate(
    //   "category_id"
    // );

    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    if (!product) {
      return res.json({
        error: "Create failed products !!!",
      });
    }
    return res.json({
      // message: "Create successfully products !!!",
      product,
    });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    await productSchema.validate(req.body, { abortEarly: false });
    const product = await Product.updateOne({ _id: req.params.id }, req.body);
    if (!product) {
      return res.json({
        error: "Update failed products !!!",
      });
    }
    return res.json({
      message: "Update successfully products !!!",
      product,
    });
  } catch ({ errors }) {
    return res.json({
      errors: errors,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    // await Product.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Delete successfully product !!!",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export { getProducts, getProduct, addProduct, updateProduct, removeProduct };
