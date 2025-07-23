"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Users, FileText, Eye, BarChart3, Settings } from "lucide-react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("blogs")

  const blogs = [
    {
      id: 1,
      title: "Best Restaurants in F-7 Markaz",
      sector: "F-7",
      category: "Restaurants",
      status: "published",
      author: "Sarah Ahmed",
      date: "2024-01-15",
      views: 1250,
    },
    {
      id: 2,
      title: "Hidden Gems in G-10 Parks",
      sector: "G-10",
      category: "Parks & Grounds",
      status: "published",
      author: "Ali Hassan",
      date: "2024-01-12",
      views: 890,
    },
    {
      id: 3,
      title: "Modern Gyms in F-8 Area",
      sector: "F-8",
      category: "Gyms & Pools",
      status: "draft",
      author: "Maria Khan",
      date: "2024-01-10",
      views: 0,
    },
  ]

  const users = [
    {
      id: 1,
      name: "Sarah Ahmed",
      email: "sarah@example.com",
      role: "admin",
      joinDate: "2023-06-15",
      posts: 25,
    },
    {
      id: 2,
      name: "Ali Hassan",
      email: "ali@example.com",
      role: "admin",
      joinDate: "2023-08-20",
      posts: 18,
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      joinDate: "2024-01-05",
      posts: 0,
    },
  ]

  const stats = [
    { title: "Total Blogs", value: "156", icon: FileText, color: "text-blue-600" },
    { title: "Total Users", value: "1,234", icon: Users, color: "text-green-600" },
    { title: "Monthly Views", value: "45,678", icon: Eye, color: "text-purple-600" },
    { title: "Published This Month", value: "12", icon: BarChart3, color: "text-orange-600" },
  ]

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your MicroIslamabad content and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("blogs")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "blogs"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Manage Blogs
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Blogs Management */}
        {activeTab === "blogs" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Blog Posts</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search blogs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                  <Link href="/dashboard/blog/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Blog
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Sector</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{blog.title}</div>
                            <div className="text-sm text-gray-500">by {blog.author}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{blog.sector}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{blog.category}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={blog.status === "published" ? "default" : "secondary"}
                            className={blog.status === "published" ? "bg-green-600" : ""}
                          >
                            {blog.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{blog.views.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Link href={`/blogs/${blog.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/blog/edit/${blog.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Management */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Users</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Admin
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Posts</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={user.role === "admin" ? "default" : "secondary"}
                            className={user.role === "admin" ? "bg-blue-600" : ""}
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.posts}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(user.joinDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                      <Input defaultValue="MicroIslamabad" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                      <Input defaultValue="Your Sector-Wise Guide to the City" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Content Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Allow Comments</label>
                        <p className="text-sm text-gray-500">Enable comments on blog posts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Moderate Comments</label>
                        <p className="text-sm text-gray-500">Require approval for new comments</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
