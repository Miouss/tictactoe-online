import { wait } from "./wait";
import { describe, it, expect } from "vitest";

describe("wait", () => {
  it("should wait for the given time", async () => {
    const timeToWait = 1000;

    const start = Date.now();
    await wait(timeToWait);
    const end = Date.now();

    const timeElapsed = end - start;

    expect(timeElapsed).toBeGreaterThan(timeToWait);
    expect(timeElapsed).toBeLessThan(timeToWait + 100);
  });
});
