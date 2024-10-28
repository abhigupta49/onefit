import React, { useEffect, useState } from "react";

import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  Quote,
  Code,
  List,
} from "lucide-react";

import Helpers from "../Helper/Helpers";
import Select from "react-select";
const initialVariants = [
  {
    id: 1,
    size: "S",
    color: "White",
    price: 4500.0,
    quantity: 10,
    image:
      "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40",
  },
];
function AddProduct() {
  const [allCategory, setAllCategory] = useState([]);
  const [colorOptions, setAllColor] = useState([]);
  const [cateogory, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDisc, setProductDesc] = useState("");
  const [variants, setVariants] = useState(initialVariants);
  useEffect(() => {
    FetchAllCategoryValue();
    FetchAllColor();
  }, []);

  const FetchAllCategoryValue = async () => {
    try {
      const res = await Helpers("/category/get", "GET", null, {});
      if (res && res?.status) {
        setAllCategory(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchAllColor = async () => {
    try {
      const res = await Helpers("/color/get", "GET", null, {});
      if (res && res?.status) {
        let arr = [];
        res?.data?.forEach((ele) => {
          arr.push({ value: ele?._id, label: ele?.name });
        });
        setAllColor(arr);
      } else {
        console.log("Failed to fetch color");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const images = [
    "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300",
    "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300",
    "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300",
    "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=300&width=300",
  ];

  const handleQuantityChange = (id, increment) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              quantity: Math.max(0, variant.quantity + increment),
            }
          : variant
      )
    );
  };

  const handleEditChange = (id, field, value) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEditChange(id, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleAddVariant = () => {
    const newId = variants.length ? variants[variants.length - 1].id + 1 : 1;
    setVariants([
      ...variants,
      { id: newId, size: "", color: "", price: 0.0, quantity: 0, image: "" },
    ]);
  };

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "Free Size", label: "Free Size" },
  ];

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md m-2">
        <h2 className="text-2xl font-semibold mb-4">Add Product Information</h2>
        <form className="space-y-6">
          <div className="w-full">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={cateogory}
              onChange={(e) => setCategory(e?.target?.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {allCategory?.map((ele, index) => {
                return <option value={ele?._id}>{ele?.name}</option>;
              })}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Enter product name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                id="sku"
                type="text"
                placeholder="124617209"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight
              </label>
              <div className="flex">
                <input
                  id="weight"
                  type="number"
                  placeholder="0.2"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <select className="border border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring focus:ring-blue-400">
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Used to calculate shipping rates at checkout and label prices
                during fulfillment.
              </p>
            </div>
          </div> */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={productDisc}
              onChange={(e) => setProductDesc(e.target.value)}
              placeholder="Enter product description"
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-2">
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Bold className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Italic className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Underline className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Link className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Image className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Quote className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Code className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <List className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Product Varient */}

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Variants
          </h3>
          <button
            onClick={handleAddVariant}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="-ml-0.5 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add variant
          </button>
        </div>

        {/* Mobile-friendly column layout */}
        <div className="sm:hidden">
          {variants.map((variant) => (
            <div key={variant.id} className="border-b border-gray-200 p-4">
              <div className="flex flex-col mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(variant.id, e)}
                  className="border border-gray-300 rounded-md p-1 mb-2"
                />
                {variant.image && (
                  <img
                    src={variant.image}
                    alt="Variant"
                    className="mt-2 h-16 w-16 object-cover"
                  />
                )}
              </div>

              {/* Multi-select dropdown for Size */}
              <Select
                isMulti
                options={sizeOptions}
                value={sizeOptions.filter((option) =>
                  variant.size.includes(option.value)
                )}
                onChange={(selected) =>
                  handleEditChange(
                    variant.id,
                    "size",
                    selected.map((option) => option.value)
                  )
                }
                className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                placeholder="Select Size(s)"
              />

              {/* Single-select dropdown for Color */}
              <Select
                options={colorOptions}
                value={colorOptions.find(
                  (option) => option.value === variant.color
                )}
                onChange={(selected) =>
                  handleEditChange(variant.id, "color", selected.value)
                }
                className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                placeholder="Select Color"
              />

              <input
                type="text"
                value={variant.price}
                onChange={(e) =>
                  handleEditChange(
                    variant.id,
                    "price",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="border border-gray-300 rounded-md p-1 mb-2"
                placeholder="Price (₹)"
              />

              <div className="flex items-center mb-2">
                <button
                  onClick={() => handleQuantityChange(variant.id, -1)}
                  className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={variant.quantity <= 0}
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="mx-2 max-w-[4rem] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={variant.quantity}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(variant.id, 1)}
                  className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => handleDelete(variant.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Desktop table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table Headers */}
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Color
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price (₹)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map((variant) => (
                <tr key={variant.id}>
                  {/* Image Upload */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(variant.id, e)}
                      className="border border-gray-300 rounded-md p-1 mb-2"
                    />
                    {variant.image && (
                      <img
                        src={variant.image}
                        alt="Variant"
                        className="mt-2 h-16 w-16 object-cover"
                      />
                    )}
                  </td>

                  {/* Size Multi-Select Dropdown */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Select
                      isMulti
                      options={sizeOptions}
                      value={sizeOptions.filter((option) =>
                        variant.size.includes(option.value)
                      )}
                      onChange={(selected) =>
                        handleEditChange(
                          variant.id,
                          "size",
                          selected.map((option) => option.value)
                        )
                      }
                      className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                      placeholder="Select Size"
                    />
                  </td>

                  {/* Color Multi-Select Dropdown */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Select
                      options={colorOptions}
                      value={colorOptions.find(
                        (option) => option.value === variant.color
                      )}
                      onChange={(selected) =>
                        handleEditChange(variant.id, "color", selected.value)
                      }
                      className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                      placeholder="Select Color"
                    />
                  </td>

                  {/* Price Input */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={variant.price}
                      onChange={(e) =>
                        handleEditChange(
                          variant.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 mb-2 w-full"
                      placeholder="Price (₹)"
                    />
                  </td>

                  {/* Quantity Input and Buttons */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(variant.id, -1)}
                        className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={variant.quantity <= 0}
                      >
                        <svg
                          className="h-5 w-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="mx-2 max-w-[4rem] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={variant.quantity}
                        readOnly
                      />
                      <button
                        onClick={() => handleQuantityChange(variant.id, 1)}
                        className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          className="h-5 w-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  {/* Delete Button */}
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleDelete(variant.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <ProductVarient /> */}
    </div>
  );
}

export default AddProduct;
