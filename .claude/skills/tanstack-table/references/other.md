# Tanstack-Table - Other

**Pages:** 21

---

## TanStack Svelte Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/svelte

---

## AG Grid - An alternative enterprise data-grid solution

**URL:** https://tanstack.com/table/latest/docs/enterprise/ag-grid

**Contents:**
- Why Choose AG Grid?
  - Comprehensive Feature Set
  - High Performance
  - Customization and Extensibility
  - Support for Enterprise Needs
  - Active Development and Community Support
- Conclusion

While we clearly love TanStack Table, we acknowledge that it is not a "batteries" included product packed with customer support and enterprise polish. We realize that some of our users may need this though! To help out here, we want to introduce you to AG Grid, an enterprise-grade data grid solution that can supercharge your applications with its extensive feature set and robust performance. While TanStack Table is also a powerful option for implementing data grids, we believe in providing our users with a diverse range of choices that best fit their specific requirements. AG Grid is one such choice, and we're excited to highlight its capabilities for you.

Here are some good reasons to consider AG Grid for your next project:

AG Grid offers an extensive set of features, making it a versatile and powerful data grid solution. With AG Grid, you get access to a wide range of functionalities that cater to the needs of complex enterprise applications. From advanced sorting, filtering, and grouping capabilities to column pinning, multi-level headers, and tree data structure support, AG Grid provides you with the tools to create dynamic and interactive data grids that meet your application's unique demands.

When it comes to handling large datasets and achieving exceptional performance, AG Grid delivers outstanding results. It employs highly optimized rendering techniques, efficient data updates, and virtualization to ensure smooth scrolling and fast response times, even when dealing with thousands or millions of rows of data. AG Grid's performance optimizations make it an excellent choice for applications that require high-speed data manipulation and visualization.

AG Grid is designed to be highly customizable and extensible, allowing you to tailor the grid to your specific needs. It provides a rich set of APIs and events that enable you to integrate custom functionality seamlessly. You can define custom cell renderers, editors, filters, and aggregators to enhance the grid's behavior and appearance. AG Grid also supports a variety of themes, allowing you to match the grid's visual style to your application's design.

As an enterprise-focused solution, AG Grid caters to the requirements of complex business applications. It offers enterprise-specific features such as row grouping, column pinning, server-side row model, master/detail grids, and rich editing capabilities. AG Grid also integrates well with other enterprise frameworks and libraries, making it a relia

*[Content truncated]*

---

## TanStack React Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/react

---

## TanStack Vue Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/vue

---

## Lit Table

**URL:** https://tanstack.com/table/latest/docs/framework/lit/lit-table

**Contents:**
- Exports
  - TableController
  - flexRender

The @tanstack/lit-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "lit" way, providing types and the rendering implementation of cell/header/footer templates.

@tanstack/lit-table re-exports all of @tanstack/table-core's APIs and the following:

Is a reactive controller that provides a table API that takes an options object and returns a table instance.

A utility function for rendering cell/header/footer templates with dynamic values.

**Examples:**

Example 1 (python):
```python
import { TableController } from '@tanstack/lit-table'

@customElement('my-table-element')
class MyTableElement extends LitElement {
  private tableController = new TableController<Person>(this)

  protected render() {
    const table = this.tableController.table(options)
    // ...render your table
  }
}
```

Example 2 (python):
```python
import { TableController } from '@tanstack/lit-table'

@customElement('my-table-element')
class MyTableElement extends LitElement {
  private tableController = new TableController<Person>(this)

  protected render() {
    const table = this.tableController.table(options)
    // ...render your table
  }
}
```

Example 3 (python):
```python
import { TableController } from '@tanstack/lit-table'

@customElement('my-table-element')
class MyTableElement extends LitElement {
  private tableController = new TableController<Person>(this)

  protected render() {
    const table = this.tableController.table(options)
    // ...render your table
  }
}
```

