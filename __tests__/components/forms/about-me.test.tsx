import React from "react";
import { render, screen } from "@testing-library/react";
import { useOnboarding } from "@/hooks/use-onboarding";
import AboutMe from "@/components/forms/about-me";

jest.mock("../../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
}));

describe("AboutMe component", () => {
  const mockRegister = jest.fn(() => ({}));

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboarding as jest.Mock).mockReturnValue({
      register: mockRegister,
    });
  });

  it("should render correctly", () => {
    render(<AboutMe />);
    expect(screen).toMatchSnapshot();
  });
});