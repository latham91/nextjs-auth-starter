import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertTriangle, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,161,170,0.15)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.1),transparent_50%)]"></div>
          
          <div className="relative flex flex-col items-center text-center z-10">
            {/* 404 number */}
            <div className="relative">
              <h1 className="text-[120px] md:text-[180px] font-bold text-zinc-800 select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileQuestion className="h-20 w-20 md:h-32 md:w-32 text-primary/70" />
              </div>
            </div>
            
            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white">Page not found</h2>
            <p className="mt-4 text-zinc-400 max-w-md mx-auto text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            {/* Action buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button className="flex items-center gap-2" size="lg">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="#">
                <Button variant="outline" className="flex items-center gap-2" size="lg">
                  <Search className="h-4 w-4" />
                  Search Site
                </Button>
              </Link>
            </div>
            
            {/* Error code indicator */}
            <div className="mt-16 flex items-center gap-2 text-zinc-500 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Error Code: 404 Page Not Found</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Next.js Auth Starter. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 