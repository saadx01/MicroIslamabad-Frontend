"use client"

import Link from "next/link"
import { useState, useContext } from "react"
import { Menu, X, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AuthContext from "@/context/AuthContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)

  const isLoggedIn = !!user
  const isAdmin = user?.role === "admin"

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setDropdownOpen(false)
    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MicroIslamabad</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blogs
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            {isAdmin && (
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {isLoggedIn ? (
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
                </Link>
              </div>
            )}

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-14 bg-white border rounded shadow p-2 z-50">
                <button
                  onClick={handleLogout}
                  className="text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-blue-600 transition-colors">
                Blogs
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About Us
              </Link>
              {isAdmin && (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              )}
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Register</Button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
