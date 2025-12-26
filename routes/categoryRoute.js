import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const categoryRouter = express.Router();

const routeValue = "/category";

// Public routes
categoryRouter.get(`${routeValue}`, getCategories);
categoryRouter.get(`${routeValue}/:id`, getCategory);

// Admin only routes
categoryRouter.post(
  `${routeValue}`,
  adminAuth,
  upload.single("image"),
  createCategory
);
categoryRouter.put(
  `${routeValue}/:id`,
  adminAuth,
  upload.single("image"),
  updateCategory
);
categoryRouter.delete(`${routeValue}/:id`, adminAuth, deleteCategory);

export default categoryRouter;