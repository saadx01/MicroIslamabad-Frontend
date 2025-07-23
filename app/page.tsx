import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar } from "lucide-react"

export default function HomePage() {
  const featuredBlogs = [
    {
      id: 1,
      title: "Best Restaurants in F-7 Markaz",
      sector: "F-7",
      category: "Restaurants",
      image: "/placeholder.svg?height=200&width=300",
      preview: "Discover the finest dining experiences in one of Islamabad's most popular sectors...",
      author: "Sarah Ahmed",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Hidden Gems in G-10 Parks",
      sector: "G-10",
      category: "Parks & Grounds",
      image: "/placeholder.svg?height=200&width=300",
      preview: "Explore the beautiful green spaces and recreational areas in G-10 sector...",
      author: "Ali Hassan",
      date: "2024-01-12",
    },
    {
      id: 3,
      title: "Modern Gyms in F-8 Area",
      sector: "F-8",
      category: "Gyms & Pools",
      image: "/placeholder.svg?height=200&width=300",
      preview: "Stay fit with these top-rated fitness centers and swimming pools...",
      author: "Maria Khan",
      date: "2024-01-10",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore Islamabad,
            <br />
            <span className="text-green-300">Sector by Sector</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Your comprehensive guide to discovering the best restaurants, parks, gyms, and activities in every sector of
            Islamabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Explore Blogs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Blogs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest insights and recommendations from our community of local explorers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog) => (
            <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-3 h-3 mr-1" />
                      {blog.sector}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.preview}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{blog.author}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Link href={`/blogs/${blog.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blogs">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
            >
              View All Blogs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Sectors Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Blog Posts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Readers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
