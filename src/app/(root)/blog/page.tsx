import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  category?: string;
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build a modern web application with Next.js from scratch. This guide covers everything from setup to deployment.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Tutorials",
  },
  {
    id: "2",
    title: "Authentication in Next.js Applications",
    excerpt: "Implement secure authentication in your Next.js app using modern techniques. Learn about JWT, session management, and best practices.",
    date: "June 2, 2023",
    readTime: "12 min read",
    category: "Security",
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Design beautiful and responsive user interfaces using Tailwind CSS utility classes. Create modern designs with minimal effort.",
    date: "July 10, 2023",
    readTime: "10 min read",
    category: "Design",
  },
  {
    id: "4",
    title: "Working with Databases in Next.js",
    excerpt: "Connect your Next.js application to databases and perform CRUD operations efficiently. Explore different database options and ORMs.",
    date: "August 22, 2023",
    readTime: "15 min read",
    category: "Databases",
  },
  {
    id: "5",
    title: "Server Components and Server Actions",
    excerpt: "Understand the power of React Server Components and Server Actions in Next.js applications for improved performance and user experience.",
    date: "September 5, 2023",
    readTime: "11 min read",
    category: "Performance",
  },
  {
    id: "6",
    title: "Building an E-commerce Site with Next.js",
    excerpt: "A comprehensive guide to creating a full-featured e-commerce platform using Next.js, Stripe, and modern headless CMS solutions.",
    date: "October 12, 2023",
    readTime: "18 min read",
    category: "E-commerce",
  },
];

// Get all unique categories from posts
const categories = Array.from(new Set(SAMPLE_POSTS.map(post => post.category)));

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Insights, guides, and updates from our team to help you build better applications.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <div className="flex items-center space-x-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium">
            All
          </button>
          {categories.map((category) => (
            <button 
              key={category} 
              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${SAMPLE_POSTS[0].id}`} className="group">
            <div className="relative overflow-hidden bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
              <div className="p-8 sm:p-10">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                  <span className="flex items-center">
                    <Tag className="mr-1.5 h-3.5 w-3.5" />
                    {SAMPLE_POSTS[0].category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {SAMPLE_POSTS[0].date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {SAMPLE_POSTS[0].readTime}
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {SAMPLE_POSTS[0].title}
                </h2>
                
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {SAMPLE_POSTS[0].excerpt}
                </p>
                
                <div className="mt-6 inline-flex items-center text-gray-900 font-medium group-hover:text-gray-600">
                  Continue reading 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {SAMPLE_POSTS.slice(1).map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <article className="h-full flex flex-col bg-white rounded-lg border border-gray-100 hover:border-gray-200 overflow-hidden transition-all">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm flex-grow mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-50 rounded-xl p-8 sm:p-10 border border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Subscribe to our newsletter</h2>
            <p className="text-gray-500 mb-6">
              Get the latest articles and insights delivered to your inbox.
            </p>
            <div className="sm:flex sm:items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-auto px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 