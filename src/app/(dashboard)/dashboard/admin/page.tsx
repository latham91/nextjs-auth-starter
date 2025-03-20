"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useIsAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, AlertCircle, Check, Loader2 } from "lucide-react";

// Interface for user data
interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{text: string, type: 'error' | 'success'} | null>(null);
  
  const isAdmin = useIsAdmin(session);

  useEffect(() => {
    // Redirect if user is not authenticated or not an admin
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && !isAdmin) {
      router.push("/dashboard");
    }
  }, [status, router, isAdmin]);

  useEffect(() => {
    // Fetch users if user is admin
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage({
        text: "Failed to load users. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (email: string) => {
    if (actionLoading) return;
    
    setActionLoading(email);
    try {
      const response = await fetch("/api/admin/promote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to promote user");
      }

      setMessage({
        text: `Successfully promoted ${email} to admin`,
        type: "success"
      });
      
      // Update the users list
      setUsers(users.map(user => 
        user.email === email ? { ...user, role: "ADMIN" } : user
      ));
      
    } catch (error) {
      console.error("Error promoting user:", error);
      setMessage({
        text: "Failed to promote user. Please try again.",
        type: "error"
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (status === "loading" || (status === "authenticated" && !isAdmin && !loading)) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // If authenticated but not admin, don't show anything
  if (status === "authenticated" && !isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage users and permissions</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <Check className="h-5 w-5" />
          )}
          <p>{message.text}</p>
          <button 
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      )}

      <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border">
        <Table>
          <TableCaption>List of all users in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Loading users...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || 'No name'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.role !== 'ADMIN' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={actionLoading === user.email}
                        onClick={() => promoteToAdmin(user.email)}
                      >
                        {actionLoading === user.email ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-2" />
                            Promoting...
                          </>
                        ) : (
                          <>Make Admin</>
                        )}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Already admin</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 