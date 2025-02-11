import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as ReactQuery from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

import AdminPage from "@/app/admin/page";

global.alert = jest.fn();

jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual<typeof ReactQuery>("@tanstack/react-query");

  return {
    ...actual,
    useQuery: jest.fn(),
    useMutation: jest.fn(),
  };
});

describe("AdminPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useQuery as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: "some-component", pageId: 1 }],
      isPending: false,
      error: null,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isError: false,
      status: "idle",
    });
  });

  it("should render page successfully", () => {
    render(<AdminPage />);

    expect(screen).toMatchSnapshot();
  });

  it("should render loading state when queries are pending", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isPending: true,
      error: null,
      data: [],
    }));

    render(<AdminPage />);

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("should render error state if queries fail", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isPending: false,
      error: new Error("Failed to load"),
      data: [],
    }));

    render(<AdminPage />);

    expect(screen.getByText("Unexpected Error")).toBeTruthy();
  });

  it("should call mutate successfully", () => {
    const mockMutate = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    render(<AdminPage />);

    fireEvent.click(screen.getByTestId("submitButton"));

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("should trigger success alert when mutation status is 'success'", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isError: false,
      status: "success",
    });

    render(<AdminPage />);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Components updated successfully!");
    });
  });
});
