"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import AuthContext from "@/context/AuthContext"
import useAuth from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  // const { setUser, setToken } = useContext(AuthContext)
  const { login, user, logout } = useAuth();

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        setLoading(false)
        return
      }

      // Save token and user to context
      // setToken(data.token)
      // setUser(data.user)
        login(data?.user,data?.accessToken)


      // Optionally: Save to localStorage
      // localStorage.setItem("token", data.token)
      // localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect to home/dashboard
      router.push("/")
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">MI</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to your MicroIslamabad account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input id="remember" type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
