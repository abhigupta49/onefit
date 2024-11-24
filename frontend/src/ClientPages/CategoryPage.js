
import CategoryProductCard from './CategoryProductCard'

const products = [
    {
      name: "Premium Wireless Noise-Cancelling Headphones",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviewCount: 1024,
      inStock: true,
    },
    {
      name: "Smart Fitness Tracker with Heart Rate Monitor",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 2048,
      inStock: true,
    },
    {
      name: "4K Ultra HD Smart LED TV - 55\" Class",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 3072,
      inStock: false,
    },
    {
      name: "Portable Bluetooth Speaker with 360° Sound",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviewCount: 1536,
      inStock: true,
    },
    {
      name: "Professional DSLR Camera with 24-70mm Lens",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviewCount: 512,
      inStock: true,
    },
    {
      name: "Ergonomic Office Chair with Lumbar Support",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviewCount: 768,
      inStock: true,
    },
  ]

export default function CategoryPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {products.map((product, index) => (
                <CategoryProductCard key={index} {...product} />
              ))}
            </div>
          </main>
        </div>
      )
}

