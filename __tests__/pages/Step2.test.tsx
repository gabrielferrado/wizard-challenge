import { render, screen } from "@testing-library/react";
import Step2Page from "@/app/(app)/step2/page";
import { prisma } from "@/lib/db";

jest.mock("../../src/lib/db", () => ({
  prisma: {
    onboardingPage: {
      findFirst: jest.fn(),
    },
  },
}));

describe("Onboarding Step2 Page", () => {
  it("should render correctly", async () => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.onboardingPage.findFirst.mockResolvedValue([
      {
        id: 1,
        step: 1,
        components: [{ id: 1, componentName: "ABOUT_ME", pageId: 1 }]
      }
    ]);

    const pageElement = await Step2Page();

    render(pageElement);

    expect(screen).toMatchSnapshot();
  });

  it("should show error message if no controller is returned from db", async () => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.onboardingPage.findFirst.mockResolvedValue(undefined);

    const pageElement = await Step2Page();

    const { getByText } = render(pageElement);

    const message = getByText("Could not find the page controller!");

    expect(message).toBeTruthy();
  });
});