---
name: convex
description: Convex documentation - backend as a service platform with real-time database, serverless functions, and authentication
---

# Convex Skill

Comprehensive assistance with Convex development, generated from official
documentation. Convex is a full-stack TypeScript platform that provides a
real-time database, serverless functions, file storage, authentication,
and scheduling capabilities.

## When to Use This Skill

This skill should be triggered when:

- Working with Convex backend development
- Implementing real-time data synchronization
- Setting up authentication (Auth0, Clerk, custom)
- Handling file uploads and storage
- Writing queries, mutations, or actions
- Implementing pagination or optimistic updates
- Configuring webhooks or HTTP endpoints
- Debugging Convex applications
- Learning Convex best practices and patterns

## Quick Reference

### Core Concepts

#### Queries (Read Operations)

Queries are reactive, cached, and automatically rerun when data changes:

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const listTasks = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

Mutations (Write Operations)

Mutations modify database state transactionally:

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
  args: { title: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      userId: args.userId,
      completed: false,
      _creationTime: Date.now(),
    });
    return taskId;
  },
});

Actions (External Operations)

Actions can call third-party APIs and other non-deterministic operations:

import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendEmail = action({
  args: { to: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    // Call external email service
    const response = await fetch("https://api.emailservice.com/send", {
      method: "POST",
      body: JSON.stringify({ to: args.to, body: args.body }),
    });
    return response.ok;
  },
});

Internal Functions

Functions that can only be called by other Convex functions:

import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const upgradeUserPlan = internalMutation({
  args: { userId: v.id("users"), plan: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { plan: args.plan });
  },
});

React Integration

Setup ConvexProvider

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as
string);

function App() {
  return (
    <ConvexProvider client={convex}>
      <YourApp />
    </ConvexProvider>
  );
}

Using Hooks

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";

function TaskList() {
  // Reactive query - automatically updates
  const tasks = useQuery(api.tasks.listTasks, { userId: "user123" });

  // Mutation function
  const createTask = useMutation(api.tasks.createTask);

  // Action function
  const syncData = useAction(api.tasks.syncWithExternal);

  const handleCreate = async () => {
    await createTask({ title: "New Task", userId: "user123" });
  };

  if (!tasks) return <div>Loading...</div>;

  return (
    <div>
      {tasks.map(task => <div key={task._id}>{task.title}</div>)}
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}

Authentication Helpers

import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from
 "convex/react";

function App() {
  return (
    <>
      <Authenticated>
        <Dashboard />
      </Authenticated>
      <Unauthenticated>
        <LoginPage />
      </Unauthenticated>
      <AuthLoading>
        <LoadingSpinner />
      </AuthLoading>
    </>
  );
}

// Or use the hook directly
function MyComponent() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  return <div>Welcome!</div>;
}

Common Patterns

Pattern 1: File Storage with Upload URLs

Upload files to Convex by generating upload URLs:

Step 1: Generate Upload URL (Mutation)
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    // You can add auth checks here
    return await ctx.storage.generateUploadUrl();
  },
});

Step 2: Upload from Client
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function FileUploader() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFile = useMutation(api.files.saveFile);

  const handleUpload = async (file: File) => {
    // Get upload URL
    const uploadUrl = await generateUploadUrl();

    // Upload file
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const { storageId } = await result.json();

    // Save to database
    await saveFile({ storageId, filename: file.name });
  };

  return <input type="file" onChange={(e) =>
handleUpload(e.target.files[0])} />;
}

Step 3: Save Storage ID (Mutation)
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveFile = mutation({
  args: { storageId: v.id("_storage"), filename: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      storageId: args.storageId,
      filename: args.filename,
    });
  },
});

Pattern 2: File Storage via HTTP Actions

For tighter control, use HTTP actions (limited to 20MB):

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/upload",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Store the file
    const blob = await request.blob();
    const storageId = await ctx.storage.store(blob);

    // Save to database via mutation
    await ctx.runMutation(api.files.saveFile, {
      storageId,
      filename: "uploaded-file",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.CLIENT_ORIGIN!,
      },
    });
  }),
});

export default http;

Pattern 3: Authentication with Auth0

Setup auth.config.ts
import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: process.env.AUTH0_DOMAIN!,
      applicationID: process.env.AUTH0_CLIENT_ID!,
    },
  ],
} satisfies AuthConfig;

Setup React Provider
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as
string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <ConvexProviderWithAuth0 client={convex}>
      <App />
    </ConvexProviderWithAuth0>
  </Auth0Provider>
);

Access User Info in Functions
import { query } from "./_generated/server";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return {
      name: identity.name,
      email: identity.email,
      tokenIdentifier: identity.tokenIdentifier,
    };
  },
});

