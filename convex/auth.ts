import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { components,  } from "./_generated/api";
import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { query, type QueryCtx } from "./_generated/server";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { type DataModel } from "./_generated/dataModel";
import { sendOTPVerification } from "./email";

const siteUrl = process.env.SITE_URL!;
console.warn("site url", siteUrl);

// The component client has methods needed for integrating Convex with Better Auth
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    // Disable logging when createAuth is called just to generate options
    logger: {
      disabled: optionsOnly,
    },
    trustedOrigins: [siteUrl],
    database: authComponent.adapter(ctx),

    plugins: [
      // The cross domain plugin is required for client side frameworks (React SPA)
      crossDomain({ siteUrl }),

      // The Convex plugin is required for Convex compatibility
      convex(),

      // Email OTP plugin for passwordless sign-in
      emailOTP({
        // Send OTP via Convex Resend
       async sendVerificationOTP({ email, otp }) {
          await sendOTPVerification(requireActionCtx(ctx), {
            to: email,
            code: otp,
          });
        },
      
        // OTP configuration
        otpLength: 6,
        expiresIn: 300, // 5 minutes
        allowedAttempts: 3,
        storeOTP: "plain", // Store as plain text (can use 'hashed' or 'encrypted' for better security)
      }),
    ],
    account: {
      accountLinking: {
        enabled: true,
      },
    },
  });
};

// Below are example helpers and functions for getting the current user
// Feel free to edit, omit, etc.
export const safeGetUser = async (ctx: QueryCtx) => {
  return authComponent.safeGetAuthUser(ctx);
};

export const getUserId = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  return identity?.subject;
};

export const getUser = async (ctx: QueryCtx) => {
  return authComponent.getAuthUser(ctx);
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    console.log("identity", await ctx.auth.getUserIdentity());
    return safeGetUser(ctx);
  },
});
