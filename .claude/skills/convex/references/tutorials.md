# Convex - Tutorials

**Pages:** 4

---

## Convex Tutorial: A chat app

**URL:** https://docs.convex.dev/tutorial

**Contents:**
- Convex Tutorial: A chat app
- Start developing with Convex​
- How Convex works​
- Your first mutation​
- Your first query​
- What you built​
- Next up​
- Calling external services

Convex provides you with a fully featured backend with cloud functions, database, scheduling, and a sync engine that keeps your frontend and backend up to date in real-time.

Today, in about 10 lines of code, we'll build a backend that reads and writes to the database and automatically updates all users in a chat app.

After that we'll see how to connect to external services and setup your product for success and scale.

Ensure you have Node.js version 18 or greater installed on your computer. You can check your version of Node.js by running node --version in your terminal. If you don't have the appropriate version of Node.js installed, install it from the Node.js website.

In addition, this walkthrough requires Git, so verify you have it installed by running git -v in your terminal. If not, head over to the Git website for installation instructions.

First, clone the example project repo from GitHub and install the dependencies:

This app's dev npm command sets up Convex and then runs the web app:

During setup, you'll see that Convex uses your GitHub account for authentication. Sign into Convex with GitHub and then accept the default project setup prompts.

This will automatically create your backend and a folder called convex/ in your project, where you'll write your backend code.

Make sure you keep this command (npm run dev) running in the background throughout this tutorial. It's running both the dev web server for the frontend as well as the convex command in the background to keep your backend in sync with your local codebase.

Once your server is up and running, open localhost:5173 and check it out:

If you try sending a message now, you'll see an alert telling you the mutation is not yet implemented. We'll do that in a bit, but first here's a quick summary of how Convex works.

Database. The Convex database is a document-relational database, which means you have tables with JSON like documents in them. All documents have an auto-generated _id that can be used to create relations between documents. You interact with the database through mutation and query functions that are written entirely in TypeScript.

Mutation functions. Mutations are TypeScript functions that update the database. All mutation functions in Convex run as a database transaction. So either all the changes are committed, or none are.

Query functions. Queries are TypeScript functions that can only read from the database. As we'll see in a bit, you subscribe to them from your fron

*[Content truncated]*

**Examples:**

Example 1 (shell):
```shell
git clone https://github.com/get-convex/convex-tutorial.gitcd convex-tutorialnpm install
```

Example 2 (shell):
```shell
npm run dev
```

Example 3 (typescript):
```typescript
import { mutation } from "./_generated/server";import { v } from "convex/values";export const sendMessage = mutation({  args: {    user: v.string(),    body: v.string(),  },  handler: async (ctx, args) => {    console.log("This TypeScript function is running on the server.");    await ctx.db.insert("messages", {      user: args.user,      body: args.body,    });  },});
```

Example 4 (tsx):
```tsx
// Import `useMutation` and `api` from Convex.import { useMutation } from "convex/react";import { api } from "../convex/_generated/api";//...export default function App() {  // Replace the "TODO: Add mutation hook here." with:  const sendMessage = useMutation(api.chat.sendMessage);  //...  return (    <main className="chat">      {/* ... */}      <form        onSubmit={async (e) => {          e.preventDefault();          // Replace "alert("Mutation not implemented yet");" with:          await sendMessage({ user: NAME, body: newMessageText });          setNewMessageText("");        }}      >   
...
```

---

## Convex Tutorial: Calling external services

**URL:** https://docs.convex.dev/tutorial/actions

**Contents:**
- Convex Tutorial: Calling external services
- Your first action​
- Hooking it up to your app​
- The scheduler, actions, and the sync engine​
- What you built​
- Next up​
- Scaling your app

In the previous step, you built a fully self-contained chat app. Data in, data out.

In order to power the automatic reactivity we just saw while providing strong database transactions, query and mutation functions in Convex are not allowed to make fetch calls to the outside world.

Real apps aren't this simple. They often need to talk to the rest of the internet directly from the backend. Convex lets you do this too via action functions.

Action functions let the sync engine access the external world by scheduling out work that can then write data back via mutations.

