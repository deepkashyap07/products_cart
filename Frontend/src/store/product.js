import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], // Initialize with an empty array
  setProducts: (products) => set({ products }), // Function to update the products array
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product Created Successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    // Check if the response is successful
    if(!data.success) {
      return { success: false, message: "Error deleting product" };
    }

    // Update the products state after deletion
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product Deleted Successfully" };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    // Check if the response is successful
    if(!data.success) {
      return { success: false, message: "Error updating product" };
    }

    // Update the products state after updating
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, ...updatedProduct } : product
      ),
    }));
    return { success: true, message: "Product Updated Successfully" };
  },
  setProduct: (product) => set({ product }), // Function to update a single product 
  
})
);
