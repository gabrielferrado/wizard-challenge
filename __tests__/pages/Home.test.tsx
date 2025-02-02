import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(app)/page";

describe("Home Page", () => {
  it("should render correctly", () => {
    render(<HomePage />);
    expect(screen).toMatchSnapshot();
  });
});