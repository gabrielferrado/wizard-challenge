import { Component } from "@/interfaces/component";

export async function getComponents(): Promise<Component[]> {
  const data = await fetch("/api/components", { method: "GET" });
  return data.json();
}