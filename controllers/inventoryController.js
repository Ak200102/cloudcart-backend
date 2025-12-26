import productModel from "../Models/productModel.js";

const LOW_STOCK_LIMIT = 10;

export const getInventoryStats = async (req, res) => {
  try {
    const products = await productModel.find();

    const totalProducts = products.length;

    const outOfStock = products.filter(p => p.stock === 0).length;
    const lowStock = products.filter(
      p => p.stock > 0 && p.stock <= LOW_STOCK_LIMIT
    ).length;
    const inStock = products.filter(p => p.stock > LOW_STOCK_LIMIT).length;

    const lowStockItems = products.filter(
      p => p.stock > 0 && p.stock <= LOW_STOCK_LIMIT
    );

    res.json({
      success: true,
      stats: {
        totalProducts,
        lowStock,
        outOfStock,
        inStock,
      },
      lowStockItems,
    });
  } catch (error) {
    console.error("Inventory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load inventory",
    });
  }
};

export default getInventoryStats;