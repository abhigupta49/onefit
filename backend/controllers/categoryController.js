const Category = require("../models/categoryModel");

const AddCategory = async (req, res) => {
  const categoryName = req?.body?.name;

  const findname = await Category.findOne({
    name: new RegExp(`^${categoryName}$`, "i"),
  });
  console.log(findname);

  if (!findname) {
    const addCategory = await Category.create(req?.body);
    console.log(addCategory);
    res.status(201).send({
      msg: "Category added successfully",
      status: true,
      data: addCategory,
    });
  } else {
    // Category with the same name (case-insensitive) already exists
    res.send({
      msg: "Category already exists",
      status: false,
    });
  }
};

const GetAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.send({
      status: true,
      data: allCategory,
    });
  } catch (error) {
    res.send({
      status: false,
      message: error,
    });
  }
};

const UpdateCategory = async (req, res) => {
  const { id } = req.params;
  //   validMongoDbId(id);
  console.log(id);

  const updateCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: req?.body?.name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: true,
    message: "Category Updated Successfully",
    data: updateCategory,
  });
};

const DeleteaCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json({
      status: true,
      message: "Deleted Successfully",
      data: deleteCategory,
    });
  } catch (error) {
    res?.json(error);
  }
};

module.exports = {
  AddCategory,
  GetAllCategory,
  UpdateCategory,
  DeleteaCategory,
};
