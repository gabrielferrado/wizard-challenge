import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

it("should render correctly", () => {
  render(<Home />);

  expect(screen).toMatchSnapshot();
});