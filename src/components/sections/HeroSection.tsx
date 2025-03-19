import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 lg:pt-40 lg:pb-48 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
            <span className="block">Next.js Auth</span>
            <span className="block mt-2">
              <span className="text-gray-400">Starter</span> Template
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-400">
            A complete authentication solution with Next.js, NextAuth, and
            Prisma. Ready to use, fully customizable.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="secondary"
                size="lg"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 