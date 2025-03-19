'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
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

export default function BlogPostPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Unwrap params using React.use() if it's a promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch
    const fetchPost = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundPost = SAMPLE_POSTS.find((p) => p.id === unwrappedParams.id);
        if (foundPost) {
          setPost(foundPost);
        }
        setIsLoading(false);
      }, 500);
    };

    fetchPost();
  }, [unwrappedParams.id]);

  if (!post && !isLoading) {
    notFound();
  }

  // Process the content to add syntax highlighting
  const processContent = (content?: string) => {
    if (!content) return '';
    return content;
  };

  // Apply syntax highlighting when the post content is available
  useEffect(() => {
    if (post?.content) {
      const applyHighlighting = () => {
        // First initialize highlight.js
        import('highlight.js').then((hljs) => {
          hljs.default.highlightAll();
          
          // Then add language labels - make sure all pre elements have the data-language attribute
          const preElements = document.querySelectorAll('pre');
          preElements.forEach(pre => {
            const code = pre.querySelector('code');
            if (!code) return;
            
            // Extract language from the class name (language-xxx)
            const classes = Array.from(code.classList);
            const languageClass = classes.find(cls => cls.startsWith('language-'));
            
            if (languageClass) {
              const language = languageClass.replace('language-', '');
              // Set the data-language attribute on the pre element
              pre.setAttribute('data-language', language);
            }
          });
        });
      };

      // Need to wait for the content to be rendered in the DOM
      setTimeout(applyHighlighting, 100);
    }
  }, [post]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>
        </div>

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          </div>
        ) : post ? (
          <>
            <article>
              {/* Custom styles for code blocks language labels */}
              <style jsx global>{`
                .prose pre {
                  position: relative;
                  margin-top: 2.5rem !important;
                }
                
                .prose pre::before {
                  content: attr(data-language);
                  position: absolute;
                  top: -1.75rem;
                  left: 0;
                  padding: 0.25rem 0.75rem;
                  font-size: 0.75rem;
                  font-weight: 500;
                  color: #abb2bf;
                  background-color: #282c34;
                  border-top-left-radius: 0.375rem;
                  border-top-right-radius: 0.375rem;
                  border: 1px solid #3e4451;
                  border-bottom: none;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                }
              `}</style>
              
              <header className="mb-10">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                  <span className="flex items-center">
                    <Tag className="mr-1.5 h-3.5 w-3.5" />
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                <p className="text-gray-600 text-xl">{post.excerpt}</p>
              </header>

              <div 
                className={`prose prose-gray max-w-none 
                  prose-headings:text-gray-900 
                  prose-p:text-gray-700 
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-pre:bg-[#282c34] prose-pre:shadow-md 
                  prose-pre:border prose-pre:border-gray-700 
                  prose-pre:rounded-lg 
                  prose-pre:my-6 prose-pre:mt-8
                  prose-code:text-[#abb2bf]
                  [&_pre_code]:p-4 [&_pre]:p-0`}
                dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
              />
              
              <div className="mt-16 pt-8 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-sm font-medium text-gray-900">Share this article</h3>
                    <div className="flex space-x-2 mt-2">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.615 11.615 0 006.29 1.84" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <Link href="/blog">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View all articles
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </>
        ) : null}
      </div>
    </div>
  );
} 