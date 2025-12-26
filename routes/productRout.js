import { Router } from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updateStock,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import getInventoryStats from "../controllers/inventoryController.js";

const router = Router();

const routeValue = "/product/";

// Admin routes for product management
router.post(
  `${routeValue}add`,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  addProduct
);
router.post(`${routeValue}remove`, adminAuth, removeProduct);
router.put(
  `${routeValue}update/:id`,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  updateProduct
);
router.post(`${routeValue}update-stock`, updateStock);
router.get(
  `${routeValue}inventory`,
  adminAuth,
  getInventoryStats
);
router.get(`${routeValue}single`, singleProduct);
router.get(`${routeValue}list`, listProduct);

// Public routes for frontend
// Public routes for frontend
router.get("/products", listProduct);

router.get("/products/:type", (req, res, next) => {
  req.query._type = req.params.type;
  listProduct(req, res, next);
});


export default router;