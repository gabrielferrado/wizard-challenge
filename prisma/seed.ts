import { ComponentName, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const page1 = await prisma.onboardingPage.create({
    data: {
      pageNumber: 1,
    },
  });

  const page2 = await prisma.onboardingPage.create({
    data: {
      pageNumber: 2,
    },
  });

  await prisma.onboardingComponent.create({
    data: {
      componentName: ComponentName.ABOUT_ME,
      pageId: page1.id,
    },
  });

  await prisma.onboardingComponent.create({
    data: {
      componentName: ComponentName.BIRTHDATE,
      pageId: page2.id,
    },
  });

  await prisma.onboardingComponent.create({
    data: {
      componentName: ComponentName.ADDRESS,
      pageId: null,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
