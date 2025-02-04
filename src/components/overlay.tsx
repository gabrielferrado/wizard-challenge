"use client";
import React from "react";
import { useOnboarding } from "@/hooks/use-onboarding";

const Overlay = () => {
  const { isLoading } = useOnboarding();
  return isLoading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <p className="text-gray-200 text-lg font-semibold">
        Please wait...
      </p>
    </div>
  ) : null;
};

export default Overlay;