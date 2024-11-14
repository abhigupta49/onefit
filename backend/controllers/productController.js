const Product = require("../models/productModel");

const Category = require("../models/categoryModel"); // Ensure correct path
const Color = require("../models/colorModel");
const getProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories", // Collection name for Category
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo", // Unwind to include category object directly
      },
      {
        $lookup: {
          from: "colors", // Collection name for Color
          localField: "variants.color",
          foreignField: "_id",
          as: "colorDetails",
        },
      },
      {
        $addFields: {
          variants: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $mergeObjects: [
                  "$$variant",
                  {
                    color: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$colorDetails",
                            cond: { $eq: ["$$this._id", "$$variant.color"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          "categoryInfo._id": 0, // Optional: Exclude unnecessary fields from category
          "categoryInfo.createdAt": 0,
          "categoryInfo.updatedAt": 0,
          "categoryInfo.__v": 0,
          "variants.color.createdAt": 0,
          "variants.color.updatedAt": 0,
          "variants.color.__v": 0,
          colorDetails: 0, // Exclude colorDetails from the final output
        },
      },
    ]);

    res.send({
      status: true,
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Get Single Product API
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category variants.color"
    );
    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }
    res.send({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send({
      status: true,
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Edit product
// Edit product function
const editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("category")
      .populate("variants.color");

    if (!updatedProduct) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }
    res.send({
      status: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }
    res.send({
      status: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }

    // Toggle the availability status
    product.available = !product.available;
    const updatedProduct = await product.save();

    res.send({
      status: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Toggle Latest Product
const toggleLatest = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }

    // Toggle the latest status
    product.isLatest = !product.isLatest;
    const updatedProduct = await product.save();

    res.send({
      status: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Toggle Featured Product
const toggleFeatured = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product not found",
      });
    }

    // Toggle the featured status
    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    res.send({
      status: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

// Get Featured Products
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.aggregate([
      { $match: { isFeatured: true } }, // Match featured products only
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $lookup: {
          from: "colors",
          localField: "variants.color",
          foreignField: "_id",
          as: "colorDetails",
        },
      },
      {
        $addFields: {
          variants: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $mergeObjects: [
                  "$$variant",
                  {
                    color: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$colorDetails",
                            cond: { $eq: ["$$this._id", "$$variant.color"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          "categoryInfo._id": 0,
          "categoryInfo.createdAt": 0,
          "categoryInfo.updatedAt": 0,
          "categoryInfo.__v": 0,
          "variants.color._id": 0,
          "variants.color.createdAt": 0,
          "variants.color.updatedAt": 0,
          "variants.color.__v": 0,
          colorDetails: 0,
        },
      },
    ]);

    res.send({
      status: true,
      data: featuredProducts,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

// Get Latest Products
const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await Product.aggregate([
      { $match: { isLatest: true } }, // Match latest products only
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $lookup: {
          from: "colors",
          localField: "variants.color",
          foreignField: "_id",
          as: "colorDetails",
        },
      },
      {
        $addFields: {
          variants: {
            $map: {
              input: "$variants",
              as: "variant",
              in: {
                $mergeObjects: [
                  "$$variant",
                  {
                    color: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$colorDetails",
                            cond: { $eq: ["$$this._id", "$$variant.color"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          "categoryInfo._id": 0,
          "categoryInfo.createdAt": 0,
          "categoryInfo.updatedAt": 0,
          "categoryInfo.__v": 0,
          "variants.color._id": 0,
          "variants.color.createdAt": 0,
          "variants.color.updatedAt": 0,
          "variants.color.__v": 0,
          colorDetails: 0,
        },
      },
    ]);

    res.send({
      status: true,
      data: latestProducts,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  toggleAvailability,
  toggleLatest,
  toggleFeatured,
  getFeaturedProducts,
  getLatestProducts,
};
