import { useEffect, useState } from "react";
import Helpers from "../Helper/Helpers";
import { useCart } from "../context/CartContext";
import { Typography } from "@mui/material";

export default function OrderPage() {
  // const { userDetails } = useCart();
  const { allOrder, getAllOrder } = useCart();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allOrder?.length > 0 ? (
          allOrder?.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border"
            >
              {/* Card Header */}
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Order ID: {order?._id}</h2>
                <div className="mt-2 flex gap-2">
                  <button
                    className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
                    aria-label="View Invoice"
                  >
                    Invoice
                  </button>
                  <button
                    className="px-4 py-2 border rounded text-sm text-white bg-blue-600 hover:bg-blue-500"
                    aria-label="Track Order"
                  >
                    Track order
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Estimated Delivery */}
                <span className="inline-block mb-4 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                  Estimated delivery: May 14, 2022
                </span>

                {/* Product List */}
                <div className="space-y-4">
                  {order?.cartItems?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center border-b pb-2 gap-4"
                    >
                      {/* Square Image */}
                      <img
                        src={item?.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-sm text-gray-500">
                          Color - {item?.color} • Size - {item?.size}
                        </p>
                      </div>
                      {/* Pricing and Quantity */}
                      <div className="text-right">
                        <p className="font-medium">{item.price}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Price */}
                <div className="mt-4 text-right">
                  <p className="font-medium">Total: {order?.totalAmount}</p>
                </div>

                {/* Separator */}
                <hr className="my-6 border-t border-gray-300" />

                {/* Payment and Delivery Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-wrap justify-between gap-4">
                    {/* Left Section: Payment Details */}
                    <div>
                      <h3 className="font-medium mb-2">Payment</h3>
                      <p className="text-sm">
                        {order?.paymentMethod === "cash"
                          ? "Cash on Delivery"
                          : "Completed"}
                      </p>
                    </div>

                    {/* Right Section: Returns Policy */}
                    <div className="ml-auto text-right">
                      <h3 className="font-medium mb-2">Returns Policy</h3>
                      <p className="text-sm">7 days return</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Delivery</h3>
                    <p className="text-sm">
                      {order?.user?.name} ({order?.user?.email})
                    </p>
                    <p className="text-sm">
                      {order?.user?.address},{order?.user?.state} ,
                      {order?.user?.city} - {order?.user?.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography
            style={{ marginTop: " 84px" }}
            variant="h6"
            color="text.secondary"
          >
            Your order is empty
          </Typography>
        )}
      </div>
    </div>
  );
}
