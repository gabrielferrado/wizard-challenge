// onboarding-manager.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OnboardingManager from "@/components/onboarding-manager";
import { Page } from "@/interfaces/page";
import { Component } from "@/interfaces/component";

const mockHandleSubmit = jest.fn();

const mockPages: Page[] = [
  { id: 1, pageNumber: 1 },
  { id: 2, pageNumber: 2 },
];

describe("OnboardingManager", () => {
  it("renders successfully", () => {
    const mockComponents: Component[] = [
      {
        id: 100,
        pageId: 1,
        componentName: "ABOUT_ME",
      },
      {
        id: 101,
        pageId: 2,
        componentName: "ADDRESS",
      },
      {
        id: 102,
        pageId: null,
        componentName: "BIRTHDATE",
      },
    ];

    render(
      <OnboardingManager
        pages={mockPages}
        components={mockComponents}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders the Save button if all pages have at least one component assigned", () => {
    const mockComponents: Component[] = [
      {
        id: 100,
        pageId: 1,
        componentName: "ABOUT_ME",
      },
      {
        id: 101,
        pageId: 2,
        componentName: "ADDRESS",
      },
      {
        id: 102,
        pageId: null,
        componentName: "BIRTHDATE",
      },
    ];

    render(
      <OnboardingManager
        pages={mockPages}
        components={mockComponents}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByTestId("submitButton")).toBeInTheDocument();
    expect(screen.queryByText("Each page should have at least one component!")).toBeNull();
  });

  it("should update component assignment on radio button change", () => {
    const mockComponents: Component[] = [
      {
        id: 100,
        pageId: 1,
        componentName: "ABOUT_ME",
      },
      {
        id: 101,
        pageId: 2,
        componentName: "ADDRESS",
      },
      {
        id: 102,
        pageId: 2,
        componentName: "BIRTHDATE",
      },
    ];

    render(
      <OnboardingManager
        pages={mockPages}
        components={mockComponents}
        handleSubmit={mockHandleSubmit}
      />
    );

    const hideRadio = screen.getByTestId("ADDRESS-hide");

    fireEvent.click(hideRadio);
    fireEvent.click(screen.getByTestId("submitButton"));

    expect(mockHandleSubmit).toHaveBeenCalledWith([
      {
        id: 100,
        pageId: 1,
        componentName: "ABOUT_ME",
      },
      {
        id: 101,
        pageId: null,
        componentName: "ADDRESS",
      },
      {
        id: 102,
        pageId: 2,
        componentName: "BIRTHDATE",
      },
    ]);
    expect(hideRadio).toBeChecked();
  });

  it("renders error message when at least one page does not have a component assigned", () => {
    const mockComponents: Component[] = [
      {
        id: 100,
        pageId: 1,
        componentName: "ABOUT_ME",
      },
      {
        id: 101,
        pageId: null,
        componentName: "ADDRESS",
      },
      {
        id: 102,
        pageId: null,
        componentName: "BIRTHDATE",
      },
    ];

    render(
      <OnboardingManager
        pages={mockPages}
        components={mockComponents}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByText("Each page should have at least one component!")).toBeTruthy();

    const submitButton = screen.queryByTestId("submitButton");
    expect(submitButton).toBeNull();
  });
});
