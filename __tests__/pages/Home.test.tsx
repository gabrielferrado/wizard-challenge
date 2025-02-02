import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(app)/page";

describe("Home Page", () => {
  it("should render correctly", () => {
    render(<HomePage />);
    expect(screen).toMatchSnapshot();
  });

  it("should find stepper component", () => {
    const { getByTestId } = render(<HomePage />);

    const stepper = getByTestId("stepper");

    expect(stepper).toBeTruthy();
  });

  it("should find all required inputs", () => {
    const { getByTestId } = render(<HomePage />);

    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const submitButton = getByTestId("submitButton");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });
});