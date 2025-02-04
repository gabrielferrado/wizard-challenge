"use client";
import React, { useMemo } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Page } from "@/interfaces/page";
import { Component } from "@/interfaces/component";

const InputRenderer: React.FC<{ inputs: Component["componentName"][] }> = ({ inputs }) => {
  const {
    register,
  } = useOnboarding();

  return (
    <>
      {inputs.includes("ABOUT_ME") && (
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

      )}
      {inputs.includes("ADDRESS") && (
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">
            Address
          </span>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="streetAddress"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  {...register("streetAddress", { required: true })}
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  autoComplete="streetAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  {...register("city", { required: true })}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  {...register("state", { required: true })}
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="zip"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ZIP code
              </label>
              <div className="mt-2">
                <input
                  {...register("zip", { required: true })}
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {inputs.includes("BIRTHDATE") && (
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
      )}
    </>
  );
};

const ControlledForm: React.FC<{ controller: Page }> = ({ controller }) => {
  const {
    handleSubmit,
    validatePartial
  } = useOnboarding();

  const sanitizedInputs = useMemo(() => controller.components?.map(el => el.componentName), [controller]);

  if (!sanitizedInputs || !sanitizedInputs.length) {
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
      <InputRenderer inputs={sanitizedInputs}/>

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