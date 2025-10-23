import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";

// Initialize Resend component
export const resend = new Resend(components.resend, {testMode: false});

// Send a test email
export const sendTestEmail = internalMutation({
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: "convex-test@podecom.de", // Use your verified domain in production
      to: "dangnhdev@gmail.com",
      subject: "Test Email from convex",
      html: `<p>${args.message}</p>`,
    });
  },
});
