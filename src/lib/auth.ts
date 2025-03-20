import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

/**
 * Utility function to check if the current user has admin rights
 * Use this in server components or API routes
 */
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * Middleware-like function to protect admin routes
 * Use this in API routes to quickly reject non-admin users
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return { error: new NextResponse("Unauthorized", { status: 401 }) };
  }
  
  if (session.user.role !== "ADMIN") {
    return { error: new NextResponse("Forbidden: Admin access required", { status: 403 }) };
  }
  
  return { session };
}

/**
 * Function to be used in React client components to check
 * if the current user has admin permissions
 */
export function useIsAdmin(session: any) {
  return session?.user?.role === "ADMIN";
} 