Example 4 (python):
```python
import { TableController } from '@tanstack/lit-table'

@customElement('my-table-element')
class MyTableElement extends LitElement {
  private tableController = new TableController<Person>(this)

  protected render() {
    const table = this.tableController.table(options)
    // ...render your table
  }
}
```

---

## Introduction

**URL:** https://tanstack.com/table/latest/docs/introduction

**Contents:**
- What is "headless" UI?
- Component-based libraries vs Headless libraries
  - Which kind of table library should I use?
  - Component-based Table Libraries
  - Headless Table Libraries

TanStack Table is a Headless UI library for building powerful tables & datagrids for TS/JS, React, Vue, Solid, Qwik, and Svelte.

Headless UI is a term for libraries and utilities that provide the logic, state, processing and API for UI elements and interactions, but do not provide markup, styles, or pre-built implementations. Scratching your head yet? 😉 Headless UI has a few main goals:

The hardest parts of building complex UIs usually revolve around state, events, side-effects, data computation/management. By removing these concerns from the markup, styles and implementation details, our logic and components can be more modular and reusable.

Building UI is a very branded and custom experience, even if that means choosing a design system or adhering to a design spec. To support this custom experience, component-based UI libraries need to support a massive (and seemingly endless) API surface around markup and style customization. Headless UI libraries decouple your logic from your UI

When you use a headless UI library, the complex task of data-processing, state-management, and business logic are handled for you, leaving you to worry about higher-cardinality decisions that differ across implementations and use cases.

Want to dive deeper? Read more about Headless UI.

In the ecosystem of table/datagrid libraries, there are two main categories:

Each approach has subtle tradeoffs. Understanding these subtleties will help you make the right decision for your application and team.

Component-based table libraries will typically supply you with a feature-rich drop-in solution and ready-to-use components/markup complete with styles/theming. AG Grid is a great example of this type of table library.

If you want a ready-to-use table and design/bundle-size are not hard requirements, then you should consider using a component-based table library.

