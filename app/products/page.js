// app/products/page.js

import ProductsClient from "./ProductsClient";

async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/allProducts", {
      cache: "no-store", // always fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ProductsClient products={products} />;
}