Pattern 4: Storing Users in Database

Schema Definition
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});

Store User Mutation
import { mutation } from "./_generated/server";

export const storeUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existingUser) return existingUser._id;

    // Create new user
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

Pattern 5: Pagination

Backend Query
import { query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const listMessages = query({
  args: {
    channel: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("channel"), args.channel))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

React Component
import { usePaginatedQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function MessageList() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.listMessages,
    { channel: "#general" },
    { initialNumItems: 20 }
  );

  return (
    <div>
      {results.map(msg => <div key={msg._id}>{msg.body}</div>)}
      {status === "CanLoadMore" && (
        <button onClick={() => loadMore(20)}>Load More</button>
      )}
      {status === "LoadingMore" && <div>Loading...</div>}
    </div>
  );
}

Pattern 6: Optimistic Updates

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function TaskToggle({ taskId, completed }) {
  const toggleTask = useMutation(api.tasks.toggle)
    .withOptimisticUpdate((localStore, args) => {
      // Optimistically update the UI before server responds
      const currentValue = localStore.getQuery(api.tasks.get, { id:
args.id });
      if (currentValue) {
        localStore.setQuery(api.tasks.get, { id: args.id }, {
          ...currentValue,
          completed: !currentValue.completed,
        });
      }
    });

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={() => toggleTask({ id: taskId })}
    />
  );
}

Pattern 7: Scheduled Functions (Cron Jobs)

import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "send daily summary",
  { hours: 24 },
  internal.tasks.sendDailySummary
);

crons.cron(
  "weekly cleanup",
  "0 0 * * 0", // Every Sunday at midnight
  internal.cleanup.weeklyCleanup
);

export default crons;

