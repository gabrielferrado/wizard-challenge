import { prisma } from "@/lib/db";

export async function GET() {
  const data = await prisma.onboardingPage.findMany();
  return Response.json(data);
}