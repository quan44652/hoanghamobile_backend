import Cart from "../models/cart";
import Product from "../models/product";
import { object, string, number, array } from "yup";

const cartSchem = new object({
  userId: string().required(),
  productId: string().required(),
  quantity: number().min(1).required(),
});

const getAllToCart = async (req, res) => {
  try {
    const cartList = await Cart.find()
      .populate("userId")
      .populate("productId")
      .populate("userId");
    if (cartList.length == 0) {
      return res.json({
        message: "Không có sản phẩm nào !!!",
      });
    }
    return res.json(cartList);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    await cartSchem.validate(req.body, { abortEarly: false });
    const { userId, productId, quantity } = req.body;
    const existingCartItem = await Cart.findOne({
      userId: userId,
      productId: productId,
    });
    if (existingCartItem) {
      const cartItem = await Cart.updateOne(
        { _id: existingCartItem._id },
        { $set: { quantity: (existingCartItem.quantity += quantity) } }
      );
      return res.json({
        message: "Thêm vào giỏ thành công",
        cartItem,
      });
    }
    const cartItem = await Cart.create(req.body);

    return res.json({
      message: "Thêm vào giỏ thành công",
      cartItem,
    });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const removeToCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    return res.json({
      cartItem,
      message: "Xóa sản phẩm thành công!!!",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export { addToCart, getAllToCart, removeToCart };
