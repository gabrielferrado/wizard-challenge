import { render, screen } from "@testing-library/react";
import Step3Page from "@/app/(app)/step3/page";
import { prisma } from "@/lib/db";

jest.mock("../../src/lib/db", () => ({
  prisma: {
    onboardingPage: {
      findFirst: jest.fn(),
    },
  },
}));

describe("Onboarding Step3 Page", () => {
  it("should render correctly", async () => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.onboardingPage.findFirst.mockResolvedValue([
      {
        id: 2,
        pageNumber: 2,
        components: [ { id: 1, componentName: "BIRTHDATE", pageId: 2 } ]
      }
    ]);

    const pageElement = await Step3Page();

    render(pageElement);

    expect(screen).toMatchSnapshot();
  });

  it("should show error message if no controller is returned from db", async () => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.onboardingPage.findFirst.mockResolvedValue(undefined);

    const pageElement = await Step3Page();

    const { getByText } = render(pageElement);

    const message = getByText("Could not find the page controller!");

    expect(message).toBeTruthy();
  });
});