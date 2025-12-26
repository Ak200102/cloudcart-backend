import { Router } from "express";
import {
  getDashboardStats,
  getAnalytics,
  getQuickStats,
} from "../controllers/dashboardController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = Router();

const routeValue = "/dashboard/";

// Admin dashboard routes
router.get(`${routeValue}stats`, adminAuth, getDashboardStats);
router.get(`${routeValue}analytics`, adminAuth, getAnalytics);
router.get(`${routeValue}quick-stats`, adminAuth, getQuickStats);

export default router;