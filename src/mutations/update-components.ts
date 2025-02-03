import { Component } from "@/interfaces/component";

export const updateComponents = async (components: Component[]) => {
  for (const { id, pageId } of components) {
    const res = await fetch("/api/components", {
      method: "PUT",
      body: JSON.stringify({ componentId: id, pageId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Could not update components");
  }
};