There are a lot of component-based table libraries out there, but we believe AG Grid is the gold standard and is by far our favorite grid-sibling (don't tell the others 🤫).

Headless table libraries will typically supply you with functions, state, utilities and event listeners to build your own table markup or attach to existing table markups.

If you want a lighter-weight table or full control over the design, then you should consider using a headless table library.

There are very few headless table libraries out there and obviously, TanStack Table is our favorite!

---

## FAQ

**URL:** https://tanstack.com/table/latest/docs/faq

**Contents:**
- How do I stop infinite rendering loops?
  - Pitfall 1: Creating new columns or data on every render
  - Solution 1: Stable references with useMemo or useState
  - Pitfall 2: Mutating columns or data in place
  - Solution 2: Memoize your data transformations
  - React Forget
- How do I stop my table state from automatically resetting when my data changes?

If you are using React, there is a very common pitfall that can cause infinite rendering. If you fail to give your columns, data, or state a stable reference, React will enter an infinite loop of re-rendering upon any change to the table state.

Why does this happen? Is this a bug in TanStack Table? No, it is not. This is fundamentally how React works, and properly managing your columns, data, and state will prevent this from happening.

TanStack Table is designed to trigger a re-render whenever either the data or columns that are passed into the table change, or whenever any of the table's state changes.

Failing to give columns or data stable references can cause an infinite loop of re-renders.

In React, you can give a "stable" reference to variables by defining them outside/above the component, or by using useMemo or useState, or by using a 3rd party state management library (like Redux or React Query 😉)

Even if you give your initial columns and data stable references, you can still run into infinite loops if you mutate them in place. This is a common pitfall that you may not notice that you are doing at first. Something as simple as an inline data.filter() can cause an infinite loop if you are not careful.

To prevent infinite loops, you should always memoize your data transformations. This can be done with useMemo or similar.

When React Forget is released, these problems might be a thing of the past. Or just use Solid.js... 🤓

Most plugins use state that should normally reset when the data sources changes, but sometimes you need to suppress that from happening if you are filtering your data externally, or immutably editing your data while looking at it, or simply doing anything external with your data that you don't want to trigger a piece of table state to reset automatically.

For those situations, each plugin provides a way to disable the state from automatically resetting internally when data or other dependencies for a piece of state change. By setting any of them to false, you can stop the automatic resets from being triggered.

Here is a React-based example of stopping basically every piece of state from changing as they normally do while we edit the data source for a table:

Now, when we update our data, the above table states will not automatically reset!

**Examples:**

Example 1 (javascript):
```javascript
export default function MyComponent() {
  //😵 BAD: This will cause an infinite loop of re-renders because `columns` is redefined as a new array on every render!
  const columns = [
    // ...
  ];

  //😵 BAD: This will cause an infinite loop of re-renders because `data` is redefined as a new array on every render!
  const data = [
    // ...
  ];

  //❌ Columns and data are defined in the same scope as `useReactTable` without a stable reference, will cause infinite loop!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

Example 2 (javascript):
```javascript
export default function MyComponent() {
  //😵 BAD: This will cause an infinite loop of re-renders because `columns` is redefined as a new array on every render!
  const columns = [
    // ...
  ];

  //😵 BAD: This will cause an infinite loop of re-renders because `data` is redefined as a new array on every render!
  const data = [
    // ...
  ];

  //❌ Columns and data are defined in the same scope as `useReactTable` without a stable reference, will cause infinite loop!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

Example 3 (javascript):
```javascript
export default function MyComponent() {
  //😵 BAD: This will cause an infinite loop of re-renders because `columns` is redefined as a new array on every render!
  const columns = [
    // ...
  ];

  //😵 BAD: This will cause an infinite loop of re-renders because `data` is redefined as a new array on every render!
  const data = [
    // ...
  ];

  //❌ Columns and data are defined in the same scope as `useReactTable` without a stable reference, will cause infinite loop!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

Example 4 (javascript):
```javascript
export default function MyComponent() {
  //😵 BAD: This will cause an infinite loop of re-renders because `columns` is redefined as a new array on every render!
  const columns = [
    // ...
  ];

  //😵 BAD: This will cause an infinite loop of re-renders because `data` is redefined as a new array on every render!
  const data = [
    // ...
  ];

  //❌ Columns and data are defined in the same scope as `useReactTable` without a stable reference, will cause infinite loop!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

---

## TanStack Vanilla Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/vanilla

---

## Supported TanStack Table Frameworks

**URL:** https://tanstack.com/table/latest/docs/framework

---

## Vue Table

**URL:** https://tanstack.com/table/latest/docs/framework/vue/vue-table

**Contents:**
- Exports
  - useVueTable
  - FlexRender

The @tanstack/vue-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "vue" way, providing types and the rendering implementation of cell/header/footer templates.

@tanstack/vue-table re-exports all of @tanstack/table-core's APIs and the following:

Takes an options object and returns a table.

A Vue component for rendering cell/header/footer templates with dynamic values.

**Examples:**

Example 1 (python):
```python
import { useVueTable } from '@tanstack/vue-table'

const table = useVueTable(options)
// ...render your table
```

Example 2 (python):
```python
import { useVueTable } from '@tanstack/vue-table'

const table = useVueTable(options)
// ...render your table
```

Example 3 (python):
```python
import { useVueTable } from '@tanstack/vue-table'

const table = useVueTable(options)
// ...render your table
```

Example 4 (python):
```python
import { useVueTable } from '@tanstack/vue-table'

const table = useVueTable(options)
// ...render your table
```

---

## React Table

**URL:** https://tanstack.com/table/latest/docs/framework/react/react-table

**Contents:**
- useReactTable

The @tanstack/react-table adapter is a wrapper around the core table logic. Most of its job is related to managing state the "react" way, providing types and the rendering implementation of cell/header/footer templates.

Takes an options object and returns a table.

**Examples:**

Example 1 (python):
```python
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...render your table
}
```

Example 2 (python):
```python
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...render your table
}
```

Example 3 (python):
```python
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...render your table
}
```

Example 4 (python):
```python
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...render your table
}
```

---

## Qwik Table

**URL:** https://tanstack.com/table/latest/docs/framework/qwik/qwik-table

**Contents:**
- Exports
  - useQwikTable
  - flexRender

The @tanstack/qwik-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "qwik" way, providing types and the rendering implementation of cell/header/footer templates.

@tanstack/qwik-table re-exports all of @tanstack/table-core's APIs and the following:

Takes an options object and returns a table from a Qwik Store with NoSerialize.

A utility function for rendering cell/header/footer templates with dynamic values.

**Examples:**

Example 1 (python):
```python
import { useQwikTable } from '@tanstack/qwik-table'

const table = useQwikTable(options)
// ...render your table
```

Example 2 (python):
```python
import { useQwikTable } from '@tanstack/qwik-table'

const table = useQwikTable(options)
// ...render your table
```

Example 3 (python):
```python
import { useQwikTable } from '@tanstack/qwik-table'

const table = useQwikTable(options)
// ...render your table
```

Example 4 (python):
```python
import { useQwikTable } from '@tanstack/qwik-table'

const table = useQwikTable(options)
// ...render your table
```

---

## Solid Table

**URL:** https://tanstack.com/table/latest/docs/framework/solid/solid-table

**Contents:**
- createSolidTable

The @tanstack/solid-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "solid" way, providing types and the rendering implementation of cell/header/footer templates.

Takes an options object and returns a table.

**Examples:**

Example 1 (python):
```python
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...render your table
}
```

Example 2 (python):
```python
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...render your table
}
```

Example 3 (python):
```python
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...render your table
}
```

Example 4 (python):
```python
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...render your table
}
```

---

## Svelte Table

**URL:** https://tanstack.com/table/latest/docs/framework/svelte/svelte-table

**Contents:**
- createSvelteTable

The @tanstack/svelte-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "svelte" way, providing types and the rendering implementation of cell/header/footer templates.

Takes an options object and returns a table.

**Examples:**

Example 1 (python):
```python
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```

Example 2 (python):
```python
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```

Example 3 (python):
```python
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```

Example 4 (python):
```python
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```

---

## Angular Table

**URL:** https://tanstack.com/table/latest/docs/framework/angular/angular-table

**Contents:**
- Exports
  - createAngularTable
  - FlexRender
    - Example
    - Rendering a Component
    - Rendering a TemplateRef

The @tanstack/angular-table adapter is a wrapper around the core table logic. Most of it's job is related to managing state the "angular signals" way, providing types and the rendering implementation of cell/header/footer templates.

@tanstack/angular-table re-exports all of @tanstack/table-core's APIs and the following:

Accepts an options function or a computed value that returns the table options, and returns a table.

An Angular structural directive for rendering cell/header/footer templates with dynamic values.

FlexRender supports any type of content supported by Angular:

You can just use the cell.renderValue or cell.getValue APIs to render the cells of your table. However, these APIs will only spit out the raw cell values (from accessor functions). If you are using the cell: () => any column definition options, you will want to use the FlexRenderDirective from the adapter.

Cell column definition is reactive and runs into an injection context, then you can inject services or make use of signals to automatically modify the rendered content.

To render a Component into a specific column header/cell/footer, you can pass a FlexRenderComponent instantiated with your `ComponentType, with the ability to include parameters such as inputs, outputs and a custom injector.

Underneath, this utilizes the ViewContainerRef#createComponent api. Therefore, you should declare your custom inputs using the @Input decorator or input/model signals.

You can still access the table cell context through the injectFlexRenderContext function, which returns the context value based on the props you pass to the FlexRenderDirective.

Alternatively, you can render a component into a specific column header, cell, or footer by passing the component type to the corresponding column definitions. These column definitions will be provided to the flexRender directive along with the context.

Properties of context provided in the flexRender directive will be accessible to your component. You can explicitly define the context properties required by your component. In this example, the context provided to flexRender is of type HeaderContext. Input signal table, which is a property of HeaderContext together with column and header properties, is then defined to be used in the component. If any of the context properties are needed in your component, feel free to use them. Please take note that only input signal is supported, when defining access to context properties, using this approach.

In

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import {createAngularTable} from '@tanstack/angular-table'

export class AppComponent {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }))
}

// ...render your table in template
```

Example 2 (python):
```python
import {createAngularTable} from '@tanstack/angular-table'

export class AppComponent {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }))
}

// ...render your table in template
```

Example 3 (python):
```python
import {createAngularTable} from '@tanstack/angular-table'

export class AppComponent {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }))
}

// ...render your table in template
```

Example 4 (python):
```python
import {createAngularTable} from '@tanstack/angular-table'

export class AppComponent {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }))
}

// ...render your table in template
```

---

## TanStack Lit Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/lit

---

## TanStack Qwik Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/qwik

---

## TanStack Solid Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/solid

---

## TanStack Angular Table Documentation

**URL:** https://tanstack.com/table/latest/docs/framework/angular

---

## Vanilla TS/JS

**URL:** https://tanstack.com/table/latest/docs/vanilla

**Contents:**
- createTable

The @tanstack/table-core library contains the core logic for TanStack Table. If you are using a non-standard framework or don't have access to a framework, you can use the core library directly via TypeScript or JavaScript.

Takes an options object and returns a table.

**Examples:**

Example 1 (python):
```python
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```

Example 2 (python):
```python
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```

Example 3 (python):
```python
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```

Example 4 (python):
```python
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```

---

## Introduction

**URL:** https://tanstack.com/table/latest/docs/

**Contents:**
- What is "headless" UI?
- Component-based libraries vs Headless libraries
  - Which kind of table library should I use?
  - Component-based Table Libraries
  - Headless Table Libraries

TanStack Table is a Headless UI library for building powerful tables & datagrids for TS/JS, React, Vue, Solid, Qwik, and Svelte.

Headless UI is a term for libraries and utilities that provide the logic, state, processing and API for UI elements and interactions, but do not provide markup, styles, or pre-built implementations. Scratching your head yet? 😉 Headless UI has a few main goals:

The hardest parts of building complex UIs usually revolve around state, events, side-effects, data computation/management. By removing these concerns from the markup, styles and implementation details, our logic and components can be more modular and reusable.

Building UI is a very branded and custom experience, even if that means choosing a design system or adhering to a design spec. To support this custom experience, component-based UI libraries need to support a massive (and seemingly endless) API surface around markup and style customization. Headless UI libraries decouple your logic from your UI

When you use a headless UI library, the complex task of data-processing, state-management, and business logic are handled for you, leaving you to worry about higher-cardinality decisions that differ across implementations and use cases.

Want to dive deeper? Read more about Headless UI.

In the ecosystem of table/datagrid libraries, there are two main categories:

Each approach has subtle tradeoffs. Understanding these subtleties will help you make the right decision for your application and team.

Component-based table libraries will typically supply you with a feature-rich drop-in solution and ready-to-use components/markup complete with styles/theming. AG Grid is a great example of this type of table library.

If you want a ready-to-use table and design/bundle-size are not hard requirements, then you should consider using a component-based table library.

There are a lot of component-based table libraries out there, but we believe AG Grid is the gold standard and is by far our favorite grid-sibling (don't tell the others 🤫).

Headless table libraries will typically supply you with functions, state, utilities and event listeners to build your own table markup or attach to existing table markups.

If you want a lighter-weight table or full control over the design, then you should consider using a headless table library.

There are very few headless table libraries out there and obviously, TanStack Table is our favorite!

---
