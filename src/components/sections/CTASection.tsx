import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

export function CTASection() {
  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to build your app?
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Start with our authentication template and focus on building your
          product, not reinventing the wheel.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <a
            href="https://github.com/latham91/nextjs-auth-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
              className="flex items-center"
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
} 