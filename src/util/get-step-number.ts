export default function getStepNumber(pathname: string) {
  if (pathname === "/") {
    return 1;
  }

  if (!pathname.includes("/step")) {
    throw new Error("Cannot find step in pathname");
  }

  const stepString = pathname.split("/step").pop();
  const stepNumber = Number(stepString);

  if (isNaN(stepNumber)) {
    throw new Error("Step is not a valid number");
  }

  return stepNumber;
}