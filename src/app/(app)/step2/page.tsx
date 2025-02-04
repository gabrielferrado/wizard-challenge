import React from "react";
import ControlledForm from "@/components/controlled-form";
import { prisma } from "@/lib/db";

export default async function Step2Page() {
  const pageController = await prisma.onboardingPage.findFirst({ where: { pageNumber: 1 }, include: { components: true } });

  if (!pageController) {
    return (
      <pre>
        Could not find the page controller!
      </pre>
    );
  }

  return <ControlledForm controller={pageController}/>;
};
