import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

/**
 * Convex schema definition
 *
 * Define your database tables here. Each table will be type-safe
 * and automatically validated.
 *
 * Learn more: https://docs.convex.dev/database/schemas
 */

export default defineSchema({
  // Example table - you can remove or modify this
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_email', ['email']),
})
