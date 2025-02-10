import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { useOnboarding } from "@/hooks/use-onboarding";
import ControlledForm from "@/components/controlled-form";

jest.mock("../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
  OnboardingAvailableForms: { SOME_COMPONENT: jest.fn() }
}));

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockValidatePartial = jest.fn();

describe("ControlledForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboarding as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      validatePartial: mockValidatePartial,
    });
  });

  it("should render fallback if controller.components is empty or undefined", () => {
    const mockController = {
      id: 1,
      components: undefined,
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen.getByText("Could not render inputs")).toBeInTheDocument();
    const submitButton = screen.queryByTestId("submitButton");
    expect(submitButton).toBeNull();
  });

  it("should render correctly", () => {
    const mockController = {
      id: 1,
      components: [{ componentName: "SOME_COMPONENT" }],
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen).toMatchSnapshot();
  });

  it("should warn when component is not available", () => {
    const mockController = {
      id: 1,
      components: [{ componentName: "TEST" }],
    } as never;

    const spyWarn = jest.spyOn(console, "warn");

    render(<ControlledForm controller={mockController} />);
    expect(spyWarn).toHaveBeenCalledWith("Component \"TEST\" is not available.");
  });
});
