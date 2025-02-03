import { Page } from "@/interfaces/page";

export async function getPages(): Promise<Page[]> {
  const data = await fetch("/api/pages", { method: "GET" });
  return data.json();
}