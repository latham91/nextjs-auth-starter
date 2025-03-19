"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { User, Mail, Check, Loader2, AlertCircle, Camera } from "lucide-react";

export function ProfileForm() {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      await update();
      setSuccess("Profile updated successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border/40">
      <div className="flex items-center space-x-3 p-6 border-b border-border/60">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Profile Information</h2>
      </div>
      
      <div className="p-6">
        {/* Avatar section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 p-6 bg-muted/20 rounded-lg border border-border/40">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-medium text-primary">
                  {session?.user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium">{session?.user?.name || "User"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{session?.user?.email || ""}</p>
            <div className="text-xs text-muted-foreground">
              We recommend a square image of at least 300x300 pixels.
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>{success}</div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Display Name
            </label>
            <Input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg"
            />
            <p className="text-xs text-muted-foreground">
              This is the name that will be displayed on your profile and in emails.
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email Address
            </label>
            <Input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
              className="px-4 py-3 rounded-lg bg-muted/30"
            />
            <p className="text-xs text-muted-foreground">
              Your email address is used for signing in and notifications.
            </p>
          </div>
          
          <div className="pt-4 border-t border-border/60 flex justify-end">
            <Button 
              type="submit" 
              className="py-2 px-4 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 