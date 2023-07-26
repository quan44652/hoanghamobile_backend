import Promotion from "../models/promotion";
import { object, string } from "yup";

const promotionSchema = new object({
  name: string().required(),
});

const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    if (promotions.length == 0) {
      return res.json({
        message: "Không có khuyến mãi nào !!!",
      });
    }
    return res.json(promotions);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const addPromotion = async (req, res) => {
  try {
    await promotionSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const promotion = await Promotion.create(req.body);
        if (!promotion) {
          return res.json({
            error: "Thêm khuyến mãi thất bại !!!",
          });
        }
        return res.json({
          message: "Thêm khuyễn mãi thành công !!!",
          promotion,
        });
      });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const updatePromotion = async (req, res) => {
  try {
    await promotionSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const promotion = await Promotion.updateOne(
          { _id: req.params.id },
          req.body
        );
        if (!promotion) {
          return res.json({
            error: "Sửa khuyến mãi thất bại !!!",
          });
        }
        return res.json({
          message: "Sửa khuyến mãi thành công !!!",
          promotion,
        });
      });
  } catch ({ errors }) {
    return res.json({
      error: errors,
    });
  }
};

const removePromotion = async (req, res) => {
  try {
    await Promotion.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Xóa khuyến mãi thành công !!!",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

const getPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ _id: req.params.id });
    if (!promotion) {
      return res.json({
        message: "Không có khuyễn mãi nào !!!",
      });
    }
    return res.json({
      message: "Chi tiết khuyễn mãi !!!",
      promotion,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export {
  getPromotion,
  addPromotion,
  updatePromotion,
  removePromotion,
  getPromotions,
};
