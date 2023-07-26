import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routerProduct from "./routers/product";
import routerCategory from "./routers/category";
import routerPromotion from "./routers/promotion";
import routerAuth from "./routers/auth";
import routerCart from "./routers/cart";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/hoanghamobile");
app.use("/api", routerProduct);
app.use("/api", routerCategory);
app.use("/api", routerPromotion);
app.use("/api", routerAuth);
app.use("/api", routerCart);

export const viteNodeApp = app;
