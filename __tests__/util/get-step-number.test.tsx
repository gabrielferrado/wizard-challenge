import getStepNumber from "@/util/get-step-number";

describe("getStepNumber", () => {
  it("should return the step number from a valid path containing /step", () => {
    expect(getStepNumber("/whatever/step2")).toBe(2);
    expect(getStepNumber("/step5")).toBe(5);
  });

  it("should throw an error if the path does not contain /step", () => {
    expect(() => getStepNumber("/no-step-here")).toThrow("Cannot find step in pathname");
    expect(() => getStepNumber("/user/123")).toThrow("Cannot find step in pathname");
  });

  it("should retunr NaN if the path has non-numeric suffix after /step", () => {
    expect(() => getStepNumber("/path/stepabc")).toThrow("Step is not a valid number");
  });

  it("should handle edge cases around partial matches", () => {
    expect(getStepNumber("/only/step")).toBe(0);
  });
});
