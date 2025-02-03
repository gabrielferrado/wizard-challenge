"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import OnboardingManager from "@/components/onboarding-manager";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Page } from "@/interfaces/page";
import { Component } from "@/interfaces/component";
import { getComponents } from "@/http/get-components";
import { getPages } from "@/http/get-pages";
import { updateComponents } from "@/mutations/update-components";

const AdminPage = () => {
  const {
    isPending: isPendingComponents,
    error: errorComponents,
    data: components = [],
  } = useQuery<Component[]>({
    queryKey: ["components"],
    queryFn: getComponents,
  });

  const {
    isPending: isPendingPages,
    error: errorPages,
    data: pages = [],
  } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const { mutate, isError, status } = useMutation({
    mutationFn: updateComponents,
    mutationKey: ["update-components"],
  });

  const isLoading = useMemo(() => (isPendingComponents || isPendingPages), [isPendingComponents, isPendingPages]);

  const handleSubmit = useCallback((components: Component[]) => {
    mutate(components);
  }, [mutate]);

  useEffect(() => {
    if (status === "success") alert("Components updated successfully!");
  }, [status]);

  if (isLoading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  if (errorPages || errorComponents || isError) {
    console.log(errorPages);
    return (
      <pre>
        Unexpected Error
      </pre>
    );
  }

  return (
    <>
      <header>
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center">
          Admin page
        </h1>
      </header>
      <main>
        <OnboardingManager { ...{ pages, components, handleSubmit } } />
      </main>
    </>
  );
};

export default AdminPage;