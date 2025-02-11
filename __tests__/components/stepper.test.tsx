import React from "react";
import { render, screen } from "@testing-library/react";
import { useOnboarding } from "@/hooks/use-onboarding";
import Stepper from "@/components/stepper";

jest.mock("../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
  OnboardingAvailableForms: { SOME_COMPONENT: jest.fn() }
}));

describe("Stepper Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render only the Start bubble when availableSteps is empty (totalSteps = 1)", () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentStep: 1,
      availableSteps: [],
    });

    render(<Stepper />);

    const stepper = screen.getByTestId("stepper");
    const listItems = stepper.querySelectorAll("li");

    expect(listItems).toHaveLength(1);
    expect(listItems[0].textContent).toContain("1");
  });

  it("should render Start and End bubbles when totalSteps = 2 (availableSteps length = 1)", () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentStep: 1,
      availableSteps: [{}], // length 1 → totalSteps = 2
    });

    render(<Stepper />);

    const stepper = screen.getByTestId("stepper");
    const listItems = stepper.querySelectorAll("li");

    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toContain("1");
    expect(listItems[1].textContent).toContain("2");
  });

  it("should render Start, one MiddleStep, and End bubbles when totalSteps = 3 (availableSteps length = 2)", () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentStep: 2,
      availableSteps: [{}, {}],
    });

    render(<Stepper />);

    const stepper = screen.getByTestId("stepper");
    const listItems = stepper.querySelectorAll("li");

    expect(listItems).toHaveLength(3);
    expect(listItems[0].textContent).toContain("1");
    expect(listItems[1].textContent).toContain("2");
    expect(listItems[2].textContent).toContain("3");
  });

  it("should render active (blue) classes when currentStep is high enough", () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentStep: 3,
      availableSteps: [{}, {}],
    });
    render(<Stepper />);
    const stepper = screen.getByTestId("stepper");
    const listItems = stepper.querySelectorAll("li");

    const startSpan = listItems[0].querySelector("span");
    expect(startSpan?.classList.contains("bg-blue-700")).toBeTruthy();

    const middleSpan = listItems[1].querySelector("span");
    expect(middleSpan?.classList.contains("bg-blue-700")).toBeTruthy();

    const endSpan = listItems[2].querySelector("span");
    expect(endSpan?.classList.contains("bg-blue-700")).toBeTruthy();
  });

  it("should render inactive (gray) classes for middle and end bubbles when currentStep is low", () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentStep: 1,
      availableSteps: [{}, {}, {}],
    });
    render(<Stepper />);

    const stepper = screen.getByTestId("stepper");
    const listItems = stepper.querySelectorAll("li");
    expect(listItems).toHaveLength(4);

    const startSpan = listItems[0].querySelector("span");
    expect(startSpan?.classList.contains("bg-blue-700")).toBeTruthy();

    for (let i = 1; i < listItems.length; i++) {
      const span = listItems[i].querySelector("span");
      expect(span?.classList.contains("bg-gray-700")).toBeTruthy();
    }
  });
});
