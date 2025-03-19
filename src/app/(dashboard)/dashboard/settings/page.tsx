"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default function SettingsPage() {
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
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your profile settings and account preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <nav className="space-y-1">
              <a href="#profile" className="block p-3 rounded-md bg-gray-50 text-gray-900 font-medium">
                Profile Information
              </a>
              <a href="#password" className="block p-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Password
              </a>
              <a href="#notifications" className="block p-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Notifications
              </a>
            </nav>
          </div>
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-2">
          <div id="profile">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
} 