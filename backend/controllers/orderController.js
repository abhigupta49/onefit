const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { user, cartItems, totalAmount, paymentMethod } = req.body;

    const newOrder = new Order({
      user,
      cartItems,
      totalAmount,
      paymentMethod,
    });

    await newOrder.save();

    res.send({
      status: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    // Fetching orders for the user
    const orders = await Order.aggregate([
      {
        $match: {
          "user._id": userId, // Match the user ID in the orders
        },
      },
      {
        $lookup: {
          from: "users", // Lookup from the users collection
          localField: "user._id", // Match the user ID from the order
          foreignField: "_id", // Foreign key from the users collection
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind to get user details directly
      },
      {
        $project: {
          "userDetails.password": 0, // Optionally exclude sensitive fields like password
          "userDetails.__v": 0,
        },
      },
    ]);

    if (orders.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No orders found for this user.",
      });
    }

    res.send({
      status: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).send({
        status: false,
        message: "Order not found",
      });
    }

    res.send({
      status: true,
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  deleteOrder,
};
