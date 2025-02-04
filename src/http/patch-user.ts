import { User } from "@/interfaces/user";

export async function patchUser(user: Partial<User>): Promise<unknown> {
  const data = await fetch("/api/user", {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" }
  });
  return data.json();
}