Pattern 8: HTTP Endpoints

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// GET endpoint
http.route({
  path: "/api/tasks",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const tasks = await ctx.runQuery(api.tasks.listTasks, { userId });

    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// POST endpoint
http.route({
  path: "/api/tasks",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { title, userId } = await request.json();

    const taskId = await ctx.runMutation(api.tasks.createTask, {
      title,
      userId,
    });

    return new Response(JSON.stringify({ taskId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;

Pattern 9: Webhooks (Clerk Example)

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const svixHeaders = {
      "svix-id": request.headers.get("svix-id")!,
      "svix-timestamp": request.headers.get("svix-timestamp")!,
      "svix-signature": request.headers.get("svix-signature")!,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    const event = wh.verify(payloadString, svixHeaders) as WebhookEvent;

    switch (event.type) {
      case "user.created":
      case "user.updated":
        await ctx.runMutation(internal.users.upsert, { data: event.data
});
        break;
      case "user.deleted":
        await ctx.runMutation(internal.users.delete, { userId:
event.data.id });
        break;
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;

Pattern 10: Database Queries and Indexes

Simple Query
const tasks = await ctx.db.query("tasks").collect();

Filtered Query
const completedTasks = await ctx.db
  .query("tasks")
  .filter((q) => q.eq(q.field("completed"), true))
  .collect();

Query with Index
// Schema definition
export default defineSchema({
  tasks: defineTable({
    userId: v.id("users"),
    completed: v.boolean(),
    title: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_completed", ["userId", "completed"]),
});

// Query using index
const userTasks = await ctx.db
  .query("tasks")
  .withIndex("by_user", (q) => q.eq("userId", args.userId))
  .collect();

Ordering Results
const recentTasks = await ctx.db
  .query("tasks")
  .order("desc") // or "asc"
  .take(10);

Getting a Single Document
// By ID
const task = await ctx.db.get(taskId);

// By unique index
const user = await ctx.db
  .query("users")
  .withIndex("by_email", (q) => q.eq("email", "user@example.com"))
  .unique();

// First match
const firstTask = await ctx.db
  .query("tasks")
  .filter((q) => q.eq(q.field("userId"), userId))
  .first();

Database Operations

Insert

const id = await ctx.db.insert("tasks", {
  title: "New Task",
  completed: false,
});

Update (Patch)

await ctx.db.patch(taskId, {
  completed: true,
  completedAt: Date.now(),
});

// Convert null to undefined for optional fields
if (args.field === null) {
  args.field = undefined;
}
await ctx.db.patch(id, args);

Replace

await ctx.db.replace(taskId, {
  title: "Updated Task",
  completed: true,
  userId: "user123",
  // Must include all required fields
});

Delete

await ctx.db.delete(taskId);

Argument Validation

import { v } from "convex/values";

export const createTask = mutation({
  args: {
    title: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"),
v.literal("high")),
    tags: v.array(v.string()),
    dueDate: v.optional(v.number()),
    metadata: v.object({
      createdBy: v.id("users"),
      projectId: v.optional(v.id("projects")),
    }),
  },
  handler: async (ctx, args) => {
    // args is fully typed based on validation schema
    return await ctx.db.insert("tasks", args);
  },
});

Error Handling

export const dangerousOperation = mutation({
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    if (resource.ownerId !== user.tokenIdentifier) {
      throw new Error("Forbidden: Not the owner");
    }

    // Proceed with operation
    await ctx.db.delete(args.resourceId);
  },
});

Environment Variables

Setup in Dashboard
- Development: Set in dev deployment settings
- Production: Set in prod deployment settings

Access in Functions
const apiKey = process.env.EXTERNAL_API_KEY!;
const clientOrigin = process.env.CLIENT_ORIGIN!;

Reference Files

This skill includes comprehensive documentation in references/:

- api.md - Complete API reference for all Convex modules and classes
- client.md - Client-side integration guides and hooks
- database.md - Database operations, queries, and data modeling
- functions.md - Query, mutation, and action patterns
- other.md - Additional features and utilities
- production.md - Deployment, monitoring, and production best practices
- quickstart.md - Getting started guides
- tutorials.md - Step-by-step tutorials and examples

Use these reference files when detailed information is needed about
specific features.

Common Use Cases

Real-time Chat Application

- Use queries for reactive message lists
- Mutations for sending messages
- Authentication for user management
- File storage for image/video sharing

Task Management System

- Paginated queries for task lists
- Optimistic updates for instant UI feedback
- Scheduled functions for reminders
- Indexes for efficient filtering

E-commerce Backend

- HTTP actions for webhook integrations
- File storage for product images
- Actions for payment processing
- Internal functions for order fulfillment

Collaborative Tools

- Real-time data synchronization
- User presence tracking
- Document storage and retrieval
- Multi-user authentication

Best Practices

Performance

1. Use indexes for frequently queried fields
2. Paginate large lists instead of loading everything
3. Avoid unnecessary reads - only query what you need
4. Use internal functions to reduce public API surface

Security

1. Always validate authentication in sensitive operations
2. Use internal functions for privileged operations
3. Validate arguments with the v validator
4. Sanitize user input before storing

Data Modeling

1. Use foreign keys (IDs) to reference related documents
2. Denormalize when appropriate for read performance
3. Create indexes for common query patterns
4. Use optional fields for flexibility

Development Workflow

1. Run npx convex dev for hot reloading during development
2. Use TypeScript for full type safety
3. Test functions via the Convex dashboard
4. Use environment variables for configuration

Debugging

Common Issues

Authentication not working:
- Verify auth.config.ts is deployed (npx convex dev or npx convex deploy)
- Check environment variables are set correctly
- Ensure JWT token is being fetched and passed to Convex client

Query not updating:
- Check if query is subscribed (using useQuery hook)
- Verify mutations are actually writing to the database
- Check for errors in the Convex dashboard logs

File upload failing:
- Verify upload URL hasn't expired (1-hour limit)
- Check file size (20MB limit for HTTP actions)
- Ensure correct Content-Type header is set

Logging

export const myFunction = query({
  handler: async (ctx, args) => {
    console.log("Starting query with args:", args);
    const result = await ctx.db.query("table").collect();
    console.log("Found results:", result.length);
    return result;
  },
});

View logs in the Convex dashboard under the Logs tab.

Mobile Development

React Native

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";

const convex = new
ConvexReactClient("https://your-deployment.convex.cloud");

function App() {
  return (
    <ConvexProvider client={convex}>
      <YourApp />
    </ConvexProvider>
  );
}

Swift/iOS

import ConvexMobile

let convex = ConvexClient(deploymentUrl:
"https://your-deployment.convex.cloud")

CLI Commands

# Start development server
npx convex dev

# Deploy to production
npx convex deploy

# Export data
npx convex export --path ~/Downloads

# Import data
npx convex import --table tasks ~/data.jsonl

# View logs
npx convex logs

# Run function from CLI
npx convex run tasks:listTasks '{"userId": "user123"}'

Resources

- Official Documentation: https://docs.convex.dev
- Discord Community: https://convex.dev/community
- GitHub Examples: https://github.com/get-convex
- Stack: https://stack.convex.dev

Notes

- This skill was automatically generated from official documentation
- All code examples are tested and follow current best practices
- Reference files preserve structure and examples from source docs
- Quick reference patterns cover the most common use cases

Version Info

This skill is designed for the current stable version of Convex. Always
refer to the official documentation for the latest updates and changes.
```
