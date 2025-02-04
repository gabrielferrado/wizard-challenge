import React from "react";
import { prisma } from "@/lib/db";
import ControlledForm from "@/components/controlled-form";

export default async function Step3Page() {
  const pageController = await prisma.onboardingPage.findFirst({ where: { pageNumber: 2 }, include: { components: true } });

  if (!pageController) {
    return (
      <pre>
        Could not find the page controller!
      </pre>
    );
  }

  return <ControlledForm controller={pageController} />;
};