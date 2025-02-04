import { render, screen } from "@testing-library/react";
import DataPage from "@/app/data/page";
import { prisma } from "@/lib/db";

jest.mock("../../src/lib/db", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe("Onboarding Data Page", () => {
  it("should render correctly", async () => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.user.findMany.mockResolvedValue([
      {
        id: 1,
        email: "test1@example.com",
        aboutMe: "Hello world",
        streetAddress: "123 Main St",
        city: "Townsville",
        state: "TS",
        zip: "12345",
        birthdate: "2000-01-01T00:00:00.000Z",
        currentStep: 1,
        createdAt: "2021-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        email: "test2@example.com",
        aboutMe: "",
        streetAddress: null,
        city: "",
        state: "",
        zip: "",
        birthdate: null,
        currentStep: 3,
        createdAt: "2021-02-01T00:00:00.000Z",
      },
    ]);

    const pageElement = await DataPage();
    render(pageElement);

    expect(screen).toMatchSnapshot();

    expect(screen.getAllByText("-").length).toBeGreaterThanOrEqual(3);

    expect(screen.getByText("test1@example.com")).toBeTruthy();
    expect(screen.getByText("Hello world")).toBeTruthy();

    expect(screen.getByText("123 Main St, Townsville, TS 12345")).toBeTruthy();

    const expectedBirthDate = new Date("2000-01-01T00:00:00.000Z").toLocaleDateString();
    expect(screen.getByText(expectedBirthDate)).toBeTruthy();

    const expectedCreatedAt = new Date("2021-01-01T00:00:00.000Z").toLocaleString();
    expect(screen.getByText(expectedCreatedAt)).toBeTruthy();
  });
});