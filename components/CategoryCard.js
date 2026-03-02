// Reusable Category Card Component
export default function CategoryCard({ name, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer transform hover:scale-105`}>
      {/* Image Placeholder */}
      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      {/* Category Name */}
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </div>
  );
}
