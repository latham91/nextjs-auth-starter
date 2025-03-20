import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'adminPassword123';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create or update the admin user
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        role: UserRole.ADMIN
      },
      create: {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: UserRole.ADMIN
      }
    });
    
    console.log(`Admin user created/updated: ${admin.name} (${admin.email})`);
    console.log(`Role: ${admin.role}`);
    console.log('You can now log in with this account and have admin privileges.');
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
seedAdmin(); 