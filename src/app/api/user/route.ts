import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

// A simple (and insecure) hash function for simulation purposes.
function simpleHash(password = ""): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const chr = password.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    // Convert to a 32-bit integer.
    hash |= 0;
  }
  // Convert to a hexadecimal string.
  return Math.abs(hash).toString(16);
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("SESSION");

  const { email, password, aboutMe, streetAddress, city, state, zip, birthdate, currentStep } = await request.json();

  const userEmail = session?.value || email;

  const data = await prisma.user.upsert({
    where: {
      email: userEmail,
    },
    update: {
      aboutMe,
      streetAddress,
      city,
      state,
      zip,
      birthdate: birthdate ? new Date(birthdate).toISOString() : undefined,
      currentStep
    },
    create: {
      email: userEmail,
      passwordHash: simpleHash(password),
    },
  });

  if (session && currentStep === 3) cookieStore.delete("SESSION");

  return NextResponse.json(data);
}