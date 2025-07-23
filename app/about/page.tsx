import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, BookOpen, Target } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Ahmed",
      role: "Founder & Editor-in-Chief",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Islamabad native with 10+ years of experience in local journalism and city exploration.",
    },
    {
      name: "Ali Hassan",
      role: "Content Manager",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Food enthusiast and local guide who knows every corner of the capital city.",
    },
    {
      name: "Maria Khan",
      role: "Community Manager",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Social media expert passionate about connecting people with their city.",
    },
  ]

  const stats = [
    { icon: MapPin, label: "Sectors Covered", value: "50+" },
    { icon: BookOpen, label: "Blog Posts", value: "200+" },
    { icon: Users, label: "Community Members", value: "1000+" },
    { icon: Target, label: "Years of Experience", value: "5+" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MicroIslamabad</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your trusted guide to exploring Islamabad, one sector at a time. We're passionate about helping you discover
            the best places, experiences, and hidden gems in Pakistan's capital city.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                MicroIslamabad was born from a simple idea: to create the most comprehensive, sector-wise guide to
                Islamabad that helps both residents and visitors discover the best the city has to offer.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every sector of Islamabad has its own unique character, hidden gems, and stories to
                tell. Our mission is to uncover these stories and share them with our community, making it easier for
                everyone to explore and appreciate the diversity of our beautiful capital.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're looking for the best restaurants in F-7, peaceful parks in G-10, or exciting activities
                in your neighborhood, we're here to guide you every step of the way.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Islamabad cityscape"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our passionate team of local experts, writers, and city enthusiasts work tirelessly to bring you the best
              content about Islamabad.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                We provide honest, unbiased reviews and recommendations based on real experiences and thorough research.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community and encourage our readers to share their own discoveries and
                experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                Every piece of content we publish meets our high standards for accuracy, usefulness, and readability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have a suggestion, question, or want to contribute to MicroIslamabad? We'd love to hear from you! Reach out
            to us through our social media channels or email us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@microislamabad.com" className="text-blue-600 hover:text-blue-800 font-medium">
              info@microislamabad.com
            </a>
            <span className="hidden sm:block text-gray-400">|</span>
            <a href="tel:+92-51-1234567" className="text-blue-600 hover:text-blue-800 font-medium">
              +92-51-1234567
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
