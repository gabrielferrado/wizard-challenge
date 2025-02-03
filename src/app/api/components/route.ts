import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.onboardingComponent.findMany();
  return Response.json(data);
}

export async function PUT(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();

  const { componentId, pageId } = await request.json();

  await prisma.onboardingComponent.update({
    where: {
      id: componentId
    },
    data: {
      pageId
    }
  });

  redirectUrl.pathname = "/admin";

  return NextResponse.redirect(redirectUrl);
}