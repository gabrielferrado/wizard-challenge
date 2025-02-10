import { ComponentName, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const step2 = await prisma.onboardingPage.create({
    data: {
      pageNumber: 2,
    },
  });

  const step3 = await prisma.onboardingPage.create({
    data: {
      pageNumber: 3,
    },
  });

  await prisma.onboardingComponent.create({
    data: {
      componentName: ComponentName.ABOUT_ME,
      pageId: step2.id,
    },
  });

  await prisma.onboardingComponent.create({
    data: {
      componentName: ComponentName.BIRTHDATE,
      pageId: step3.id,
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
