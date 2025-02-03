import { Component } from "@/interfaces/component";
import { updateComponents } from "@/mutations/update-components";

global.fetch = jest.fn();

describe("updateComponents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls fetch with correct parameters for each component", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    const components: Component[] = [
      { id: 1, pageId: 2, componentName: "ABOUT_ME" },
      { id: 2, pageId: null, componentName: "ADDRESS" },
    ];

    await updateComponents(components);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(fetch).toHaveBeenNthCalledWith(1, "/api/components", {
      method: "PUT",
      body: JSON.stringify({ componentId: 1, pageId: 2 }),
      headers: { "Content-Type": "application/json" },
    });

    expect(fetch).toHaveBeenNthCalledWith(2, "/api/components", {
      method: "PUT",
      body: JSON.stringify({ componentId: 2, pageId: null }),
      headers: { "Content-Type": "application/json" },
    });
  });

  it("throws an error if fetch response is not OK", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const components: Component[] = [
      { id: 1, pageId: 2, componentName: "ABOUT_ME" },
    ];

    await expect(updateComponents(components)).rejects.toThrow(
      "Could not update components"
    );
  });
});
