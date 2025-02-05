import React from "react";
import ControlledForm from "@/components/controlled-form";
import { prisma } from "@/lib/db";

// https://stackoverflow.com/questions/74379563/next-js-13-why-isnt-my-root-page-dynamic
export const dynamic = "force-dynamic";

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
