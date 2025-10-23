import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize Resend component
export const resend = new Resend(components.resend, {});

// Send a test email
export const sendTestEmail = internalMutation({
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev", // Use your verified domain in production
      to: "dangnhdev@gmail.com",
      subject: "Test Email from convex",
      html: `<p>${args.message}</p>`,
    });
  },
});

// Send OTP email for Better Auth
export const sendOTPEmail = internalMutation({
  args: {
    to: v.string(),
    code: v.string(),
    appName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const appName = args.appName || "HD Shadcn Template";

    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev", // Use your verified domain in production
      to: args.to,
      subject: `Your sign-in code for ${appName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
                background: #f6f9fc;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              .card {
                background: #ffffff;
                border-radius: 8px;
                padding: 48px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .code-box {
                background: #f3f4f6;
                border: 2px dashed #d1d5db;
                border-radius: 8px;
                padding: 24px;
                text-align: center;
                margin: 24px 0;
              }
              .code {
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 8px;
                font-family: 'Courier New', monospace;
                color: #000;
              }
              .footer {
                margin-top: 32px;
                color: #666;
                font-size: 14px;
                text-align: center;
              }
              h1 {
                margin: 0 0 16px;
                font-size: 24px;
              }
              p {
                margin: 0 0 16px;
                color: #525252;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <h1>Sign in to ${appName}</h1>
                <p>Your verification code is:</p>
                <div class="code-box">
                  <div class="code">${args.code}</div>
                </div>
                <p style="text-align: center; font-size: 14px;">
                  Enter this code on the sign-in page to continue.
                </p>
                <div class="footer">
                  This code will expire in 5 minutes.<br>
                  If you didn't request this code, you can safely ignore this email.
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  },
});
