"use client";
import React, { useMemo } from "react";
import { OnboardingAvailableForms, useOnboarding } from "@/hooks/use-onboarding";
import { Page } from "@/interfaces/page";

const ControlledForm: React.FC<{ controller: Page }> = ({ controller }) => {
  const {
    handleSubmit,
    validatePartial
  } = useOnboarding();

  const sanitizedInputs = useMemo(() => {
    if (!controller?.components) return [];

    return controller.components
      .map((compConfig) => {
        const { componentName } = compConfig;
        const Component = OnboardingAvailableForms[componentName];
        if (!Component) {
          console.warn(`Component "${componentName}" is not available.`);
          return null;
        }
        return { componentName, Component };
      })
      .filter(Boolean) as { componentName: string; Component: React.FC }[];
  }, [controller]);

  if (!sanitizedInputs.length) {
    return (
      <pre>
        Could not render inputs
      </pre>
    );
  }

  return (
    <form
      className='w-full flex flex-col gap-6'
      onSubmit={handleSubmit(validatePartial)}
    >
      {sanitizedInputs.map(({ componentName, Component }, index) => (
        <Component key={`${componentName}-${index}`} />
      ))}

      <button
        data-testid='submitButton'
        type="submit"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;