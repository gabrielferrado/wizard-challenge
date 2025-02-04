import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(app)/page";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useOnboarding } from "@/hooks/use-onboarding";

jest.mock("next/navigation", () => ({
  redirect: jest.fn((url: string) => {
    return url;
  }),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("../../src/lib/db", () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock("../../src/hooks/use-onboarding", () => ({
  useOnboarding: jest.fn(),
}));

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockValidatePartial = jest.fn();

describe("Home Page", () => {
  beforeAll(() => {
    // @ts-expect-error: We're telling TypeScript that mockResolvedValue exists on our mock.
    prisma.user.findFirst.mockResolvedValue(null);

    (useOnboarding as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      validatePartial: mockValidatePartial,
    });
  });

  it("should render correctly", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const pageElement = await HomePage();

    const { getByTestId } = render(pageElement);

    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const submitButton = getByTestId("submitButton");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    expect(screen.getByText("Welcome to Zealthy Onboarding!")).toBeTruthy();

    expect(screen).toMatchSnapshot();
  });

  it("should render welcome content when session exists but has no value", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "" }),
    });

    const pageElement = await HomePage();

    render(pageElement);

    expect(screen.getByText("Welcome to Zealthy Onboarding!")).toBeTruthy();
  });

  it("should redirect to /step2 when a session exists and user.currentStep is 1", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "test@example.com" }),
    });
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      currentStep: 1,
    });

    await HomePage();
    expect(redirect).toHaveBeenCalledWith("/step2");
  });

  it("should redirect to /step3 when a session exists and user.currentStep is 2", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "test@example.com" }),
    });
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      currentStep: 2,
    });

    await HomePage();
    expect(redirect).toHaveBeenCalledWith("/step3");
  });
});