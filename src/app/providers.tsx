"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "@/lib/react-query";
import { OnboardingContextProvider } from "@/hooks/use-onboarding";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingContextProvider>
        {children}
      </OnboardingContextProvider>
    </QueryClientProvider>
  );
}
