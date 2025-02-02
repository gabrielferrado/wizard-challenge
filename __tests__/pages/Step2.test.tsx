import { render, screen } from "@testing-library/react";
import Step2Page from "@/app/(app)/step2/page";

describe("Onboarding Step2 Page", () => {
  it("should render correctly", () => {
    render(<Step2Page />);
    expect(screen).toMatchSnapshot();
  });
});