import Category from "../models/category";
import Product from "../models/product";
import { object, string } from "yup";

const categorySchema = new object({
  name: string().required(),
  image: string().required(),
});

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length == 0) {
      return res.json({
        error: "Không có danh mục nào !!!",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    await categorySchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const category = await Category.create(req.body);
        if (!category) {
          return res.json({
            error: "Thêm danh mục thất bại !!!",
          });
        }
        return res.json({
          message: "Thêm danh mục thành công !!!",
          category,
        });
      });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    await categorySchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const category = await Category.updateOne(
          { _id: req.params.id },
          req.body
        );
        if (!category) {
          return res.json({
            error: "Sửa danh mục thất bại !!!",
          });
        }
        return res.json({
          message: "Sửa danh mục thành công !!!",
          category,
        });
      });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Xóa danh mục thành công !!!",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    const products = await Product.find({ categoryId: req.params.id })
      .populate("categoryId")
      .populate("promotionId");
    // if (!category) {
    //   return res.json({
    //     message: "Không có sản phẩm nào !!!",
    //   });
    // }
    return res.json(products);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    return res.json(category);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export {
  getCategories,
  addCategory,
  updateCategory,
  removeCategory,
  getCategory,
  getCategoryById,
};
