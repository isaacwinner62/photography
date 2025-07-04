"use client"

import type React from "react"

import {
  Camera,
  Heart,
  Star,
  Users,
  Award,
  Clock,
  Palette,
  Zap,
  Check,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// Custom Button Component
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "lg" | "icon"
  onClick?: () => void
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white",
  }

  const sizes = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Custom Card Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm shadow-lg ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-white ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-400 ${className}`}>{children}</p>
)

// Custom Badge Component
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>{children}</span>
)

const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike",
    role: "Wedding Clients",
    content:
      "Absolutely incredible work! The wedding photos exceeded all our expectations. Every moment was captured beautifully and the editing was perfection.",
    initials: "SM",
    rating: 5,
  },
  {
    id: 2,
    name: "Jennifer Davis",
    role: "Family Portrait",
    content:
      "Professional, creative, and so easy to work with. The family portraits turned out amazing and really captured our personalities perfectly.",
    initials: "JD",
    rating: 5,
  },
  {
    id: 3,
    name: "Robert Chen",
    role: "Business Headshots",
    content:
      "The headshots for my business were exactly what I needed. Professional quality and delivered quickly. Highly recommend for any business needs!",
    initials: "RC",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Maternity Session",
    content:
      "The maternity photos were absolutely stunning. Captured this special time in our lives with such artistry and care. We'll treasure these forever.",
    initials: "ER",
    rating: 5,
  },
  {
    id: 5,
    name: "David & Lisa",
    role: "Engagement Photos",
    content:
      "Our engagement session was so much fun! The photos turned out better than we could have imagined. Can't wait to work together for our wedding!",
    initials: "DL",
    rating: 5,
  },
  {
    id: 6,
    name: "Marcus Johnson",
    role: "Corporate Event",
    content:
      "Professional event coverage that captured all the important moments. Great communication and delivered exactly what we needed for our company.",
    initials: "MJ",
    rating: 5,
  },
]

const galleryImages = [
  { id: 1, src: "/placeholder.svg?height=300&width=300", alt: "Wedding couple", category: "wedding" },
  { id: 2, src: "/placeholder.svg?height=300&width=300", alt: "Portrait session", category: "portrait" },
  { id: 3, src: "/placeholder.svg?height=300&width=300", alt: "Family photo", category: "family" },
  { id: 4, src: "/placeholder.svg?height=300&width=300", alt: "Business headshot", category: "business" },
  { id: 5, src: "/placeholder.svg?height=300&width=300", alt: "Event photography", category: "event" },
  { id: 6, src: "/placeholder.svg?height=300&width=300", alt: "Creative portrait", category: "creative" },
  { id: 7, src: "/placeholder.svg?height=300&width=300", alt: "Wedding ceremony", category: "wedding" },
  { id: 8, src: "/placeholder.svg?height=300&width=300", alt: "Maternity shoot", category: "maternity" },
  { id: 9, src: "/placeholder.svg?height=300&width=300", alt: "Corporate event", category: "business" },
  { id: 10, src: "/placeholder.svg?height=300&width=300", alt: "Engagement photos", category: "engagement" },
  { id: 11, src: "/placeholder.svg?height=300&width=300", alt: "Family portrait", category: "family" },
  { id: 12, src: "/placeholder.svg?height=300&width=300", alt: "Creative concept", category: "creative" },
  { id: 13, src: "/placeholder.svg?height=300&width=300", alt: "Wedding reception", category: "wedding" },
  { id: 14, src: "/placeholder.svg?height=300&width=300", alt: "Professional headshot", category: "business" },
  { id: 15, src: "/placeholder.svg?height=300&width=300", alt: "Artistic portrait", category: "creative" },
  { id: 16, src: "/placeholder.svg?height=300&width=300", alt: "Family gathering", category: "family" },
]

export default function Component() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3),
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Subtle Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-slate-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Camera className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">LensCapture</span>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {["Home", "Services", "Gallery", "Testimonials", "Pricing", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors hover:text-blue-400 text-gray-300 hover:text-blue-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-blue-600 hover:bg-blue-700 border-0 text-white font-semibold">Book Session</Button>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section id="home" className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6 relative z-20"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="space-y-4">
                  <motion.h1
                    className="text-4xl font-black tracking-tight sm:text-6xl xl:text-7xl/none font-['Inter'] relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <span className="text-blue-400">Capture Life's</span>
                    <br />
                    <span className="text-white">Most Beautiful</span>
                    <br />
                    <span className="text-gray-300">Moments</span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-400 md:text-xl font-['Inter'] leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Professional photography services that tell your unique story. From weddings to portraits, I create
                    timeless memories that you'll treasure forever.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-4 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg border-0 shadow-2xl shadow-blue-500/25"
                    onClick={() => setShowGallery(true)}
                  >
                    View Portfolio
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 bg-gray-800/50 backdrop-blur-sm border-gray-600 text-gray-300 hover:bg-gray-700/50 font-semibold text-lg"
                  >
                    Book Consultation
                  </Button>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-6 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">5.0 Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">500+ Happy Clients</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Image with Text Behind Effect */}
              <motion.div
                className="relative lg:order-last"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div className="relative">
                  {/* Background Text */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <span className="text-[12rem] font-black text-gray-800/20 select-none font-['Inter'] leading-none">
                      LENS
                    </span>
                  </motion.div>

                  {/* Main Image */}
                  <motion.div className="relative z-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      width="600"
                      height="600"
                      alt="Professional photographer at work"
                      className="mx-auto aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl shadow-blue-500/25 border border-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-3xl" />
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-500/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.05, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-slate-800/50" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2">
                  Photography Services
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white font-['Inter']">
                  Specialized in Every
                  <span className="text-blue-400"> Moment</span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-['Inter']">
                  From intimate portraits to grand celebrations, I bring creativity and professionalism to every shoot.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="grid gap-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: Heart,
                    title: "Wedding Photography",
                    desc: "Capture your special day with artistic flair and emotional depth. Every smile, tear, and celebration preserved forever.",
                  },
                  {
                    icon: Users,
                    title: "Portrait Sessions",
                    desc: "Professional headshots, family portraits, and personal branding photos that showcase your authentic self.",
                  },
                  {
                    icon: Palette,
                    title: "Creative Concepts",
                    desc: "Artistic and conceptual photography that pushes boundaries and creates stunning visual narratives.",
                  },
                  {
                    icon: Zap,
                    title: "Quick Turnaround",
                    desc: "Professional editing and delivery within 48-72 hours for most sessions, because your memories can't wait.",
                  },
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <service.icon className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white font-['Inter']">{service.title}</h3>
                      <p className="text-gray-400 font-['Inter']">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  width="500"
                  height="500"
                  alt="Photography equipment and samples"
                  className="mx-auto aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl shadow-blue-500/25 border border-gray-700"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Infinite Sliding Gallery Section */}
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gray-800/30">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-slate-500/20 text-slate-300 border border-slate-500/30 px-4 py-2">
                Portfolio Gallery
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white font-['Inter']">
                My Latest
                <span className="text-blue-400"> Work</span>
              </h2>
            </motion.div>

            {/* Infinite Sliding Gallery */}
            <div className="relative">
              {/* First Row - Moving Right */}
              <div className="flex space-x-2 mb-2 overflow-hidden">
                <motion.div
                  className="flex space-x-2 flex-shrink-0"
                  animate={{
                    x: [0, -1600],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[...galleryImages, ...galleryImages].map((image, index) => (
                    <div
                      key={`row1-${index}`}
                      className="w-80 h-60 flex-shrink-0 cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700/50">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={320}
                          height={240}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium capitalize">{image.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Second Row - Moving Left */}
              <div className="flex space-x-2 mb-2 overflow-hidden">
                <motion.div
                  className="flex space-x-2 flex-shrink-0"
                  animate={{
                    x: [-1600, 0],
                  }}
                  transition={{
                    duration: 35,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()].map((image, index) => (
                    <div
                      key={`row2-${index}`}
                      className="w-72 h-56 flex-shrink-0 cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700/50">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={288}
                          height={224}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium capitalize">{image.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Third Row - Moving Right (Slower) */}
              <div className="flex space-x-2 overflow-hidden">
                <motion.div
                  className="flex space-x-2 flex-shrink-0"
                  animate={{
                    x: [0, -1600],
                  }}
                  transition={{
                    duration: 45,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[...galleryImages.slice(8), ...galleryImages.slice(8)].map((image, index) => (
                    <div
                      key={`row3-${index}`}
                      className="w-96 h-64 flex-shrink-0 cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700/50">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={384}
                          height={256}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium capitalize">{image.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold border-0 shadow-2xl shadow-blue-500/25"
                onClick={() => setShowGallery(true)}
              >
                View Full Gallery
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-gray-800/50" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gray-500/20 text-gray-300 border border-gray-500/30 px-4 py-2">Client Love</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white font-['Inter']">
                What My
                <span className="text-blue-400"> Clients Say</span>
              </h2>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
              {/* Desktop View - 3 testimonials */}
              <div className="hidden md:block">
                <motion.div
                  className="grid grid-cols-3 gap-6"
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonials.slice(currentTestimonial * 3, currentTestimonial * 3 + 3).map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-4 font-['Inter']">"{testimonial.content}"</p>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">{testimonial.initials}</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{testimonial.name}</p>
                              <p className="text-sm text-gray-400">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Mobile View - 1 testimonial */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
                      <CardHeader>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonials[currentTestimonial * 3]?.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4 font-['Inter']">
                          "{testimonials[currentTestimonial * 3]?.content}"
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {testimonials[currentTestimonial * 3]?.initials}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{testimonials[currentTestimonial * 3]?.name}</p>
                            <p className="text-sm text-gray-400">{testimonials[currentTestimonial * 3]?.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-blue-500 w-8" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-slate-500/20 text-slate-300 border border-slate-500/30 px-4 py-2">
                Photography Packages
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white font-['Inter']">
                Choose Your Perfect
                <span className="text-blue-400"> Package</span>
              </h2>
            </motion.div>

            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-3">
              {[
                {
                  name: "Essential",
                  price: "$299",
                  description: "Perfect for small events and portraits",
                  features: ["1-hour session", "20 edited photos", "Online gallery", "48-hour delivery"],
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$599",
                  description: "Most popular for weddings and events",
                  features: [
                    "3-hour session",
                    "50 edited photos",
                    "Online gallery + USB",
                    "24-hour delivery",
                    "Print release included",
                  ],
                  popular: true,
                },
                {
                  name: "Premium",
                  price: "$999",
                  description: "Complete coverage for special occasions",
                  features: [
                    "Full day coverage",
                    "100+ edited photos",
                    "Premium album included",
                    "Same-day previews",
                    "Second photographer",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  <Card
                    className={`relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 ${plan.popular ? "ring-2 ring-blue-500/50" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0">
                        <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <CardHeader className={plan.popular ? "pt-12" : ""}>
                      <div className="text-center space-y-2">
                        <CardTitle className="text-white font-['Inter']">{plan.name}</CardTitle>
                        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                        <div className="text-4xl font-bold text-blue-400">{plan.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Check className="h-5 w-5 text-blue-400" />
                            <span className="text-gray-300 font-['Inter']">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold border-0 shadow-2xl shadow-blue-500/25"
                        size="lg"
                      >
                        Choose {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Capture Section with Background Image */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Photography background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/80 to-gray-900/90" />
          </div>

          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/20" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <motion.h2
                  className="text-4xl font-bold tracking-tighter sm:text-6xl text-white font-['Inter']"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Ready to Capture Your
                  <span className="text-blue-400"> Story?</span>
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-gray-300 md:text-xl/relaxed font-['Inter']"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Let's create something beautiful together. Book your session today and let me help you preserve your
                  most precious moments.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-4 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg border-0 shadow-2xl shadow-blue-500/25"
                >
                  Book Your Session
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 bg-gray-800/50 backdrop-blur-sm border-gray-600 text-gray-300 hover:bg-gray-700/50 font-semibold text-lg"
                  onClick={() => setShowGallery(true)}
                >
                  View Portfolio
                </Button>
              </motion.div>
              <motion.div
                className="flex items-center space-x-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Quick Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">Award Winning</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer
        id="contact"
        className="w-full py-12 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-t border-gray-700"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <Camera className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">LensCapture</span>
              </div>
              <p className="text-sm text-gray-400 font-['Inter']">
                Professional photography services capturing life's most beautiful moments with artistic flair and
                emotional depth.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                      <Icon className="h-5 w-5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Services",
                links: ["Wedding Photography", "Portrait Sessions", "Business Headshots", "Event Photography"],
              },
              {
                title: "Company",
                links: ["About", "Portfolio", "Blog", "Contact"],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold text-white">{section.title}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="hover:text-blue-400 transition-colors font-['Inter']">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-white">Contact Info</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  { icon: Mail, text: "hello@lenscapture.com" },
                  { icon: Phone, text: "(555) 123-4567" },
                  { icon: MapPin, text: "New York, NY" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4 text-blue-400" />
                    <span className="font-['Inter']">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="font-['Inter']">&copy; {new Date().getFullYear()} LensCapture. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGallery(false)}
          >
            <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Full Gallery</h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowGallery(false)}
                  className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="break-inside-avoid cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(image)
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-gray-700">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={400}
                        height={index % 3 === 0 ? 500 : index % 3 === 1 ? 400 : 450}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
