import React from "react";
import { render, screen } from "@testing-library/react";
import { useOnboarding } from "@/hooks/use-onboarding";
import Address from "@/components/forms/address";

jest.mock("../../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
}));

describe("Address component", () => {
  const mockRegister = jest.fn(() => ({}));

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboarding as jest.Mock).mockReturnValue({
      register: mockRegister,
    });
  });

  it("should render correctly", () => {
    render(<Address />);
    expect(screen).toMatchSnapshot();
  });
});