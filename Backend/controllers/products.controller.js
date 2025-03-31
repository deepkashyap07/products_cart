import Product from "../models/product.model.js"; // Assuming you have a Product model defined

export const getproducts = async (req, res) => {
  try {
    const products = await Product.find(); // Assuming you have a Product model defined
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in fetching products", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // Assuming product is an object with product details

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await Product.create(product); // Assuming you have a Product model defined
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in creating product", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id; // Extract the product ID from the URL
  const updatedProductData = req.body; // Assuming updatedProductData is an object with updated product details

  if (
    !updatedProductData.name ||
    !updatedProductData.price ||
    !updatedProductData.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("error in updating product", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id; // Extract the product ID from the URL

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId); // Assuming you have a Product model defined

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    console.error("error in deleting product", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};
