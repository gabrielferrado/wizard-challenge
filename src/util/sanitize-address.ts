type UserAddress = {
  streetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
};

export default function sanitizeAddress(user: UserAddress): string {
  if (!user.streetAddress) {
    return "-";
  }

  const street = user.streetAddress.trim();
  const city = user.city ? user.city.trim() : "";
  const state = user.state ? user.state.trim() : "";
  const zip = user.zip ? user.zip.trim() : "";

  const mainParts = [street, city, state].filter((part) => part.length > 0);

  let address = mainParts.join(", ");

  if (zip.length > 0) {
    address += ` ${zip}`;
  }

  return address;
}