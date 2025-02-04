import React from "react";
import Stepper from "@/components/stepper";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="container w-full sm:w-[60%]">
        <Stepper/>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full sm:w-[30%]">
        {children}
      </main>
    </>
  );
}
