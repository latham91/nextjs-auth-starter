"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { 
  User, 
  KeyRound, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  LogOut, 
  Loader2,
  Settings as SettingsIcon
} from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading your settings...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile Information", icon: <User className="h-4 w-4" /> },
    { id: "password", label: "Password", icon: <KeyRound className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "devices", label: "Connected Devices", icon: <Smartphone className="h-4 w-4" /> },
    { id: "appearance", label: "Appearance", icon: <Globe className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <SettingsIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile settings and account preferences.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border/40">
            <div className="p-4 border-b border-border/60 bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="font-medium text-primary">
                        {session?.user?.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="overflow-hidden">
                  <div className="font-medium truncate">{session?.user?.name || "User"}</div>
                  <div className="text-xs text-muted-foreground truncate">{session?.user?.email || ""}</div>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 text-sm transition-colors ${
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
              
              <div className="pt-2 mt-2 border-t border-border/60">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-sm transition-colors text-red-500 hover:bg-red-500/10">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div id="profile" className="animate-in fade-in duration-200">
              <ProfileForm />
            </div>
          )}
          
          {activeTab === "password" && (
            <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border/40 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <KeyRound className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Password Settings</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Password settings will be implemented soon. Check back later.
              </p>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border/40 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Notification Preferences</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Notification settings will be implemented soon. Check back later.
              </p>
            </div>
          )}
          
          {(activeTab === "security" || activeTab === "devices" || activeTab === "appearance") && (
            <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border/40 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {activeTab === "security" && <Shield className="h-5 w-5 text-primary" />}
                  {activeTab === "devices" && <Smartphone className="h-5 w-5 text-primary" />}
                  {activeTab === "appearance" && <Globe className="h-5 w-5 text-primary" />}
                </div>
                <h2 className="text-2xl font-bold">
                  {activeTab === "security" && "Security Settings"}
                  {activeTab === "devices" && "Connected Devices"}
                  {activeTab === "appearance" && "Appearance Settings"}
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                This feature will be implemented soon. Check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 