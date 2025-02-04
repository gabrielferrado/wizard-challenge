import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useOnboarding } from "@/hooks/use-onboarding";
import ControlledForm from "@/components/controlled-form";

jest.mock("../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
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

  it("renders fallback if controller.components is empty or undefined", () => {
    const mockController = {
      id: 1,
      components: [],
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen.getByText("Could not render inputs")).toBeInTheDocument();
    const submitButton = screen.queryByTestId("submitButton");
    expect(submitButton).toBeNull();
  });

  it("renders ABOUT_ME fields if included", () => {
    const mockController = {
      id: 1,
      components: [
        { componentName: "ABOUT_ME" },
      ],
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen.getByText("About you")).toBeInTheDocument();
    expect(screen.getByTestId("aboutMe")).toBeInTheDocument();
    expect(screen.queryByLabelText("Street address")).toBeNull();
    expect(screen.queryByLabelText("Birthdate")).toBeNull();
  });

  it("renders ADDRESS fields if included", () => {
    const mockController = {
      id: 1,
      components: [
        { componentName: "ADDRESS" },
      ],
    } as never;

    render(<ControlledForm controller={mockController} />);

    expect(screen.getByLabelText("Street address")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("ZIP code")).toBeInTheDocument();
    expect(screen.queryByTestId("aboutMe")).toBeNull();
    expect(screen.queryByLabelText("Birthdate")).toBeNull();
  });

  it("renders BIRTHDATE field if included", () => {
    const mockController = {
      id: 1,
      components: [
        { componentName: "BIRTHDATE" },
      ],
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen.getByLabelText("Birthdate")).toBeInTheDocument();
    expect(screen.queryByTestId("aboutMe")).toBeNull();
    expect(screen.queryByLabelText("Street address")).toBeNull();
  });

  it("renders multiple inputs if multiple componentNames are included", () => {
    const mockController = {
      id: 1,
      components: [
        { componentName: "ABOUT_ME" },
        { componentName: "ADDRESS" },
        { componentName: "BIRTHDATE" },
      ],
    } as never;

    render(<ControlledForm controller={mockController} />);
    expect(screen.getByTestId("aboutMe")).toBeInTheDocument();
    expect(screen.getByLabelText("Street address")).toBeInTheDocument();
    expect(screen.getByLabelText("Birthdate")).toBeInTheDocument();
  });

  it("submits the form and calls handleSubmit", () => {
    const mockController = {
      id: 1,
      components: [
        { componentName: "ABOUT_ME" },
      ],
    } as never;

    render(<ControlledForm controller={mockController} />);

    fireEvent.click(screen.getByTestId("submitButton"));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
