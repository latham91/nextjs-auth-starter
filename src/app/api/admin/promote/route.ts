import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // In a real app, you would check if the current user is already an admin
    // For simplicity, we're allowing any logged-in user to use this endpoint
    // but in production, you should restrict this to existing admins

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Find user by email and promote to admin
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Error promoting user:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 