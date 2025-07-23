"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/Sidebar"
import { Search, MapPin, Calendar, User } from "lucide-react"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // 🟦 Fetch blogs from server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs`)
        if (res.data.success) {
          setBlogs(res.data.data)
        } else {
          console.error("Failed to fetch blogs")
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      }
    }

    fetchBlogs()
  }, [])

  // 🟦 Apply filters and search
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSector = !selectedSector || blog.sector === selectedSector
    const matchesCategory = !selectedCategory || blog.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSector && matchesCategory && matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar
          selectedSector={selectedSector}
          selectedCategory={selectedCategory}
          onSectorChange={setSelectedSector}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Islamabad Blogs</h1>
            <p className="text-gray-600 mb-6">Discover the best places and experiences across all sectors of Islamabad</p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {(selectedSector || selectedCategory) && (
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedSector && (
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300" onClick={() => setSelectedSector("")}>
                  Sector: {selectedSector} ×
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300" onClick={() => setSelectedCategory("")}>
                  Category: {selectedCategory} ×
                </Badge>
              )}
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600">Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card key={blog._id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={blog.coverImage || "/placeholder.svg"}
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-1" />
                    <span>{blog.author?.name || "Unknown"}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <Link href={`/blogs/${blog._id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">View More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSector("")
                  setSelectedCategory("")
                  setSearchQuery("")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
