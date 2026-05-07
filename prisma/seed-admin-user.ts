import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdminUser() {
  console.log('\n🔐 Seeding admin user into User table...');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      '❌ ADMIN_EMAIL or ADMIN_PASSWORD is missing in environment variables'
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log('⚠️ Admin user already exists. Updating to admin...');

    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        isAdmin: true,
      },
    });

    console.log('✅ User marked as admin');
  } else {
    const hash = await bcrypt.hash(adminPassword, 12);

    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hash,
        isAdmin: true,
        isVerified: true,
      },
    });

    console.log('✅ Admin user created');
  }

  console.log('\n📋 Admin Credentials:');
  console.log('─────────────────────────────────');
  console.log(`  Email: ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
  console.log('─────────────────────────────────');

  await prisma.$disconnect();
}

seedAdminUser().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});