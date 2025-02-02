import { render, screen } from "@testing-library/react";
import DataPage from "@/app/data/page";

describe("Onboarding Data Page", () => {
  it("should render correctly", () => {
    render(<DataPage />);
    expect(screen).toMatchSnapshot();
  });
});