import { isOnline } from "../src";

describe("isOnline", () => {
  it("checks for online status", async () => {
    const amIOnline = await isOnline();
    expect(amIOnline).toBe(true);
  });
});
