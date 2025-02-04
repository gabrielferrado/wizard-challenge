import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { patchUser } from "@/http/patch-user";
import { useMutation } from "@tanstack/react-query";

type Inputs = {
  email: string
  password: string
  aboutMe: string
  streetAddress: string
  city: string
  state: string
  zip: string
  birthdate: string
}

type OnboardingContextProps = {
  isLoading: boolean
  currentStep: number
  reset: UseFormReset<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  register: UseFormRegister<Inputs>
  validatePartial: (data: Partial<Inputs>) => void,
}

const OnboardingContext = createContext<OnboardingContextProps>({} as never);

const OnboardingContextProvider: React.FC<
  React.PropsWithChildren & {
  data?: OnboardingContextProps
}
> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: upsertUser, isPending } = useMutation({
    mutationFn: patchUser,
    mutationKey: ["upsert-user"]
  });
  const {
    register,
    handleSubmit,
    reset
  } = useForm<Inputs>();

  const currentStep = useMemo(() => {
    switch (pathname) {
    case "/step2":
      return 2;
    case "/step3":
      return 3;
    default:
      return 1;
    }
  }, [pathname]);

  const validatePartial = useCallback((data: Partial<Inputs>) => {
    switch (currentStep) {
    case 1:
      Cookies.set("SESSION", String(data.email), { expires: 7 });
      upsertUser(data);
      return router.push("/step2");
    case 2:
      upsertUser({ ...data, currentStep });
      return router.push("/step3");
    case 3:
      upsertUser({ ...data, currentStep });
      return router.push("/data");
    default:
      return null;
    }
  }, [currentStep, router, upsertUser]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        register,
        handleSubmit,
        reset,
        validatePartial,
        isLoading: isPending
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext<OnboardingContextProps>(OnboardingContext);
export { OnboardingContextProvider };
