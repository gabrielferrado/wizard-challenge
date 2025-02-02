import { render, screen } from "@testing-library/react";
import Step3Page from "@/app/(app)/step3/page";

describe("Onboarding Step3 Page", () => {
  it("should render correctly", () => {
    render(<Step3Page />);
    expect(screen).toMatchSnapshot();
  });
});