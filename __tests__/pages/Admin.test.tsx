import { render, screen } from "@testing-library/react";
import AdminPage from "@/app/admin/page";

describe("Admin Page", () => {
  it("should render correctly", () => {
    render(<AdminPage />);
    expect(screen).toMatchSnapshot();
  });
});