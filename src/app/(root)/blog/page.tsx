import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, ArrowUpRight, ChevronRight } from "lucide-react";

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
    excerpt: "Learn how to build a modern web application with Next.js from scratch.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Tutorials",
  },
  {
    id: "2",
    title: "Authentication in Next.js Applications",
    excerpt: "Implement secure authentication in your Next.js app using modern techniques.",
    date: "June 2, 2023",
    readTime: "12 min read",
    category: "Security",
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Design beautiful and responsive user interfaces using Tailwind CSS utility classes.",
    date: "July 10, 2023",
    readTime: "10 min read",
    category: "Design",
  },
  {
    id: "4",
    title: "Working with Databases in Next.js",
    excerpt: "Connect your Next.js application to databases and perform CRUD operations efficiently.",
    date: "August 22, 2023",
    readTime: "15 min read",
    category: "Databases",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-32 md:py-40">
          <div className="flex flex-col items-start max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
              Our Blog
            </h1>
            <p className="mt-6 text-xl max-w-2xl text-muted-foreground">
              Latest insights, tutorials, and updates from our team
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Featured Post */}
        <div className="bg-card shadow-xl rounded-2xl overflow-hidden border border-border/10">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {SAMPLE_POSTS[0].category}
                </div>
                <div className="h-1 w-1 rounded-full bg-border"></div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="mr-1.5 h-3 w-3" />
                  {SAMPLE_POSTS[0].date}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {SAMPLE_POSTS[0].title}
              </h2>
              
              <p className="mt-4 text-muted-foreground">
                {SAMPLE_POSTS[0].excerpt}
              </p>
              
              <div className="mt-8 flex items-center">
                <Link href={`/blog/${SAMPLE_POSTS[0].id}`}>
                  <Button variant="default" size="lg" className="group">
                    Read Article
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>
                <div className="ml-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {SAMPLE_POSTS[0].readTime}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-gradient-to-br from-primary/40 to-primary/5 min-h-[200px] md:min-h-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                </div>
                <div className="text-lg font-medium text-white">Featured Post</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-16 mb-8 flex items-center overflow-x-auto pb-4 scrollbar-hide">
          <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full mr-2 whitespace-nowrap font-medium">
            All Posts
          </div>
          {Array.from(new Set(SAMPLE_POSTS.map(post => post.category))).map((category) => (
            <div key={category} className="px-4 py-1.5 bg-card hover:bg-primary/5 border border-border/50 text-muted-foreground rounded-full mr-2 whitespace-nowrap cursor-pointer transition-colors">
              {category}
            </div>
          ))}
        </div>

        {/* Post Grid with modern cards */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_POSTS.slice(1).map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group">
                <div className="h-full bg-card hover:bg-card/80 rounded-xl overflow-hidden border border-border/40 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {post.category}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="mt-3 text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    
                    <div className="mt-6 pt-4 border-t border-border flex justify-between items-center mt-auto">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                        Read more
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mb-24 bg-black text-white rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold">Stay updated with our latest articles</h2>
              <p className="mt-3 text-gray-400">
                Subscribe to our newsletter to receive the latest updates, tutorials, and insights directly in your inbox.
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col items-center md:items-end">
              <Button className="bg-white text-black hover:bg-white/90 md:w-auto w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 