import InitialForm from "@/components/initial-form";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("SESSION");

  if (session && session.value) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.value,
      },
    });

    if (user?.currentStep) return redirect(`/step${user.currentStep+1}`);
  }

  return (
    <>
      <h1
        className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white text-center mb-16"
      >
        Welcome to Zealthy Onboarding!
      </h1>
      <InitialForm/>
    </>
  );
}