Let's make our chat app a bit smarter by letting anyone in the chat get the Wikipedia summary of a topic using the Wikipedia API.

Add the following action to your convex/chat.ts file.

Let's walk through it:

This is great and all, but how do I use it?

To quickly test this function in the Convex dashboard, go to https://dashboard.convex.dev and navigate to your project. Click on the Functions in the left nav, and then click on the getWikipediaSummary function. Click "Run Function".

The function runner UI will pop up. Try making a few searches.

Running a few Wikipedia queries

It's awesome that we can call Wikipedia, but we still need to show up in our chat. So, let's hook it all up.

Update your existing sendMessage mutation like this:

Wait a second! What's with this ctx.scheduler stuff? Convex comes with a powerful durable function scheduler. It's a fundamental part of the sync engine, and it's the way you coordinate asynchronous functions in Convex.

In the case of mutations, it's the only way to call an action to fetch from the outside world. The really cool part is, if for some reason your mutation throws an exception, then nothing is scheduled. This is because mutations are transactions, and scheduling is just a write in the database to tell Convex to run this function at a future time.

Ok so, we can schedule our action, but we still need to write the summary back to the chat.

Let's go back and update our getWikipediaSummary action:

Just like scheduling the action, we're now scheduling our sendMessage mutation to send the result of our Wikipedia lookup to our chat.

Go ahead, now play with your app!

Queries and mutations are the only ways to interact with the database and the scheduler enables building sophisticated workflows with actions in between.

Actions are normal serverless functions like AWS Lambda and Google Cloud Run. They help model flows like calling AI APIs and usi

*[Content truncated]*

**Examples:**

Example 1 (typescript):
```typescript
// Update your server import like this:import { query, mutation, internalAction } from "./_generated/server";//...export const getWikipediaSummary = internalAction({  args: { topic: v.string() },  handler: async (ctx, args) => {    const response = await fetch(      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +        args.topic,    );    return getSummaryFromJSON(await response.json());  },});function getSummaryFromJSON(data: any) {  const firstPageId = Object.keys(data.query.pages)[0];  return data.query.pages[firstPageI
...
```

Example 2 (typescript):
```typescript
// Import the api referenceimport { api, internal } from "./_generated/api";//...export const sendMessage = mutation({  args: {    user: v.string(),    body: v.string(),  },  handler: async (ctx, args) => {    console.log("This TypeScript function is running on the server.");    await ctx.db.insert("messages", {      user: args.user,      body: args.body,    });    // Add the following lines:    if (args.body.startsWith("/wiki")) {      // Get the string after the first space      const topic = args.body.slice(args.body.indexOf(" ") + 1);      await ctx.scheduler.runAfter(0, internal.chat.getW
...
```

Example 3 (typescript):
```typescript
export const getWikipediaSummary = internalAction({  args: { topic: v.string() },  handler: async (ctx, args) => {    const response = await fetch(      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +        args.topic,    );    // Replace the `return ...` with the following.    const summary = getSummaryFromJSON(await response.json());    await ctx.scheduler.runAfter(0, api.chat.sendMessage, {      user: "Wikipedia",      body: summary,    });  },});
```

---

## Convex Tutorial: Scaling your app

**URL:** https://docs.convex.dev/tutorial/scale

**Contents:**
- Convex Tutorial: Scaling your app
- Indexed queries​
- Too many writes on the same document​
- Scaling best practices with Convex Components​
- Components directory
- Wrap up​

Convex was designed from the ground up for scale. In the previous section we already talked about how keeping your actions small and most of your logic in queries and mutations are crucial to building fast scalable backends.

Let's talk about a few other ways to keep your app fast and scalable.

Indexes tell the database to create a lookup structure to make it really fast to filter data. If, in our chat app we wanted to build a way to look up messages from just one user, we'd tell Convex to index the user field in the messages table and write the query with the withIndex syntax.

Learn how to use indexes.

Let's say you decide to show a counter in your app. You may write a mutation that reads a number field, adds 1, and updates the same field in the database. At some point, this pattern may cause an optimistic concurrency control conflict. That means that the database isn't able to handle updating the document that fast. All databases have trouble with this sort of pattern.

There are a few ways to deal with this, including building something called a sharded counter...

