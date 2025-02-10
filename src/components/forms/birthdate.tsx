import React from "react";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function Birthdate() {
  const { register } = useOnboarding();

  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="birthdate"
        className="text-2xl font-bold"
      >
        Birthdate
      </label>
      <div className="mt-2">
        <input
          {...register("birthdate", { required: true })}
          name="birthdate"
          id="birthdate"
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select your birthdate"
        />
      </div>
    </div>
  );
}