"use client";
import React, { useMemo } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";

interface StepProps {
  currentStep: number;
}

const Start: React.FC<StepProps> = ({ currentStep }) => {
  return (
    <li
      className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
        currentStep > 1 ? "after:border-blue-700" : "after:border-gray-700"
      }`}
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-blue-700 shrink-0">
        <span className="text-white font-bold">
          1
        </span>
      </span>
    </li>
  );
};

const MiddleStep: React.FC<StepProps & { stepNumber: number }> = ({ stepNumber, currentStep }) => {
  return (
    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${currentStep > stepNumber ? "after:border-blue-700" : "after:border-gray-700"}`}>
      <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${currentStep >= stepNumber ? "bg-blue-700" : "bg-gray-700"} shrink-0`}>
        <span className="text-white font-bold">
          {stepNumber}
        </span>
      </span>
    </li>
  );
};

const End: React.FC<StepProps & { totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <li className="flex items-center">
      <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${currentStep === totalSteps ? "bg-blue-700" : "bg-gray-700"} shrink-0`}>
        <span className="text-white font-bold">
          {totalSteps}
        </span>
      </span>
    </li>
  );
};

const Stepper: React.FC = () => {
  const { currentStep, availableSteps } = useOnboarding();

  const totalSteps = useMemo(
    () => (availableSteps && availableSteps.length ? availableSteps.length + 1 : 1),
    [availableSteps]
  );

  return (
    <ol data-testid="stepper" className="flex items-center w-full">
      <Start currentStep={currentStep} />
      {totalSteps > 2 &&
        Array.from({ length: totalSteps - 2 }, (_, index) => (
          <MiddleStep key={index} stepNumber={index + 2} currentStep={currentStep} />
        ))}
      {totalSteps > 1 && <End currentStep={currentStep} totalSteps={totalSteps} />}
    </ol>
  );
};

export default Stepper;