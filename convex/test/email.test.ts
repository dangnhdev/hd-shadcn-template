import { convexTest } from "convex-test";
import { expect, test, describe } from "vitest";
import schema from "../schema";
import { internal } from "../_generated/api";


describe("Email functionality", () => {
  const t = convexTest(schema);
  test("should send test email successfully", async () => {
    const result = t.mutation(internal.emails.sendTestEmail, {});
    console.log(result);
    // If no error is thrown, the email was sent successfully
    // Note: In test mode, emails won't actually be sent but the function should execute
    expect(result).toBeUndefined(); // Mutations return undefined unless they explicitly return a value
  });
});
