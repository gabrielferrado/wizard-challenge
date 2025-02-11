"use client";
import React from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import SPINNER from "../../public/spinner.svg";
import Image from "next/image";

const Overlay = () => {
  const { isLoading } = useOnboarding();
  return isLoading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <Image src={SPINNER} alt='Loading' />
    </div>
  ) : null;
};

export default Overlay;