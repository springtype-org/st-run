import { isOnline } from "../dist/is-online";

describe("isOnline", () => {
  it("checks for online status", async () => {
    const amIOnline = await isOnline();
    expect(amIOnline).toBe(true);
  });
});
