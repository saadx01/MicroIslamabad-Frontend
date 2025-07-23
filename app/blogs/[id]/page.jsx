"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Calendar, Tag, ArrowLeft, Heart, Share2 } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { use } from 'react';

export default function SingleBlogPage({ params: paramsPromise }) {
  const { id } = use(paramsPromise); // ✅ Unwrap params
  const { user, isAuthenticated } = useAuth() // get current user
  const [blog, setBlog] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs/${id}`)
        if (res.data.success) setBlog(res.data.data)
        else setError("Blog not found")
      } catch (err) {
        console.error(err)
        setError("Error fetching blog")
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  console.log("Params id: ", id)

  const postComment = async () => {
    if (!commentText.trim()) return
    try {
      const token = localStorage.getItem("token")
      // console.log("Sending token:", token);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs/${id}`,
        { comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setBlog(prev => ({
          ...prev,
          comments: [...prev.comments, res.data.data.comment],
        }))
        setCommentText("")
      }
    } catch (err) {
      console.error(err)
      alert("Failed to post comment")
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error || !blog) return (
    <div className="p-8 text-center text-red-600">
      {error || "Blog not found"}
      <div className="mt-4"><Link href="/blogs" className="text-blue-600">Back to Blogs</Link></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        <div className="relative mb-8 rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage || "/placeholder.svg"}
            alt={blog.title}
            width={800} height={400}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-600"><MapPin className="w-3 h-3 mr-1" />{blog.sector}</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">{blog.category}</Badge>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap justify-between items-center mb-6 text-gray-600">
          <div className="flex items-center space-x-4">
            <Image
              src={blog.author.profilePic || "/placeholder.svg"}
              alt={blog.author.name}
              width={48} height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold text-gray-900">{blog.author.name}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(blog.createdAt).toLocaleDateString()}</div>
            <Button variant="ghost" size="sm"><Heart className="mr-1 w-4 h-4" />Like</Button>
            <Button variant="ghost" size="sm"><Share2 className="mr-1 w-4 h-4" />Share</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Tag className="w-4 h-4 text-gray-500 mr-2" />
          {blog.tags.map(tag => <Badge key={tag} variant="outline" className="text-sm">#{tag}</Badge>)}
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="text-xl font-semibold">Comments ({blog.comments.length})</h3></CardHeader>
          <CardContent className="space-y-6">
            {isAuthenticated() ? (
              <div className="border-b border-gray-200 pb-6">
                <Textarea
                  placeholder="Share your thoughts..."
                  className="mb-3"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={postComment}>Post Comment</Button>
              </div>
            ) : (
              <div className="border-b border-gray-200 pb-6 text-center">
                <p className="text-gray-600 mb-3">Please log in to leave a comment</p>
                <Link href="/login"><Button className="bg-blue-600 hover:bg-blue-700">Login to Comment</Button></Link>
              </div>
            )}

            <div className="space-y-4">
              {blog.comments.map(c => (
                <div key={c._id} className="flex space-x-4">
                  <Image
                    src={c.user.profileImage || "/placeholder.svg"}
                    alt={c.user.name}
                    width={40} height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{c.user.name}</span>
                      <span className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
