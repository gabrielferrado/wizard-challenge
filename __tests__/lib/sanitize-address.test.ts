import sanitizeAddress from "@/util/sanitize-address";

describe("sanitizeAddress", () => {
  it('should return "-" if streetAddress is missing or falsy', () => {
    const user1 = { streetAddress: null, city: "City", state: "State", zip: "Zip" };
    const user2 = { city: "City", state: "State", zip: "Zip" };
    expect(sanitizeAddress(user1)).toBe("-");
    expect(sanitizeAddress(user2)).toBe("-");
  });

  it("should return trimmed streetAddress if only streetAddress is provided", () => {
    const user = { streetAddress: " 123 Main St " };
    expect(sanitizeAddress(user)).toBe("123 Main St");
  });

  it("should return concatenated and trimmed address when all fields are provided", () => {
    const user = {
      streetAddress: " 123 Main St ",
      city: " Townsville ",
      state: " TS ",
      zip: " 12345 "
    };
    expect(sanitizeAddress(user)).toBe("123 Main St, Townsville, TS 12345");
  });

  it("should filter out empty fields and still return a correctly formatted address", () => {
    const user = {
      streetAddress: " 123 Main St ",
      city: " ",
      state: "",
      zip: " 12345 "
    };
    expect(sanitizeAddress(user)).toBe("123 Main St 12345");
  });

  it("should not append zip when zip is empty after trimming", () => {
    const user = {
      streetAddress: " 123 Main St ",
      city: "Townsville",
      state: "TS",
      zip: "   "
    };

    expect(sanitizeAddress(user)).toBe("123 Main St, Townsville, TS");
  });
});