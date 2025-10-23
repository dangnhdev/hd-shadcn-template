import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

/**
 * Example Convex functions
 *
 * These are example queries and mutations you can use to interact with your database.
 * You can remove or modify these as needed.
 */

// Get all users
export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').collect()
  },
})

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
  },
})

// Create a new user
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const userId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      avatarUrl: args.avatarUrl,
      createdAt: Date.now(),
    })

    return userId
  },
})
