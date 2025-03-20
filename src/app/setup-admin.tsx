"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SetupAdmin() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const promoteToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage("");

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

      setStatus('success');
      setMessage(`Successfully promoted ${email} to admin`);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 my-8">
      <h2 className="text-xl font-bold mb-4">Promote to Admin</h2>
      <p className="text-gray-600 mb-4">
        Use this form to promote a user to admin status. Enter the email address of the user you want to make an admin.
      </p>

      <form onSubmit={promoteToAdmin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full"
        >
          {status === 'loading' ? 'Processing...' : 'Make Admin'}
        </Button>

        {message && (
          <div className={`p-3 rounded text-sm ${
            status === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
} 