But before you go learn advanced scaling techniques on your own, there is a better way with Convex components.

In the case of the counter above, the Convex team has already built a scalable counter Convex component for you to use.

Convex components are installed in your Convex backend as an npm library. They are sandboxed, so they can't read your app's tables or call your app's functions unless explicitly provided.

As you build more complicated features like AI agent workflows, leaderboards, feature flags or rate limiters, you may find that there is already a Convex component that solves this problem.

We've covered a lot of ground in this tutorial. We started by building a chat app with queries, mutations and the database that form the fundamental building blocks of the Convex sync engine. We then called an external API from our backend, using the scheduler to coordinate the work. Finally, we learned that Convex components give you scaling best practices in neat packages.

If you are looking for more tips, read our best practices and join the community.

Convex enables you to build your MVP fast and then scale to new heights. Many great products have already done so. You're in good company.

---

## Convex Tutorial: A chat app

**URL:** https://docs.convex.dev/tutorial/

**Contents:**
- Convex Tutorial: A chat app
- Start developing with Convex​
- How Convex works​
- Your first mutation​
- Your first query​
- What you built​
- Next up​
- Calling external services

Convex provides you with a fully featured backend with cloud functions, database, scheduling, and a sync engine that keeps your frontend and backend up to date in real-time.

Today, in about 10 lines of code, we'll build a backend that reads and writes to the database and automatically updates all users in a chat app.

After that we'll see how to connect to external services and setup your product for success and scale.

Ensure you have Node.js version 18 or greater installed on your computer. You can check your version of Node.js by running node --version in your terminal. If you don't have the appropriate version of Node.js installed, install it from the Node.js website.

In addition, this walkthrough requires Git, so verify you have it installed by running git -v in your terminal. If not, head over to the Git website for installation instructions.

First, clone the example project repo from GitHub and install the dependencies:

This app's dev npm command sets up Convex and then runs the web app:

During setup, you'll see that Convex uses your GitHub account for authentication. Sign into Convex with GitHub and then accept the default project setup prompts.

This will automatically create your backend and a folder called convex/ in your project, where you'll write your backend code.

Make sure you keep this command (npm run dev) running in the background throughout this tutorial. It's running both the dev web server for the frontend as well as the convex command in the background to keep your backend in sync with your local codebase.

Once your server is up and running, open localhost:5173 and check it out:

If you try sending a message now, you'll see an alert telling you the mutation is not yet implemented. We'll do that in a bit, but first here's a quick summary of how Convex works.

Database. The Convex database is a document-relational database, which means you have tables with JSON like documents in them. All documents have an auto-generated _id that can be used to create relations between documents. You interact with the database through mutation and query functions that are written entirely in TypeScript.

Mutation functions. Mutations are TypeScript functions that update the database. All mutation functions in Convex run as a database transaction. So either all the changes are committed, or none are.

Query functions. Queries are TypeScript functions that can only read from the database. As we'll see in a bit, you subscribe to them from your fron

*[Content truncated]*

**Examples:**

Example 1 (shell):
```shell
git clone https://github.com/get-convex/convex-tutorial.gitcd convex-tutorialnpm install
```

Example 2 (shell):
```shell
npm run dev
```

Example 3 (typescript):
```typescript
import { mutation } from "./_generated/server";import { v } from "convex/values";export const sendMessage = mutation({  args: {    user: v.string(),    body: v.string(),  },  handler: async (ctx, args) => {    console.log("This TypeScript function is running on the server.");    await ctx.db.insert("messages", {      user: args.user,      body: args.body,    });  },});
```

Example 4 (tsx):
```tsx
// Import `useMutation` and `api` from Convex.import { useMutation } from "convex/react";import { api } from "../convex/_generated/api";//...export default function App() {  // Replace the "TODO: Add mutation hook here." with:  const sendMessage = useMutation(api.chat.sendMessage);  //...  return (    <main className="chat">      {/* ... */}      <form        onSubmit={async (e) => {          e.preventDefault();          // Replace "alert("Mutation not implemented yet");" with:          await sendMessage({ user: NAME, body: newMessageText });          setNewMessageText("");        }}      >   
...
```

---
