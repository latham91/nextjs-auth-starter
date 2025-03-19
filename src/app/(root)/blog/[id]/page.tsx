'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalendarIcon, Clock, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import 'highlight.js/styles/atom-one-dark.css';
import { addLanguageLabels } from "@/lib/addLanguageLabels";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  category?: string;
  content?: string;
}

// Sample blog posts data (in a real app, this would come from a database or API)
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build a modern web application with Next.js from scratch.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Tutorials",
    content: `
      <p>Next.js is a powerful React framework that makes building web applications a breeze. It provides features like server-side rendering, static site generation, and API routes out of the box.</p>
      
      <h2>Setting Up Your First Next.js Project</h2>
      <p>To get started with Next.js, you'll need to have Node.js installed on your machine. Once you have Node.js, you can create a new Next.js project using the following command:</p>
      <pre><code class="language-bash">npx create-next-app my-next-app</code></pre>
      
      <p>This will create a new Next.js project with all the necessary dependencies and a basic project structure. You can then navigate to your project directory and start the development server:</p>
      <pre><code class="language-bash">cd my-next-app
npm run dev</code></pre>
      
      <h2>Key Features of Next.js</h2>
      <ul>
        <li>Server-side rendering for improved performance and SEO</li>
        <li>Static site generation for blazing-fast loading times</li>
        <li>API routes for building backend functionality</li>
        <li>File-based routing for intuitive navigation</li>
        <li>Built-in CSS and Sass support</li>
        <li>TypeScript support out of the box</li>
      </ul>
      
      <p>Next.js is constantly evolving, with new features being added in each release. It's a great choice for building modern web applications, whether you're creating a simple blog or a complex e-commerce platform.</p>
    `,
  },
  {
    id: "2",
    title: "Authentication in Next.js Applications",
    excerpt: "Implement secure authentication in your Next.js app using modern techniques.",
    date: "June 2, 2023",
    readTime: "12 min read",
    category: "Security",
    content: `
      <p>Authentication is a crucial part of many web applications. In this article, we'll explore how to implement secure authentication in a Next.js application.</p>
      
      <h2>Options for Authentication in Next.js</h2>
      <p>There are several approaches to implementing authentication in a Next.js application:</p>
      <ul>
        <li>NextAuth.js - A complete authentication solution for Next.js applications</li>
        <li>Custom JWT authentication - Using JSON Web Tokens to handle authentication yourself</li>
        <li>Third-party auth providers - Like Auth0, Firebase, or Supabase</li>
      </ul>
      
      <h2>Using NextAuth.js</h2>
      <p>NextAuth.js is a popular authentication library for Next.js applications. It provides support for multiple authentication providers, including social logins, email/password authentication, and more.</p>
      <p>To get started with NextAuth.js, you'll need to install it in your project:</p>
      <pre><code class="language-bash">npm install next-auth</code></pre>
      
      <p>Then, you can set up authentication by creating an API route at /api/auth/[...nextauth].js and configuring your authentication providers.</p>
      
      <h2>Setting Up the Auth API Route</h2>
      <p>Create a file at <code>pages/api/auth/[...nextauth].js</code> (or <code>app/api/auth/[...nextauth]/route.ts</code> in the App Router) with the following content:</p>
      <pre><code class="language-typescript">import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own logic here to validate credentials
        // ...
      }
    }),
  ],
  // Add additional configuration options
  // ...
});</code></pre>
      
      <h2>Securing Routes</h2>
      <p>Once you have authentication set up, you'll want to secure certain routes in your application. You can do this by creating a middleware that checks if the user is authenticated before allowing access to protected routes.</p>
      
      <p>Implementing authentication in a Next.js application can seem daunting at first, but with the right tools and approaches, it can be relatively straightforward.</p>
    `,
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Design beautiful and responsive user interfaces using Tailwind CSS utility classes.",
    date: "July 10, 2023",
    readTime: "10 min read",
    category: "Design",
    content: `
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>
      
      <h2>Getting Started with Tailwind CSS in Next.js</h2>
      <p>Next.js has built-in support for Tailwind CSS. To get started, you'll need to install Tailwind CSS and its peer dependencies:</p>
      <pre><code class="language-bash">npm install -D tailwindcss postcss autoprefixer</code></pre>
      
      <p>Then, generate your tailwind.config.js and postcss.config.js files:</p>
      <pre><code class="language-bash">npx tailwindcss init -p</code></pre>
      
      <p>Configure your Tailwind CSS by updating the content paths in your tailwind.config.js file:</p>
      <pre><code class="language-javascript">/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}</code></pre>
      
      <h2>Responsive Design with Tailwind CSS</h2>
      <p>Tailwind CSS makes responsive design a breeze with its responsive utility classes. You can use prefixes like sm:, md:, lg:, and xl: to apply styles at different breakpoints.</p>
      <p>For example, to create a grid layout that changes from 1 column on small screens to 2 columns on medium screens and 3 columns on large screens, you would use:</p>
      <pre><code class="language-html">&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
  &lt;!-- Grid items --&gt;
&lt;/div&gt;</code></pre>
      
      <h2>Customizing Tailwind CSS</h2>
      <p>One of the strengths of Tailwind CSS is its customizability. You can customize everything from colors to spacing to breakpoints in your tailwind.config.js file.</p>
      
      <p>Tailwind CSS is a powerful tool for building responsive and customized user interfaces in your Next.js applications.</p>
    `,
  },
  {
    id: "4",
    title: "Working with Databases in Next.js",
    excerpt: "Connect your Next.js application to databases and perform CRUD operations efficiently.",
    date: "August 22, 2023",
    readTime: "15 min read",
    category: "Databases",
    content: `
      <p>Next.js is a versatile framework that allows you to connect to various databases and perform CRUD (Create, Read, Update, Delete) operations. In this article, we'll explore how to work with databases in a Next.js application.</p>
      
      <h2>Database Options for Next.js</h2>
      <p>There are several database options available for Next.js applications:</p>
      <ul>
        <li>SQL databases: PostgreSQL, MySQL, SQLite</li>
        <li>NoSQL databases: MongoDB, Firebase, Supabase</li>
        <li>ORM tools: Prisma, Sequelize, TypeORM</li>
      </ul>
      
      <h2>Using Prisma with Next.js</h2>
      <p>Prisma is a popular ORM (Object-Relational Mapping) tool that works well with Next.js. It provides a type-safe API for querying your database and handles migrations and schema definitions.</p>
      <p>To get started with Prisma, you'll need to install it in your project:</p>
      <pre><code class="language-bash">npm install @prisma/client
npm install -D prisma</code></pre>
      
      <p>Then, initialize Prisma with your database of choice:</p>
      <pre><code class="language-bash">npx prisma init --datasource-provider postgresql</code></pre>
      
      <p>Define your schema in the <code>prisma/schema.prisma</code> file:</p>
      <pre><code class="language-prisma">// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  posts     Post[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Post {
  id        String    @id @default(cuid())
  title     String
  content   String?
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}</code></pre>
      
      <h2>Performing CRUD Operations</h2>
      <p>With Prisma set up, you can perform CRUD operations in your Next.js API routes. For example, to fetch all users from your database, you might create an API route like this:</p>
      <pre><code class="language-typescript">// pages/api/users.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}</code></pre>
      
      <p>Working with databases in Next.js is straightforward, especially with tools like Prisma that provide type safety and a clean API for database operations.</p>
    `,
  },
];

