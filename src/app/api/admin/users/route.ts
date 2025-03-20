import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Check if user is admin
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 