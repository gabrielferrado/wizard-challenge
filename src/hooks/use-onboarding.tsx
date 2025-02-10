import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { patchUser } from "@/http/patch-user";
import { useMutation, useQuery } from "@tanstack/react-query";
import AboutMeForm from "@/components/forms/about-me";
import AddressForm from "@/components/forms/address";
import BirthdateForm from "@/components/forms/birthdate";
import getStepNumber from "@/util/get-step-number";
import { Page } from "@/interfaces/page";
import { getPages } from "@/http/get-pages";
import Image from "next/image";
import SPINNER from "../../public/spinner.svg";

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
  currentStep: number
  isLoading: boolean
  reset: UseFormReset<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  register: UseFormRegister<Inputs>
  validatePartial: (data: Partial<Inputs>) => void,
  availableSteps?: number[]
}

const OnboardingContext = createContext<OnboardingContextProps>({} as never);

export const OnboardingAvailableForms = {
  ABOUT_ME: AboutMeForm,
  ADDRESS: AddressForm,
  BIRTHDATE: BirthdateForm,
};

const OnboardingContextProvider: React.FC<
  React.PropsWithChildren & {
  data?: OnboardingContextProps
}> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: upsertUser, isPending } = useMutation({
    mutationFn: patchUser,
    mutationKey: ["upsert-user"]
  });

  const {
    isLoading,
    data: pages = [],
  } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const {
    register,
    handleSubmit,
    reset
  } = useForm<Inputs>();

  const availableSteps = useMemo(() => pages.map(page => page.step), [pages]);

  const currentStep = useMemo(() => {
    if (!pathname.includes("step")) return 1;

    return getStepNumber(pathname);
  }, [pathname]);

  const validatePartial = useCallback((data: Partial<Inputs>) => {
    const nextStep = currentStep + 1;
    const hasNextStep = availableSteps.includes(nextStep);

    if (currentStep === 1 && hasNextStep) {
      Cookies.set("SESSION", String(data.email), { expires: 7 });
      upsertUser({ ...data, currentStep });
      return router.push(`/step${nextStep}`);
    }

    if (hasNextStep) {
      upsertUser({ ...data, currentStep });
      return router.push(`/step${nextStep}`);
    } else {
      upsertUser({ ...data, currentStep });
      return router.push("/data");
    }
  }, [currentStep, availableSteps, router, upsertUser]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <Image priority src={SPINNER} alt='Loading' />
      </div>
    );
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        register,
        handleSubmit,
        reset,
        validatePartial,
        isLoading: isPending,
        availableSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext<OnboardingContextProps>(OnboardingContext);
export { OnboardingContextProvider };