// Function to parse HTML content and replace code blocks with syntax highlighted ones
function parseContentWithSyntaxHighlighting(content: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  // Convert the HTML string to React components
  return doc.body.innerHTML;
}

export default function BlogPostPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Unwrap params using React.use() if it's a promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const post = SAMPLE_POSTS.find((post) => post.id === unwrappedParams.id);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Apply syntax highlighting after the content is mounted
    if (mounted) {
      // Initialize highlight.js
      import('highlight.js').then(hljs => {
        hljs.default.highlightAll();
        // Add language labels after highlighting
        addLanguageLabels();
      });
    }
  }, [mounted]);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative">
          <div className="flex items-center">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-6">
                <ChevronLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {post.category && (
              <div className="flex items-center text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                <Tag className="mr-1 h-3 w-3" />
                {post.category}
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1.5 h-4 w-4" />
              {post.date}
            </div>
            {post.readTime && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1.5 h-4 w-4" />
                {post.readTime}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Article card */}
        <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-sm overflow-hidden border border-border">
          <div className="p-8 md:p-10">
            <article>
              {mounted ? (
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-li:text-muted-foreground
                    prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-pre:overflow-hidden
                    prose-code:text-primary prose-code:font-medium
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
              ) : (
                <div className="animate-pulse">
                  <div className="h-6 bg-primary/10 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-primary/10 rounded w-11/12 mb-2"></div>
                  <div className="h-4 bg-primary/10 rounded w-4/5 mb-6"></div>
                  {/* More loading placeholders */}
                </div>
              )}
            </article>
          </div>
        </div>
        
        {/* Related posts section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group">
                <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/20 transition-colors duration-300 h-full flex flex-col">
                  <div className="p-6 flex flex-col h-full">
                    {relatedPost.category && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 w-fit">
                        {relatedPost.category}
                      </div>
                    )}
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {relatedPost.date}
                      </div>
                      <div className="text-primary font-medium text-sm flex items-center">
                        Read more
                        <ChevronLeft className="ml-1 h-3 w-3 rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 