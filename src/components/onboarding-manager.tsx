"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Component } from "@/interfaces/component";
import { Page } from "@/interfaces/page";

type OnboardingManagerProps = {
  pages: Page[],
  components: Component[],
  handleSubmit: (components: Component[]) => void
}

const OnboardingManager: React.FC<OnboardingManagerProps> = ({ pages, components, handleSubmit }) => {
  const [machine, setMachine] = useState(components);

  const isValid = useMemo(() => {
    return pages.every((page) =>
      machine.some((component) => component.pageId === page.id)
    );
  }, [machine, pages]);

  const handlePageChange = useCallback((componentId: number, page: number | null) => {
    setMachine((prev) =>
      prev.map((comp) =>
        comp.id === componentId ? { ...comp, pageId: page } : comp
      ));
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(machine);
      }}
      className="w-full p-4 space-y-4"
    >
      {machine.map((component) => (
        <div
          key={component.id}
          className="border border-gray-100/20 p-4 rounded grid grid-cols-5 gap-4"
        >
          <p className="font-bold col-span-2">
            {component.componentName}
          </p>
          <div className="flex">
            <input
              data-testid={`${component.componentName}-step2`}
              id={`${component.componentName}-step2`}
              checked={component.pageId === 1}
              type="radio"
              value="1"
              name={component.componentName}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => handlePageChange(component.id, 1)}
            />
            <label
              htmlFor={`${component.componentName}-step2`}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Step 2
            </label>
          </div>
          <div className="flex">
            <input
              data-testid={`${component.componentName}-step3`}
              id={`${component.componentName}-step3`}
              checked={component.pageId === 2}
              type="radio"
              value="2"
              name={component.componentName}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => handlePageChange(component.id, 2)}
            />
            <label
              htmlFor={`${component.componentName}-step3`}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Step 3
            </label>
          </div>
          <div className="flex">
            <input
              data-testid={`${component.componentName}-hide`}
              id={`${component.componentName}-hide`}
              checked={component.pageId === null}
              type="radio"
              value=""
              name={component.componentName}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-300"
              onChange={() => handlePageChange(component.id, null)}
            />
            <label
              htmlFor={`${component.componentName}-hide`}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Hide
            </label>
          </div>
        </div>
      ))}
      {isValid ? (
        <button
          disabled={!isValid}
          data-testid='submitButton'
          type="submit"
          className="text-white enabled:bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800 disabled:bg-gray-400"
        >
          Save
        </button>
      ) : (
        <div className='rounded border border-red-700 text-red-500 p-4 mb-8 flex flex-col gap-2'>
          <h3 className="font-bold">
            ⚠️ Error
          </h3>
          Each page should have at least one component!
        </div>
      )}
    </form>
  );
};

export default OnboardingManager;