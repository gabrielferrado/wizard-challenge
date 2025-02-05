import React from "react";
import { prisma } from "@/lib/db";
import sanitizeAddress from "@/util/sanitize-address";

// https://stackoverflow.com/questions/74379563/next-js-13-why-isnt-my-root-page-dynamic
export const dynamic = "force-dynamic";

export default async function DataPage (){
  const users = await prisma.user.findMany();

  return (
    <>
      <header>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
          Data page
        </h1>
      </header>
      <main className="relative overflow-x-auto p-4 h-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                About Me
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Birthdate
              </th>
              <th scope="col" className="px-6 py-3">
                Current Step
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.id}
                  </th>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.aboutMe || "-"}
                  </td>
                  <td data-testid="user-address"  className="px-6 py-4">
                    {sanitizeAddress(user)}
                  </td>
                  <td className="px-6 py-4">
                    {user.birthdate
                      ? new Date(user.birthdate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {user.currentStep > 2 ? "Finished Onboarding" : user.currentStep}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};
