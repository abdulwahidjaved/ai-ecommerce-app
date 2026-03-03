
import Navbar from '@/components/Navbar';
import CategoryCard from '@/components/CategoryCard';
import ProductCardDetail from '@/components/ProductCardDetail';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import { categories, carouselItems, allProducts } from '@/lib/data';

//Get categories
async function getCategories() {
  const res = await fetch("https://backend-8sca.onrender.com/api/categories", {
    cache: "no-store",
  });

  return res.json();
}

//Get trendings & offers
async function getTrendings() {
  const res = await fetch("https://backend-8sca.onrender.com/api/trendings", {
    cache: "no-store",
  });

  return res.json();
}
//Get trending products
async function getTrendingProducts() {
  const res = await fetch("https://backend-8sca.onrender.com/api/trendingproducts", {
    cache: "no-store",
  });

  return res.json();
}
//Get recommended products
async function getRecommendedProducts() {
  const res = await fetch("https://backend-8sca.onrender.com/api/recommendedProducts", {
    cache: "no-store",
  });

  return res.json();
}
//Get all products
async function getAllProducts() {
  const res = await fetch("https://backend-8sca.onrender.com/api/allProducts", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const categories = await getCategories();
  const trendings = await getTrendings();
  const trendingProducts = await getTrendingProducts();
  const recommendedProducts = await getRecommendedProducts();
  const allProducts = await getAllProducts();
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      <div className="bg-gray-50">
        {/* Hero / Top Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Top Categories</h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                name={category.name}
                bgColor={category.bgColor}
              />
            ))}
          </div>
        </section>

        {/* Carousel Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Trending & Offers</h2>
          <Carousel items={trendings} />
        </section>

        {/* Trending Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Trending Products</h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 8).map((product) => (
              <ProductCardDetail
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* Recommended Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Recommended For You</h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.slice(4, 12).map((product) => (
              <ProductCardDetail
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
