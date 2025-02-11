import React from "react";
import { render, screen } from "@testing-library/react";
import { useOnboarding } from "@/hooks/use-onboarding";
import Birthdate from "@/components/forms/birthdate";

jest.mock("../../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
}));

describe("Birthdate component", () => {
  const mockRegister = jest.fn(() => ({}));

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboarding as jest.Mock).mockReturnValue({
      register: mockRegister,
    });
  });

  it("should render correctly", () => {
    render(<Birthdate />);
    expect(screen).toMatchSnapshot();
  });
});