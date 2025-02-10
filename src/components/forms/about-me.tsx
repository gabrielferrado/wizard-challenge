import React from "react";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function AboutMe() {
  const { register } = useOnboarding();

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">
        About you
      </span>
      <div>
        <textarea
          {...register("aboutMe", { required: true })}
          data-testid="aboutMe"
          id="aboutMe"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Say something nice about you!"
          rows={10}
          required
        />
      </div>
    </div>
  );
}