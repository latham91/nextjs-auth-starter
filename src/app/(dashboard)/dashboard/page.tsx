"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIsAdmin } from "@/lib/auth";
import {
  Users,
  FileText,
  Bell,
  Shield,
  Settings,
  BarChart3,
  Calendar,
  Activity,
  Server,
  User,
  LogOut,
  ArrowUpRight,
  ChevronDown,
  EyeOff,
  Layers,
  Pencil,
  Trash2,
  Search,
  PlusCircle,
  Filter,
  ArrowLeft,
  ArrowRight,
  UserCog,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = useIsAdmin(session);
  const [activeTab, setActiveTab] = useState("overview");
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && !isAdmin) {
      router.push("/");
      return;
    }
    
    // Fetch recent users if admin
    if (isAdmin) {
      fetchRecentUsers();
    }
  }, [status, router, isAdmin]);

  const fetchRecentUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      
      const data = await response.json();
      setRecentUsers(data.users.slice(0, 5));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || (status === "authenticated" && !isAdmin && loading)) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700">Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  // If not admin, don't show anything
  if (status === "authenticated" && !isAdmin) {
    return null;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <FileText className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const stats = [
    { 
      label: "Total Users", 
      value: "254", 
      change: "+12%", 
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    { 
      label: "Active Today", 
      value: "32", 
      change: "+8%", 
      trend: "up",
      icon: <Activity className="h-5 w-5 text-green-500" />
    },
    { 
      label: "Blog Posts", 
      value: "48", 
      change: "+5%", 
      trend: "up",
      icon: <FileText className="h-5 w-5 text-purple-500" />
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-500">
              Manage your site, users, and content from a single place.
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-2 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-100 p-6 hover:border-gray-200 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs font-medium ${
                          stat.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">vs last week</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="flex items-center bg-gray-900 hover:bg-gray-800 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
            
            {/* Recent Users */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Users</h2>
                  <Link href="/dashboard/admin" className="text-sm font-medium text-gray-900 hover:text-gray-700 flex items-center">
                    View all users
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            Loading users...
                          </td>
                        </tr>
                      ) : recentUsers.length > 0 ? (
                        recentUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {user.image ? (
                                    <img src={user.image} alt={user.name || ""} className="h-full w-full object-cover" />
                                  ) : (
                                    <span className="text-sm font-medium text-gray-600">
                                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </span>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name || "No name"}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "ADMIN" 
                                  ? "bg-gray-100 text-gray-800" 
                                  : "bg-gray-50 text-gray-600"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100" title="Edit User">
                                  <Pencil className="h-4 w-4" />
                                </button>
                                {user.role !== "ADMIN" && (
                                  <button className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100" title="Make Admin">
                                    <ShieldCheck className="h-4 w-4" />
                                  </button>
                                )}
                                <button className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100" title="Delete User">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
              <Button className="flex items-center bg-gray-900 hover:bg-gray-800 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg border border-gray-100 p-6 flex justify-between items-center hover:border-gray-200 transition-all">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Getting Started with Next.js</h3>
                  <p className="text-sm text-gray-500">Published on May 15, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                    <EyeOff className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-100 p-6 flex justify-between items-center hover:border-gray-200 transition-all">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Authentication in Next.js Applications</h3>
                  <p className="text-sm text-gray-500">Published on June 2, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                    <EyeOff className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                <div>Showing 2 of 48 posts</div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
            
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Site Configuration</h3>
                  <div className="grid grid-cols-1 gap-6 max-w-2xl">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <Input id="siteName" defaultValue="NextJS Auth Starter" className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" />
                    </div>
                    <div>
                      <label htmlFor="siteDesc" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Description
                      </label>
                      <Input id="siteDesc" defaultValue="A starter template for Next.js applications with authentication" className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Authentication Settings</h3>
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Confirmation Required</p>
                        <p className="text-xs text-gray-500 mt-1">Require email confirmation before users can log in</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none">
                          <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500 mt-1">Require 2FA for admin users</p>
                      </div>
                      <div className="flex items-center">
                        <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-900 transition-colors duration-200 ease-in-out focus:outline-none">
                          <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 