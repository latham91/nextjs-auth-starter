"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Settings, Users, FileText, Bell } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {session?.user?.name || "User"}!</p>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Notifications</p>
              <h3 className="text-2xl font-bold mt-1">5</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/settings" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-gray-500 mr-3" />
              <span>Account Settings</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </Link>
          
          <Link href="/blog" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-3" />
              <span>Blog</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </Link>
          
          <Link href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-3" />
              <span>Team</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </Link>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="bg-gray-100 rounded-full p-2 mr-4">
                <Bell className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New notification received</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 