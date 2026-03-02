// Footer Component
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About</h3>
            <p className="text-sm leading-relaxed">
              AI-Shop is your one-stop destination for innovative products and services. We provide quality items with the best customer experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition">
                  Shopping Cart
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-white transition">
                  My Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 Email: support@aishop.com</li>
              <li>📞 Phone: +1 (555) 123-4567</li>
              <li>📍 Address: 123 Main St, Tech City</li>
              <li className="pt-2">Follow us on social media</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Copyright */}
          <p className="text-center text-sm text-gray-400">
            © 2025 AI-Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
