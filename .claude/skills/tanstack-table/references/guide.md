# Tanstack-Table - Guide

**Pages:** 37

---

## Columns Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-defs

**Contents:**
- API
- Column Definitions Guide
- Column Def Types
- Column Helpers
- Creating Accessor Columns
- Object Keys
- Array Indices
- Accessor Functions
- Unique Column IDs
- Column Formatting & Rendering

Column defs are the single most important part of building a table. They are responsible for:

The following "types" of column defs aren't actually TypeScript types, but more so a way to talk about and describe overall categories of column defs:

While column defs are just plain objects at the end of the day, a createColumnHelper function is exposed from the table core which, when called with a row type, returns a utility for creating different column definition types with the highest type-safety possible.

Here's an example of creating and using a column helper:

Data columns are unique in that they must be configured to extract primitive values for each item in your data array.

There are 3 ways to do this:

If each of your items is an object with the following shape:

You could extract the firstName value like so:

If each of your items is an array with the following shape:

You could extract the number value like so:

If each of your items is an object with the following shape:

You could extract a computed full-name value like so:

🧠 Remember, the accessed value is what is used to sort, filter, etc. so you'll want to make sure your accessor function returns a primitive value that can be manipulated in a meaningful way. If you return a non-primitive value like an object or array, you will need the appropriate filter/sort/grouping functions to manipulate them, or even supply your own! 😬

Columns are uniquely identified with 3 strategies:

🧠 An easy way to remember: If you define a column with an accessor function, either provide a string header or provide a unique id property.

By default, columns cells will display their data model value as a string. You can override this behavior by providing custom rendering implementations. Each implementation is provided relevant information about the cell, header or footer and returns something your framework adapter can render eg. JSX/Components/strings/etc. This will depend on which adapter you are using.

There are a couple of formatters available to you:

You can provide a custom cell formatter by passing a function to the cell property and using the props.getValue() function to access your cell's value:

Cell formatters are also provided the row and table objects, allowing you to customize the cell formatting beyond just the cell value. The example below provides firstName as the accessor, but also displays a prefixed user ID located on the original row object:

For more info on aggregated cells, see grouping

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// Make some columns!
const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // Grouping Column
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
       
...
```

Example 2 (javascript):
```javascript
// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// Make some columns!
const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // Grouping Column
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
       
...
```

Example 3 (javascript):
```javascript
// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// Make some columns!
const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // Grouping Column
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
       
...
```

Example 4 (javascript):
```javascript
// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// Make some columns!
const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // Grouping Column
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
       
...
```

---

## Column Sizing Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-sizing

**Contents:**
- Examples
- API
- Column Sizing Guide
  - Column Widths
  - Column Resizing
    - Enable Column Resizing
    - Column Resize Mode
    - Column Resize Direction
    - Connect Column Resizing APIs to UI
      - Column Size APIs

Want to skip to the implementation? Check out these examples:

The column sizing feature allows you to optionally specify the width of each column including min and max widths. It also allows you and your users the ability to dynamically change the width of all columns at will, eg. by dragging the column headers.

Columns by default are given the following measurement options:

These defaults can be overridden by both tableOptions.defaultColumn and individual column defs, in that order.

The column "sizes" are stored in the table state as numbers, and are usually interpreted as pixel unit values, but you can hook up these column sizing values to your css styles however you see fit.

As a headless utility, table logic for column sizing is really only a collection of states that you can apply to your own layouts how you see fit (our example above implements 2 styles of this logic). You can apply these width measurements in a variety of ways:

Each of these approaches has its own tradeoffs and limitations which are usually opinions held by a UI/component library or design system, luckily not you 😉.

TanStack Table provides built-in column resizing state and APIs that allow you to easily implement column resizing in your table UI with a variety of options for UX and performance.

By default, the column.getCanResize() API will return true by default for all columns, but you can either disable column resizing for all columns with the enableColumnResizing table option, or disable column resizing on a per-column basis with the enableResizing column option.

By default, the column resize mode is set to "onEnd". This means that the column.getSize() API will not return the new column size until the user has finished resizing (dragging) the column. Usually a small UI indicator will be displayed while the user is resizing the column.

In React TanStack Table adapter, where achieving 60 fps column resizing renders can be difficult, depending on the complexity of your table or web page, the "onEnd" column resize mode can be a good default option to avoid stuttering or lagging while the user resizes columns. That is not to say that you cannot achieve 60 fps column resizing renders while using TanStack React Table, but you may have to do some extra memoization or other performance optimizations in order to achieve this.

Advanced column resizing performance tips will be discussed down below.

If you want to change the column resize mode to "onChange" for immediate column r

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

Example 2 (javascript):
```javascript
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

Example 3 (javascript):
```javascript
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

Example 4 (javascript):
```javascript
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

---

## Global Faceting Guide

**URL:** https://tanstack.com/table/latest/docs/guide/global-faceting

**Contents:**
- Examples
- API
- Global Faceting Guide
  - Global Faceting Row Models
  - Use Global Faceted Row Models
  - Custom Global (Server-Side) Faceting

Want to skip to the implementation? Check out these examples:

Global Faceting allows you to generate lists of values for all columns from the table's data. For example, a list of unique values in a table can be generated from all rows in all columns to be used as search suggestions in an autocomplete filter component. Or, a tuple of minimum and maximum values can be generated from a table of numbers to be used as a range for a range slider filter component.

In order to use any of the global faceting features, you must include the appropriate row models in your table options.

Once you have included the appropriate row models in your table options, you will be able to use the faceting table instance APIs to access the lists of values generated by the faceted row models.

If instead of using the built-in client-side faceting features, you can implement your own faceting logic on the server-side and pass the faceted values to the client-side. You can use the getGlobalFacetedUniqueValues and getGlobalFacetedMinMaxValues table options to resolve the faceted values from the server-side.

In this example, we use the useQuery hook from react-query to fetch faceting data from the server. Once the data is fetched, we set the getGlobalFacetedUniqueValues and getGlobalFacetedMinMaxValues table options to return the faceted values from the server response. This will allow the table to use the server-side faceting data for generating autocomplete suggestions and range filters.

**Examples:**

Example 1 (python):
```python
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
} from '@tanstack/react-table'
//...
const table = useReactTable({
  // other options...
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //Faceting model for client-side faceting (other faceting methods depend on this model)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if
...
```

Example 2 (python):
```python
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
} from '@tanstack/react-table'
//...
const table = useReactTable({
  // other options...
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //Faceting model for client-side faceting (other faceting methods depend on this model)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if
...
```

Example 3 (python):
```python
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
} from '@tanstack/react-table'
//...
const table = useReactTable({
  // other options...
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //Faceting model for client-side faceting (other faceting methods depend on this model)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if
...
```

Example 4 (python):
```python
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
} from '@tanstack/react-table'
//...
const table = useReactTable({
  // other options...
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //Faceting model for client-side faceting (other faceting methods depend on this model)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if
...
```

---

## Headers Guide

**URL:** https://tanstack.com/table/latest/docs/guide/headers

**Contents:**
- API
- Headers Guide
  - Where to Get Headers From
    - HeaderGroup Headers
    - Header Table Instance APIs
  - Header Objects
    - Header IDs
    - Nested Grouped Headers Properties
    - Header Parent Objects
  - More Header APIs

This quick guide will discuss the different ways you can retrieve and interact with header objects in TanStack Table.

Headers are the equivalent of cells, but meant for the <thead> section of the table instead of the <tbody> section.

Headers come from Header Groups, which are the equivalent of rows, but meant for the <thead> section of the table instead of the <tbody> section.

If you are in a header group, the headers are stored as an array in the headerGroup.headers property. Usually you will just map over this array to render your headers.

There are multiple table instance APIs that you can use to retrieve a list of headers depending on the features that you are using. The most common API you might use is table.getFlatHeaders, which will return a flat list of all headers in the table, but there are at least a dozen other headers that are useful in tandem with the column visibility and column pinning features. APIs like table.getLeftLeafHeaders or table.getRightFlatHeaders could be useful depending on your use case.

Header objects are similar to Cell objects, but meant for the <thead> section of the table instead of the <tbody> section. Every header object can be associated with a <th> or similar cell element in your UI. There are a few properties and methods on header objects that you can use to interact with the table state and extract cell values from the table based on the state of the table.

Every header object has an id property that makes it unique within the table instance. Usually you only need this id as a unique identifier for React keys or if you are following the performant column resizing example.

For simple headers with no advanced nested or grouped headers logic, the header.id will be the same as it's parent column.id. However, if the header is part group column or a placeholder cell, it will have a more complicated id that is constructed from the header family, depth/header row index, column id, and header group id.

There are a few properties on header objects that are only useful if the header is part of a nested or grouped header structure. These properties include:

Note: header.index refers to its index within the header group (row of headers), i.e. its position from left to right. It is not the same as header.depth, which refers to the header group "row index".

Every header stores a reference to its parent column object and its parent header group object.

Headers have a few more useful APIs attached to them that are useful 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 2 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 3 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 4 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

---

## Column Visibility Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-visibility

**Contents:**
- Examples
  - Other Examples
- API
- Column Visibility Guide
  - Column Visibility State
  - Disable Hiding Columns
  - Column Visibility Toggle APIs
  - Column Visibility Aware Table APIs

Want to skip to the implementation? Check out these examples:

Column Visibility API

The column visibility feature allows table columns to be hidden or shown dynamically. In previous versions of react-table, this feature was a static property on a column, but in v8, there is a dedicated columnVisibility state and APIs for managing column visibility dynamically.

The columnVisibility state is a map of column IDs to boolean values. A column will be hidden if its ID is present in the map and the value is false. If the column ID is not present in the map, or the value is true, the column will be shown.

Alternatively, if you don't need to manage the column visibility state outside of the table, you can still set the initial default column visibility state using the initialState option.

Note: If columnVisibility is provided to both initialState and state, the state initialization will take precedence and initialState will be ignored. Do not provide columnVisibility to both initialState and state, only one or the other.

By default, all columns can be hidden or shown. If you want to prevent certain columns from being hidden, you set the enableHiding column option to false for those columns.

There are several column API methods that are useful for rendering column visibility toggles in the UI.

When you render your header, body, and footer cells, there are a lot of API options available. You may see APIs like table.getAllLeafColumns and row.getAllCells, but if you use these APIs, they will not take column visibility into account. Instead, you need to use the "visible" variants of these APIs, such as table.getVisibleLeafColumns and row.getVisibleCells.

If you are using the Header Group APIs, they will already take column visibility into account.

**Examples:**

Example 1 (javascript):
```javascript
const [columnVisibility, setColumnVisibility] = useState({
  columnId1: true,
  columnId2: false, //hide this column by default
  columnId3: true,
});

const table = useReactTable({
  //...
  state: {
    columnVisibility,
    //...
  },
  onColumnVisibilityChange: setColumnVisibility,
});
```

Example 2 (javascript):
```javascript
const [columnVisibility, setColumnVisibility] = useState({
  columnId1: true,
  columnId2: false, //hide this column by default
  columnId3: true,
});

const table = useReactTable({
  //...
  state: {
    columnVisibility,
    //...
  },
  onColumnVisibilityChange: setColumnVisibility,
});
```

Example 3 (javascript):
```javascript
const [columnVisibility, setColumnVisibility] = useState({
  columnId1: true,
  columnId2: false, //hide this column by default
  columnId3: true,
});

const table = useReactTable({
  //...
  state: {
    columnVisibility,
    //...
  },
  onColumnVisibilityChange: setColumnVisibility,
});
```

Example 4 (javascript):
```javascript
const [columnVisibility, setColumnVisibility] = useState({
  columnId1: true,
  columnId2: false, //hide this column by default
  columnId3: true,
});

const table = useReactTable({
  //...
  state: {
    columnVisibility,
    //...
  },
  onColumnVisibilityChange: setColumnVisibility,
});
```

---

## Virtualization Guide

**URL:** https://tanstack.com/table/latest/docs/guide/virtualization

**Contents:**
- Examples
- Virtualization Guide

Want to skip to the implementation? Check out these examples:

The TanStack Table packages do not come with any virtualization APIs or features built-in, but TanStack Table can easily work with other virtualization libraries like react-window or TanStack's own TanStack Virtual. This guide will show some strategies for using TanStack Table with TanStack Virtual.

---

## Header Groups Guide

**URL:** https://tanstack.com/table/latest/docs/guide/header-groups

**Contents:**
- API
- Header Groups Guide
  - What are Header Groups?
  - Where to Get Header Groups From
  - Header Group Objects
  - Access Header Cells

This quick guide will discuss the different ways you can retrieve and interact with header group objects in TanStack Table.

Header Groups are simply "rows" of headers. Don't let the name confuse you, it's just that simple. The large majority of tables will only have one row of headers (a single header group), but if you define your column structure with nested columns as with the Column Groups example, you can have multiple rows of headers (multiple header groups).

There are multiple table instance APIs you can use to retrieve header groups from the table instance. table.getHeaderGroups is the most common API to use, but depending on the features that you are using, you may need to use other APIs, such as table.get[Left/Center/Right]HeaderGroups if you are using column pinning features.

Header Group objects are similar to Row objects, though simpler since there is not as much going on in header rows as there are in the body rows.

By default, header groups only have three properties:

To render the header cells in a header group, you just map over the headers array from the header group object.

**Examples:**

Example 1 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 2 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 3 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

Example 4 (javascript):
```javascript
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // map over the headerGroup headers array
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

---

## Data Guide

**URL:** https://tanstack.com/table/latest/docs/guide/data

**Contents:**
- Data Guide
  - TypeScript
    - TypeScript Generics
  - Defining Data Types
    - Deep Keyed Data
    - Nested Sub-Row Data
  - Give Data a "Stable" Reference
  - How TanStack Table Transforms Data
  - How Much Data Can TanStack Table Handle?

Tables start with your data. Your column definitions and rows will depend on the shape of your data. TanStack Table has some TypeScript features that will help you create the rest of your table code with a great type-safe experience. If you set up your data and types correctly, TanStack Table will be able to infer the shape of your data and enforce that your column definitions are made correctly.

TypeScript is NOT required to use the TanStack Table packages... BUT TanStack Table is written and organized in such a way that makes the awesome TypeScript experience that you get feel like it is one of the main selling points of the library. If you are not using TypeScript, you will be missing out on a lot of great autocompletion and type-checking features that will both speed up your development time and reduce the number of bugs in your code.

Having a basic understanding of what TypeScript Generics are and how they work will help you understand this guide better, but it should be easy enough to pick up as you go. The official TypeScript Generics Docs may be helpful for those not yet familiar with TypeScript.

data is an array of objects that will be turned into the rows of your table. Each object in the array represents a row of data (under normal circumstances). If you are using TypeScript, we usually define a type for the shape of our data. This type is used as a generic type for all of the other table, column, row, and cell instances. This Generic is usually referred to as TData throughout the rest of the TanStack Table types and APIs.

For example, if we have a table that displays a list of users in an array like this:

Then we can define a User (TData) type like this:

We can then define our data array with this type, and then TanStack Table will be able to intelligently infer lots of types for us later on in our columns, rows, cells, etc. This is because the data type is literally defined as the TData generic type. Whatever you pass to the data table option will become the TData type for the rest of the table instance. Just make sure your column definitions use the same TData type as the data type when you define them later.

If your data is not a nice flat array of objects, that's okay! Once you get around to defining your columns, there are strategies for accessing deeply nested data in your accessors.

If your data looks something like this:

You can define a type like this:

And you will be able to access the data in your column definitions with ei

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 2 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 3 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 4 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

---

## Features Guide

**URL:** https://tanstack.com/table/latest/docs/guide/features

TanStack Table comes with many features, each with their own associated options and API:

---

## Row Selection Guide

**URL:** https://tanstack.com/table/latest/docs/guide/row-selection

**Contents:**
- Examples
- API
- Row Selection Guide
  - Access Row Selection State
  - Manage Row Selection State
  - Useful Row Ids
  - Enable Row Selection Conditionally
  - Single Row Selection
  - Sub-Row Selection
  - Render Row Selection UI

Want to skip to the implementation? Check out these examples:

The row selection feature keeps track of which rows are selected and allows you to toggle the selection of rows in a myriad of ways. Let's take a look at some common use cases.

The table instance already manages the row selection state for you (though as seen down below, it may be more convenient to manage the row selection state in your own scope). You can access the internal row selection state or the selected rows from a few APIs.

Note: If you are using manualPagination, be aware that the getSelectedRowModel API will only return selected rows on the current page because table row models can only generate rows based on the data that is passed in. Row selection state, however, can contain row ids that are not present in the data array just fine.

Even though the table instance will already manage the row selection state for you, it is usually more convenient to manage the state yourself in order to have easy access to the selected row ids that you can use to make API calls or other actions.

Use the onRowSelectionChange table option to hoist up the row selection state to your own scope. Then pass the row selection state back to the table instance using in the state table option.

By default, the row id for each row is simply the row.index. If you are using row selection features, you most likely want to use a more useful row identifier, since the row selection state is keyed by row id. You can use the getRowId table option to specify a function that returns a unique row id for each row.

Now as rows are selected, the row selection state will look something like this:

Row selection is enabled by default for all rows. To either enable row selection conditionally for certain rows or disable row selection for all rows, you can use the enableRowSelection table option which accepts either a boolean or a function for more granular control.

To enforce whether a row is selectable or not in your UI, you can use the row.getCanSelect() API for your checkboxes or other selection UI.

By default, the table allows multiple rows to be selected at once. If, however, you only want to allow a single row to be selected at once, you can set the enableMultiRowSelection table option to false to disable multi-row selection, or pass in a function to disable multi-row selection conditionally for a row's sub-rows.

This is useful for making tables that have radio buttons instead of checkboxes.

By default, selecting

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
console.log(table.getState().rowSelection) //get the row selection state - { 1: true, 2: false, etc... }
console.log(table.getSelectedRowModel().rows) //get full client-side selected rows
console.log(table.getFilteredSelectedRowModel().rows) //get filtered client-side selected rows
console.log(table.getGroupedSelectedRowModel().rows) //get grouped client-side selected rows
```

Example 2 (unknown):
```unknown
console.log(table.getState().rowSelection) //get the row selection state - { 1: true, 2: false, etc... }
console.log(table.getSelectedRowModel().rows) //get full client-side selected rows
console.log(table.getFilteredSelectedRowModel().rows) //get filtered client-side selected rows
console.log(table.getGroupedSelectedRowModel().rows) //get grouped client-side selected rows
```

Example 3 (unknown):
```unknown
console.log(table.getState().rowSelection) //get the row selection state - { 1: true, 2: false, etc... }
console.log(table.getSelectedRowModel().rows) //get full client-side selected rows
console.log(table.getFilteredSelectedRowModel().rows) //get filtered client-side selected rows
console.log(table.getGroupedSelectedRowModel().rows) //get grouped client-side selected rows
```

Example 4 (unknown):
```unknown
console.log(table.getState().rowSelection) //get the row selection state - { 1: true, 2: false, etc... }
console.log(table.getSelectedRowModel().rows) //get full client-side selected rows
console.log(table.getFilteredSelectedRowModel().rows) //get filtered client-side selected rows
console.log(table.getGroupedSelectedRowModel().rows) //get grouped client-side selected rows
```

---

## Expanding Guide

**URL:** https://tanstack.com/table/latest/docs/guide/expanding

**Contents:**
- Examples
- API
- Expanding Feature Guide
  - Different use cases for Expanding Features
  - Enable Client-Side Expanding
  - Table rows as expanded data
  - Custom Expanding UI
  - Expanded rows state
  - UI toggling handler for expanded rows
  - Filtering Expanded Rows

Want to skip to the implementation? Check out these examples:

Expanding is a feature that allows you to show and hide additional rows of data related to a specific row. This can be useful in cases where you have hierarchical data and you want to allow users to drill down into the data from a higher level. Or it can be useful for showing additional information related to a row.

There are multiple use cases for expanding features in TanStack Table that will be discussed below.

To use the client-side expanding features, you need to define the getExpandedRowModel function in your table options. This function is responsible for returning the expanded row model.

Expanded data can either contain table rows or any other data you want to display. We will discuss how to handle both cases in this guide.

Expanded rows are essentially child rows that inherit the same column structure as their parent rows. If your data object already includes these expanded rows data, you can utilize the getSubRows function to specify these child rows. However, if your data object does not contain the expanded rows data, they can be treated as custom expanded data, which is discussed in next section.

For example, if you have a data object like this:

Then you can use the getSubRows function to return the children array in each row as expanded rows. The table instance will now understand where to look for the sub rows on each row.

Note: You can have a complicated getSubRows function, but keep in mind that it will run for every row and every sub-row. This can be expensive if the function is not optimized. Async functions are not supported.

In some cases, you may wish to show extra details or information, which may or may not be part of your table data object, such as expanded data for rows. This kind of expanding row UI has gone by many names over the years including "expandable rows", "detail panels", "sub-components", etc.

By default, the row.getCanExpand() row instance API will return false unless it finds subRows on a row. This can be overridden by implementing your own getRowCanExpand function in the table instance options.

If you need to control the expanded state of the rows in your table, you can do so by using the expanded state and the onExpandedChange option. This allows you to manage the expanded state according to your requirements.

The ExpandedState type is defined as follows:

If the ExpandedState is true, it means all rows are expanded. If it's a record, only th

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useReactTable({
  // other options...
  getExpandedRowModel: getExpandedRowModel(),
})
```

Example 2 (javascript):
```javascript
const table = useReactTable({
  // other options...
  getExpandedRowModel: getExpandedRowModel(),
})
```

Example 3 (javascript):
```javascript
const table = useReactTable({
  // other options...
  getExpandedRowModel: getExpandedRowModel(),
})
```

Example 4 (javascript):
```javascript
const table = useReactTable({
  // other options...
  getExpandedRowModel: getExpandedRowModel(),
})
```

---

## Table Instance Guide

**URL:** https://tanstack.com/table/latest/docs/guide/tables

**Contents:**
- API
- Table Instance Guide
  - Creating a Table Instance
    - Defining Data
    - Defining Columns
    - Creating the Table Instance
  - Table State
  - Table APIs
  - Table Row Models

TanStack Table is a headless UI library. When we talk about the table or "table instance", we're not talking about a literal <table> element. Instead, we're referring to the core table object that contains the table state and APIs. The table instance is created by calling your adapter's createTable function (e.g. useReactTable, createSolidTable, createSvelteTable, useQwikTable, useVueTable).

To create a table instance, 2 options are required: columns and data. There are dozens of other table options to configure features and behavior, but these 2 are required.

data is an array of objects that will be turned into the rows of your table. Each object in the array represents a row of data (under normal circumstances). If you are using TypeScript, we usually define a type for the shape of our data. This type is used as a generic type for all of the other table, column, row, and cell instances. This type is usually referred to as TData.

For example, if we have a table that displays a list of users in an array like this:

Then we can define a User (TData) type like this:

We can then define our data array with this type, and then TanStack Table will be able to intelligently infer lots of types for us later on in our columns, rows, cells, etc.

Note: data needs a "stable" reference (especially in React) in order to prevent infinite re-renders. This is why we recommend using React.useState or React.useMemo, or defining your data outside of the same react component that creates the table instance, or using a library like TanStack Query to manage your data state.

Column definitions are covered in detail in the next section in the Column Def Guide. We'll note here, however, that when you define the type of your columns, you should use the same TData type that you used for you data.

The column definitions are where we will tell TanStack Table how each column should access and/or transform row data with either an accessorKey or accessorFn. See the Column Def Guide for more info.

With our columns and data defined, we can now create our basic table instance.

So what's in the table instance? Let's take a look at what interactions we can have with the table instance.

The table instance contains all of the table state, which can be accessed via the table.getState() API. Each table feature registers various states in the table state. For example, the row selection feature registers rowSelection state, the pagination feature registers pagination state, etc.

Each featu

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 2 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 3 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

Example 4 (unknown):
```unknown
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

---

## Global Filtering Guide

**URL:** https://tanstack.com/table/latest/docs/guide/global-filtering

**Contents:**
- Examples
- API
- Global Filtering Guide
  - Client-Side vs Server-Side Filtering
  - Manual Server-Side Global Filtering
  - Client-Side Global Filtering
  - Global Filter Function
  - Global Filter State
  - Adding global filter input to UI
  - Custom Global Filter Function

Want to skip to the implementation? Check out these examples:

Filtering comes in 2 flavors: Column Filtering and Global Filtering.

This guide will focus on global filtering, which is a filter that is applied across all columns.

If you have a large dataset, you may not want to load all of that data into the client's browser in order to filter it. In this case, you will most likely want to implement server-side filtering, sorting, pagination, etc.

However, as also discussed in the Pagination Guide, a lot of developers underestimate how many rows can be loaded client-side without a performance hit. The TanStack table examples are often tested to handle up to 100,000 rows or more with decent performance for client-side filtering, sorting, pagination, and grouping. This doesn't necessarily mean that your app will be able to handle that many rows, but if your table is only going to have a few thousand rows at most, you might be able to take advantage of the client-side filtering, sorting, pagination, and grouping that TanStack table provides.

TanStack Table can handle thousands of client-side rows with good performance. Don't rule out client-side filtering, pagination, sorting, etc. without some thought first.

Every use-case is different and will depend on the complexity of the table, how many columns you have, how large every piece of data is, etc. The main bottlenecks to pay attention to are:

If you're not sure, you can always start with client-side filtering and pagination and then switch to server-side strategies in the future as your data grows.

If you have decided that you need to implement server-side global filtering instead of using the built-in client-side global filtering, here's how you do that.

No getFilteredRowModel table option is needed for manual server-side global filtering. Instead, the data that you pass to the table should already be filtered. However, if you have passed a getFilteredRowModel table option, you can tell the table to skip it by setting the manualFiltering option to true.

Note: When using manual global filtering, many of the options that are discussed in the rest of this guide will have no effect. When manualFiltering is set to true, the table instance will not apply any global filtering logic to the rows that are passed to it. Instead, it will assume that the rows are already filtered and will use the data that you pass to it as-is.

If you are using the built-in client-side global filtering, first you need to pass i

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side global filtering
  manualFiltering: true,
})
```

Example 2 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side global filtering
  manualFiltering: true,
})
```

Example 3 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side global filtering
  manualFiltering: true,
})
```

Example 4 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side global filtering
  manualFiltering: true,
})
```

---

## Custom Features Guide

**URL:** https://tanstack.com/table/latest/docs/guide/custom-features

**Contents:**
- Examples
- Custom Features Guide
  - TanStack Table Strives to be Lean
  - How TanStack Table Features Work
    - Default Options and Initial State
      - getDefaultOptions
      - getDefaultColumnDef
      - getInitialState
    - API Creators
      - createTable

Want to skip to the implementation? Check out these examples:

In this guide, we'll cover how to extend TanStack Table with custom features, and along the way, we'll learn more about how the TanStack Table v8 codebase is structured and how it works.

TanStack Table has a core set of features that are built into the library such as sorting, filtering, pagination, etc. We've received a lot of requests and sometimes even some well thought out PRs to add even more features to the library. While we are always open to improving the library, we also want to make sure that TanStack Table remains a lean library that does not include too much bloat and code that is unlikely to be used in most use cases. Not every PR can, or should, be accepted into the core library, even if it does solve a real problem. This can be frustrating to developers where TanStack Table solves 90% of their use case, but they need a little bit more control.

TanStack Table has always been built in a way that allows it to be highly extensible (at least since v7). The table instance that is returned from whichever framework adapter that you are using (useReactTable, useVueTable, etc) is a plain JavaScript object that can have extra properties or APIs added to it. It has always been possible to use composition to add custom logic, state, and APIs to the table instance. Libraries like Material React Table have simply created custom wrapper hooks around the useReactTable hook to extend the table instance with custom functionality.

However, starting in version 8.14.0, TanStack Table has exposed a new _features table option that allows you to more tightly and cleanly integrate custom code into the table instance in exactly the same way that the built-in table features are already integrated.

TanStack Table v8.14.0 introduced a new _features option that allows you to add custom features to the table instance.

With this new tighter integration, you can easily add more complex custom features to your tables, and possibly even package them up and share them with the community. We'll see how this evolves over time. In a future v9 release, we may even lower the bundle size of TanStack Table by making all features opt-in, but that is still being explored.

TanStack Table's source code is arguably somewhat simple (at least we think so). All code for each feature is split up into its own object/file with instantiation methods to create initial state, default table and column options, and API methods that 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
export interface TableFeature<TData extends RowData = any> {
  createCell?: (
    cell: Cell<TData, unknown>,
    column: Column<TData>,
    row: Row<TData>,
    table: Table<TData>
  ) => void
  createColumn?: (column: Column<TData, unknown>, table: Table<TData>) => void
  createHeader?: (header: Header<TData, unknown>, table: Table<TData>) => void
  createRow?: (row: Row<TData>, table: Table<TData>) => void
  createTable?: (table: Table<TData>) => void
  getDefaultColumnDef?: () => Partial<ColumnDef<TData, unknown>>
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableOptionsR
...
```

Example 2 (javascript):
```javascript
export interface TableFeature<TData extends RowData = any> {
  createCell?: (
    cell: Cell<TData, unknown>,
    column: Column<TData>,
    row: Row<TData>,
    table: Table<TData>
  ) => void
  createColumn?: (column: Column<TData, unknown>, table: Table<TData>) => void
  createHeader?: (header: Header<TData, unknown>, table: Table<TData>) => void
  createRow?: (row: Row<TData>, table: Table<TData>) => void
  createTable?: (table: Table<TData>) => void
  getDefaultColumnDef?: () => Partial<ColumnDef<TData, unknown>>
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableOptionsR
...
```

Example 3 (javascript):
```javascript
export interface TableFeature<TData extends RowData = any> {
  createCell?: (
    cell: Cell<TData, unknown>,
    column: Column<TData>,
    row: Row<TData>,
    table: Table<TData>
  ) => void
  createColumn?: (column: Column<TData, unknown>, table: Table<TData>) => void
  createHeader?: (header: Header<TData, unknown>, table: Table<TData>) => void
  createRow?: (row: Row<TData>, table: Table<TData>) => void
  createTable?: (table: Table<TData>) => void
  getDefaultColumnDef?: () => Partial<ColumnDef<TData, unknown>>
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableOptionsR
...
```

Example 4 (javascript):
```javascript
export interface TableFeature<TData extends RowData = any> {
  createCell?: (
    cell: Cell<TData, unknown>,
    column: Column<TData>,
    row: Row<TData>,
    table: Table<TData>
  ) => void
  createColumn?: (column: Column<TData, unknown>, table: Table<TData>) => void
  createHeader?: (header: Header<TData, unknown>, table: Table<TData>) => void
  createRow?: (row: Row<TData>, table: Table<TData>) => void
  createTable?: (table: Table<TData>) => void
  getDefaultColumnDef?: () => Partial<ColumnDef<TData, unknown>>
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableOptionsR
...
```

---

## Column Ordering Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-ordering

**Contents:**
- Examples
- API
- Column Ordering Guide
  - What Affects Column Order
  - Column Order State
    - Default Column Order
    - Managing Column Order State
  - Reordering Columns
    - Drag and Drop Column Reordering Suggestions (React)

Want to skip to the implementation? Check out these examples:

By default, columns are ordered in the order they are defined in the columns array. However, you can manually specify the column order using the columnOrder state. Other features like column pinning and grouping can also affect the column order.

There are 3 table features that can reorder columns, which happen in the following order:

Note: columnOrder state will only affect unpinned columns if used in conjunction with column pinning.

If you don't provide a columnOrder state, TanStack Table will just use the order of the columns in the columns array. However, you can provide an array of string column ids to the columnOrder state to specify the order of the columns.

If all you need to do is specify the initial column order, you can just specify the columnOrder state in the initialState table option.

Note: If you are using the state table option to also specify the columnOrder state, the initialState will have no effect. Only specify particular states in either initialState or state, not both.

If you need to dynamically change the column order, or set the column order after the table has been initialized, you can manage the columnOrder state just like any other table state.

If the table has UI that allows the user to reorder columns, you can set up the logic something like this:

There are undoubtedly many ways to implement drag and drop features along-side TanStack Table. Here are a few suggestions in order for you to not have a bad time:

Do NOT try to use "react-dnd" if you are using React 18 or newer. React DnD was an important library for its time, but it now does not get updated very often, and it has incompatibilities with React 18, especially in React Strict Mode. It is still possible to get it to work, but there are newer alternatives that have better compatibility and are more actively maintained. React DnD's Provider may also interfere and conflict with any other DnD solutions you may want to try in your app.

Use "@dnd-kit/core". DnD Kit is a modern, modular and lightweight drag and drop library that is highly compatible with the modern React ecosystem, and it works well with semantic <table> markup. Both of the official TanStack DnD examples, Column DnD and Row DnD, now use DnD Kit.

Consider other DnD libraries like "react-beautiful-dnd", but be aware of their potentially large bundle sizes, maintenance status, and compatibility with <table> markup.

Consider using native brow

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useReactTable({
  //...
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  }
  //...
});
```

Example 2 (javascript):
```javascript
const table = useReactTable({
  //...
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  }
  //...
});
```

Example 3 (javascript):
```javascript
const table = useReactTable({
  //...
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  }
  //...
});
```

Example 4 (javascript):
```javascript
const table = useReactTable({
  //...
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  }
  //...
});
```

---

## Migrating to V8 Guide

**URL:** https://tanstack.com/table/latest/docs/guide/migrating

**Contents:**
- Migrating to V8
  - Notable Changes
  - Install the new Version
  - Update Table Options
  - Update column definitions
  - Migrate Table Markup
  - Other Changes

TanStack Table V8 was a major rewrite of React Table v7 from the ground up in TypeScript. The overall structure/organization of your markup and CSS will largely remain the same, but many of the APIs have been renamed or replaced.

The new version of TanStack Table is published under the @tanstack scope. Install the new package using your favorite package manager:

Types are now included in the base package, so you can remove the @types/react-table package.

If you want, you can keep the old react-table packages installed so that you can gradually migrate your code. You should be able to use both packages side-by-side for separate tables without any issues.

Note: If defining columns inside a component, you should still try to give the column definitions a stable identity. This will help with performance and prevent unnecessary re-renders. Store the column definitions in either a useMemo or useState hook.

Column Option Name Changes

Changes to custom cell renderers

This guide is a work in progress. Please consider contributing to it if you have time!

**Examples:**

Example 1 (unknown):
```unknown
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

Example 2 (unknown):
```unknown
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

Example 3 (unknown):
```unknown
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

Example 4 (unknown):
```unknown
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

---

## Column Filtering Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-filtering

**Contents:**
- Examples
- API
- Column Filtering Guide
  - Client-Side vs Server-Side Filtering
  - Manual Server-Side Filtering
  - Client-Side Filtering
  - Column Filter State
    - Accessing Column Filter State
  - Controlled Column Filter State
    - Initial Column Filter State

Want to skip to the implementation? Check out these examples:

Filtering comes in 2 flavors: Column Filtering and Global Filtering.

This guide will focus on column filtering, which is a filter that is applied to a single column's accessor value.

TanStack table supports both both client-side and manual server-side filtering. This guide will go over how to implement and customize both, and help you decide which one is best for your use-case.

If you have a large dataset, you may not want to load all of that data into the client's browser in order to filter it. In this case, you will most likely want to implement server-side filtering, sorting, pagination, etc.

However, as also discussed in the Pagination Guide, a lot of developers underestimate how many rows can be loaded client-side without a performance hit. The TanStack table examples are often tested to handle up to 100,000 rows or more with decent performance for client-side filtering, sorting, pagination, and grouping. This doesn't necessarily that your app will be able to handle that many rows, but if your table is only going to have a few thousand rows at most, you might be able to take advantage of the client-side filtering, sorting, pagination, and grouping that TanStack table provides.

TanStack Table can handle thousands of client-side rows with good performance. Don't rule out client-side filtering, pagination, sorting, etc. without some thought first.

Every use-case is different and will depend on the complexity of the table, how many columns you have, how large every piece of data is, etc. The main bottlenecks to pay attention to are:

If you're not sure, you can always start with client-side filtering and pagination and then switch to server-side strategies in the future as your data grows.

If you have decided that you need to implement server-side filtering instead of using the built-in client-side filtering, here's how you do that.

No getFilteredRowModel table option is needed for manual server-side filtering. Instead, the data that you pass to the table should already be filtered. However, if you have passed a getFilteredRowModel table option, you can tell the table to skip it by setting the manualFiltering option to true.

Note: When using manual filtering, many of the options that are discussed in the rest of this guide will have no effect. When is manualFiltering is set to true, the table instance will not apply any filtering logic to the rows that are passed to it. Instead, it wi

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side filtering
  manualFiltering: true,
})
```

Example 2 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side filtering
  manualFiltering: true,
})
```

Example 3 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side filtering
  manualFiltering: true,
})
```

Example 4 (javascript):
```javascript
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(), // not needed for manual server-side filtering
  manualFiltering: true,
})
```

---

## Table State (React) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/react/guide/table-state

**Contents:**
- Examples
- Table State (React) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.

Want to skip to the implementation? Check out these examples:

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a react tree, lik

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 2 (javascript):
```javascript
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 3 (javascript):
```javascript
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 4 (javascript):
```javascript
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

---

## Row Models Guide

**URL:** https://tanstack.com/table/latest/docs/guide/row-models

**Contents:**
- Row Models Guide
  - What are Row Models?
  - Import Row Models
  - Customize/Fork Row Models
  - Using Row Models
  - Available Row Models on Table Instance
  - The Order of Row Model Execution
  - Row Model Data Structure

If you take a look at the most basic example of TanStack Table, you'll see a code snippet like this:

What is this getCoreRowModel function? And why do you have to import it from TanStack Table only to just pass it back to itself?

Well, the answer is that TanStack Table is a modular library. Not all code for every single feature is included in the createTable functions/hooks by default. You only need to import and include the code that you will need to correctly generate rows based on the features you want to use.

Row models run under the hood of TanStack Table to transform your original data in useful ways that are needed for data grid features like filtering, sorting, grouping, expanding, and pagination. The rows that get generated and render on screen won't necessarily be a 1:1 mapping of the original data that you passed to the table. They may be sorted, filtered, paginated, etc.

You should only import the row models that you need. Here are all of the row models that are available:

You don't have to use the exact row models that are provided by TanStack Table. If you need some advanced customization for certain row models, feel free to copy the source code for the row model you want to customize and modify it to your needs.

Once your table instance has been created, you can access all of the row models that you may need directly from the table instance. There are even more derived row models available apart from the ones that you may have imported.

For normal rendering use cases, you will probably only need to use the table.getRowModel() method, as this row model will use all/any of the other row models depending on which features you have enabled or disabled. All of the other row models are available for you to "dig into" some of the underlying data transformations that are happening in the table.

getRowModel - This is the main row model that you should use for rendering your table rows markup. It will use all of the other row models to generate the final row model that you will use to render your table rows.

getCoreRowModel - returns a basic row model that is just a 1:1 mapping of the original data passed to the table.

getFilteredRowModel - returns a row model that accounts for column filtering and global filtering.

getPreFilteredRowModel - returns a row model before column filtering and global filtering are applied.

getGroupedRowModel - returns a row model that applies grouping and aggregation to the data and creates sub-rows.

getPreGrou

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  })
}
```

Example 2 (python):
```python
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  })
}
```

Example 3 (python):
```python
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  })
}
```

Example 4 (python):
```python
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  })
}
```

---

## Table State (Solid) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/solid/guide/table-state

**Contents:**
- Table State (Solid) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.
  - State Types

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a solid tree, like columnSizingInfo state`, might cause bad performance issues.


*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = createSolidTable({
  columns,
  get data() {
    return data()
  },
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 2 (javascript):
```javascript
const table = createSolidTable({
  columns,
  get data() {
    return data()
  },
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 3 (javascript):
```javascript
const table = createSolidTable({
  columns,
  get data() {
    return data()
  },
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 4 (javascript):
```javascript
const table = createSolidTable({
  columns,
  get data() {
    return data()
  },
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

---

## Table State (Vue) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/vue/guide/table-state

**Contents:**
- Table State (Vue) Guide
  - Accessing Table State
  - Using Reactive Data
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

The useVueTable hook now supports reactive data. This means you can pass a Vue ref or computed containing your data to the data-option. The table will automatically react to changes in the data.

⚠️ shallowRef is used under the hood for performance reasons, meaning that the data is not deeply reactive, only the .value is. To update the data you have to mutate the data directly.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does no

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useVueTable({
  columns,
  data: dataRef, // Reactive data support
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 2 (javascript):
```javascript
const table = useVueTable({
  columns,
  data: dataRef, // Reactive data support
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 3 (javascript):
```javascript
const table = useVueTable({
  columns,
  data: dataRef, // Reactive data support
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 4 (javascript):
```javascript
const table = useVueTable({
  columns,
  data: dataRef, // Reactive data support
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

---

## Pagination Guide

**URL:** https://tanstack.com/table/latest/docs/guide/pagination

**Contents:**
- Examples
- API
- Pagination Guide
  - Client-Side Pagination
    - Should You Use Client-Side Pagination?
    - Should You Use Virtualization Instead?
    - Pagination Row Model
  - Manual Server-Side Pagination
    - Page Count and Row Count
  - Pagination State

Want to skip to the implementation? Check out these examples:

TanStack Table has great support for both client-side and server-side pagination. This guide will walk you through the different ways to implement pagination in your table.

Using client-side pagination means that the data that you fetch will contain ALL of the rows for the table, and the table instance will handle pagination logic in the front-end.

Client-side pagination is usually the simplest way to implement pagination when using TanStack Table, but it might not be practical for very large datasets.

However, a lot of people underestimate just how much data can be handled client-side. If your table will only ever have a few thousand rows or less, client-side pagination can still be a viable option. TanStack Table is designed to scale up to 10s of thousands of rows with decent performance for pagination, filtering, sorting, and grouping. The official pagination example loads 100,000 rows and still performs well, albeit with only handful of columns.

Every use-case is different and will depend on the complexity of the table, how many columns you have, how large every piece of data is, etc. The main bottlenecks to pay attention to are:

If you're not sure, you can always start with client-side pagination and then switch to server-side pagination in the future as your data grows.

Alternatively, instead of paginating the data, you can render all rows of a large dataset on the same page, but only use the browser's resources to render the rows that are visible in the viewport. This strategy is often called "virtualization" or "windowing". TanStack offers a virtualization library called TanStack Virtual that can work well with TanStack Table. The UI/UX of both virtualization and pagination have their own trade-offs, so see which one works best for your use-case.

If you want to take advantage of the built-in client-side pagination in TanStack Table, you first need to pass in the pagination row model.

If you decide that you need to use server-side pagination, here is how you can implement it.

No pagination row model is needed for server-side pagination, but if you have provided it for other tables that do need it in a shared component, you can still turn off the client-side pagination by setting the manualPagination option to true. Setting the manualPagination option to true will tell the table instance to use the table.getPrePaginationRowModel row model under the hood, and it will make the tabl

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
});
```

Example 2 (python):
```python
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
});
```

Example 3 (python):
```python
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
});
```

Example 4 (python):
```python
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
});
```

---

## Columns Guide

**URL:** https://tanstack.com/table/latest/docs/guide/columns

**Contents:**
- API
- Columns Guide
  - Where to Get Columns From
    - Header and Cell Objects
    - Column Table Instance APIs
      - Get Column
      - Get Columns
  - Column Objects
    - Column IDs
    - ColumnDef

Note: This guide is about the actual column objects that are generated within the table instance and NOT about setting up the column definitions for your table.

This quick guide will discuss the different ways you can retrieve and interact with column objects in TanStack Table.

You can find the column objects in many places. They are often attached

Before you reach for one of the table instance APIs, consider if you actually need to retrieve either headers or cells instead of columns. If you are rending out the markup for your table, you will most likely want to reach for the APIs that return headers or cells instead of columns. The column objects themselves are not really meant to render out the headers or cells, but the header and cell objects will contain references to these column objects from which they can derive the necessary information to render their UI.

There are dozens of table instance APIs you can use to retrieve columns from the table instance. Which APIs you will use will depend entirely on which features you are using in your table and your use-case.

If you need to just get a single column by its ID, you can use the table.getColumn API.

The simplest column API is table.getAllColumns, which will return a list of all columns in the table. There are dozens of other column APIs that are affected by other features and the state of the table that come alongside this API though. table.getAllFlatColumns, table.getAllLeafColumns, getCenterLeafColumns, table.getLeftVisibleLeafColumns are just some examples of other column APIs that you might use in tandem with the column visibility or column pinning features.

Column objects are not actually meant to be used to render out the table UI directly, so they are not associated 1-to-1 with any <th> or <td> elements in your table, but they contain a lot of useful properties and methods that you can use to interact with the table state.

Every column must have a unique id defined in their associated Column Definition. Usually, you define this id yourself, or it is derived from the accessorKey or header properties in the column definition.

A reference to the original columnDef object that was used to created the column is always available on the column object.

There are a few properties on column objects that are only useful if the column is part of a nested or grouped column structure. These properties include:

There are dozens of Column APIs that you can use to interact with the table state and ext

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const column = cell.column; // get column from cell
const column = header.column; // get column from header
```

Example 2 (javascript):
```javascript
const column = cell.column; // get column from cell
const column = header.column; // get column from header
```

Example 3 (javascript):
```javascript
const column = cell.column; // get column from cell
const column = header.column; // get column from header
```

Example 4 (javascript):
```javascript
const column = cell.column; // get column from cell
const column = header.column; // get column from header
```

---

## Cells Guide

**URL:** https://tanstack.com/table/latest/docs/guide/cells

**Contents:**
- API
- Cells Guide
  - Where to Get Cells From
  - Cell Objects
    - Cell IDs
    - Cell Parent Objects
    - Access Cell Values
    - Access Other Row Data from Any Cell
  - More Cell APIs
  - Cell Rendering

This quick guide will discuss the different ways you can retrieve and interact with cell objects in TanStack Table.

Cells come from Rows. Enough said, right?

There are multiple row instance APIs you can use to retrieve the appropriate cells from a row depending on which features you are using. Most commonly, you will use the row.getAllCells or row.getVisibleCells APIs (if you are using column visibility features), but there are a handful of other similar APIs that you can use.

Every cell object can be associated with a <td> or similar cell element in your UI. There are a few properties and methods on cell objects that you can use to interact with the table state and extract cell values from the table based on the state of the table.

Every cell object has an id property that makes it unique within the table instance. Each cell.id is constructed simply as a union of its parent row and column IDs separated by an underscore.

During grouping or aggregation features, the cell.id will have additional string appended to it.

Every cell stores a reference to its parent row and column objects.

The recommended way to access data values from a cell is to use either the cell.getValue or cell.renderValue APIs. Using either of these APIs will cache the results of the accessor functions and keep rendering efficient. The only difference between the two is that cell.renderValue will return either the value or the renderFallbackValue if the value is undefined, whereas cell.getValue will return the value or undefined if the value is undefined.

Note: The cell.getValue and cell.renderValue APIs are shortcuts row.getValue and row.renderValue APIs, respectively.

Since every cell object is associated with its parent row, you can access any data from the original row that you are using in your table using cell.row.original.

Depending on the features that you are using for your table, there are dozens more useful APIs for interacting with cells. See each features' respective API docs or guide for more information.

You can just use the cell.renderValue or cell.getValue APIs to render the cells of your table. However, these APIs will only spit out the raw cell values (from accessor functions). If you are using the cell: () => JSX column definition options, you will want to use the flexRender API utility from your adapter.

Using the flexRender API will allow the cell to be rendered correctly with any extra markup or JSX and it will call the callback function with the correct

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
{ id: `${row.id}_${column.id}` }
```

Example 2 (unknown):
```unknown
{ id: `${row.id}_${column.id}` }
```

Example 3 (unknown):
```unknown
{ id: `${row.id}_${column.id}` }
```

Example 4 (unknown):
```unknown
{ id: `${row.id}_${column.id}` }
```

---

## Column Pinning Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-pinning

**Contents:**
- Examples
  - Other Examples
- API
- Column Pinning Guide
  - How Column Pinning Affects Column Order
  - Column Pinning State
  - Pin Columns by Default
  - Useful Column Pinning APIs
  - Split Table Column Pinning

Want to skip to the implementation? Check out these examples:

TanStack Table offers state and APIs helpful for implementing column pinning features in your table UI. You can implement column pinning in multiple ways. You can either split pinned columns into their own separate tables, or you can keep all columns in the same table, but use the pinning state to order the columns correctly and use sticky CSS to pin the columns to the left or right.

There are 3 table features that can reorder columns, which happen in the following order:

The only way to change the order of the pinned columns is in the columnPinning.left and columnPinning.right state itself. columnOrder state will only affect the order of the unpinned ("center") columns.

Managing the columnPinning state is optional, and usually not necessary unless you are adding persistent state features. TanStack Table will already keep track of the column pinning state for you. Manage the columnPinning state just like any other table state if you need to.

A very common use case is to pin some columns by default. You can do this by either initializing the columnPinning state with the pinned columnIds, or by using the initialState table option

Note: Some of these APIs are new in v8.12.0

There are a handful of useful Column API methods to help you implement column pinning features:

If you are just using sticky CSS to pin columns, you can for the most part, just render the table as you normally would with the table.getHeaderGroups and row.getVisibleCells methods.

However, if you are splitting up pinned columns into their own separate tables, you can make use of the table.getLeftHeaderGroups, table.getCenterHeaderGroups, table.getRightHeaderGroups, row.getLeftVisibleCells, row.getCenterVisibleCells, and row.getRightVisibleCells methods to only render the columns that are relevant to the current table.

**Examples:**

Example 1 (javascript):
```javascript
const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  left: [],
  right: [],
});
//...
const table = useReactTable({
  //...
  state: {
    columnPinning,
    //...
  }
  onColumnPinningChange: setColumnPinning,
  //...
});
```

Example 2 (javascript):
```javascript
const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  left: [],
  right: [],
});
//...
const table = useReactTable({
  //...
  state: {
    columnPinning,
    //...
  }
  onColumnPinningChange: setColumnPinning,
  //...
});
```

Example 3 (javascript):
```javascript
const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  left: [],
  right: [],
});
//...
const table = useReactTable({
  //...
  state: {
    columnPinning,
    //...
  }
  onColumnPinningChange: setColumnPinning,
  //...
});
```

Example 4 (javascript):
```javascript
const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  left: [],
  right: [],
});
//...
const table = useReactTable({
  //...
  state: {
    columnPinning,
    //...
  }
  onColumnPinningChange: setColumnPinning,
  //...
});
```

---

## Column Faceting Guide

**URL:** https://tanstack.com/table/latest/docs/guide/column-faceting

**Contents:**
- Examples
- API
- Column Faceting Guide
  - Column Faceting Row Models
  - Use Faceted Row Models
  - Custom (Server-Side) Faceting

Want to skip to the implementation? Check out these examples:

Column Faceting is a feature that allows you to generate lists of values for a given column from that column's data. For example, a list of unique values in a column can be generated from all rows in that column to be used as search suggestions in an autocomplete filter component. Or, a tuple of minimum and maximum values can be generated from a column of numbers to be used as a range for a range slider filter component.

In order to use any of the column faceting features, you must include the appropriate row models in your table options.

First, you must include the getFacetedRowModel row model. This row model will generate a list of values for a given column. If you need a list of unique values, include the getFacetedUniqueValues row model. If you need a tuple of minimum and maximum values, include the getFacetedMinMaxValues row model.

Once you have included the appropriate row models in your table options, you will be able to use the faceting column instance APIs to access the lists of values generated by the faceted row models.

If instead of using the built-in client-side faceting features, you can implement your own faceting logic on the server-side and pass the faceted values to the client-side. You can use the getFacetedUniqueValues and getFacetedMinMaxValues table options to resolve the faceted values from the server-side.

Alternatively, you don't have to put any of your faceting logic through the TanStack Table APIs at all. Just fetch your lists and pass them to your filter components directly.

**Examples:**

Example 1 (javascript):
```javascript
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //if you need a list of values for a column (other faceted row models depend on this one)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if you need a list of unique val
...
```

Example 2 (javascript):
```javascript
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //if you need a list of values for a column (other faceted row models depend on this one)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if you need a list of unique val
...
```

Example 3 (javascript):
```javascript
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //if you need a list of values for a column (other faceted row models depend on this one)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if you need a list of unique val
...
```

Example 4 (javascript):
```javascript
//only import the row models you need
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //depends on getFacetedRowModel
  getFacetedUniqueValues, //depends on getFacetedRowModel
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //if you need a list of values for a column (other faceted row models depend on this one)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //if you need min/max values
  getFacetedUniqueValues: getFacetedUniqueValues(), //if you need a list of unique val
...
```

---

## Row Pinning Guide

**URL:** https://tanstack.com/table/latest/docs/guide/row-pinning

**Contents:**
- Examples
- API
- Row Pinning Guide

Want to skip to the implementation? Check out these examples:

There are 2 table features that can reorder rows, which happen in the following order:

---

## Rows Guide

**URL:** https://tanstack.com/table/latest/docs/guide/rows

**Contents:**
- API
- Rows Guide
  - Where to Get Rows From
    - table.getRow
    - Row Models
      - Render Rows
      - Get Selected Rows
  - Row Objects
    - Row IDs
    - Access Row Values

This quick guide will discuss the different ways you can retrieve and interact with row objects in TanStack Table.

There are multiple table instance APIs you can use to retrieve rows from the table instance.

If you need to access a specific row by its id, you can use the table.getRow table instance API.

The table instance generates row objects and stores them in useful arrays called "Row Models". This is discussed in much more detail in the Row Models Guide, but here are the most common ways you may access the row models.

Every row object contains row data and many APIs to either interact with the table state or extract cells from the row based on the state of the table.

Every row object has an id property that makes it unique within the table instance. By default the row.id is the same as the row.index that is created in the row model. However, it can be useful to override each row's id with a unique identifier from the row's data. You can use the getRowId table option to do this.

Note: In some features like grouping and expanding, the row.id will have additional string appended to it.

The recommended way to access data values from a row is to use either the row.getValue or row.renderValue APIs. Using either of these APIs will cache the results of the accessor functions and keep rendering efficient. The only difference between the two is that row.renderValue will return either the value or the renderFallbackValue if the value is undefined, whereas row.getValue will return the value or undefined if the value is undefined.

Note: cell.getValue and cell.renderValue are shortcuts for the row.getValue and row.renderValue APIs, respectively.

For every row object, you can access the original corresponding data that was passed to the table instance via the row.original property. None of the data in the row.original will have been modified by the accessors in your column definitions, so if you were doing any sort of data transformations in your accessors, those will not be reflected in the row.original object.

If you are using either grouping or expanding features, your rows may contain sub-rows or parent row references. This is discussed in much more detail in the Expanding Guide, but here is a quick overview of useful properties and methods for working with sub-rows.

Depending on the features that you are using for your table, there are dozens more useful APIs for interacting with rows. See each features' respective API docs or guide for more informati

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const row = table.getRow(rowId)
```

Example 2 (javascript):
```javascript
const row = table.getRow(rowId)
```

Example 3 (javascript):
```javascript
const row = table.getRow(rowId)
```

Example 4 (javascript):
```javascript
const row = table.getRow(rowId)
```

---

## Table State (Svelte) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/svelte/guide/table-state

**Contents:**
- Table State (Svelte) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.
  - State Types

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a svelte tree, like columnSizingInfo state`, might cause bad performance issues.

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const options = writable({
  columns,
  data,
  //...
})

const table = createSvelteTable(options)

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 2 (javascript):
```javascript
const options = writable({
  columns,
  data,
  //...
})

const table = createSvelteTable(options)

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 3 (javascript):
```javascript
const options = writable({
  columns,
  data,
  //...
})

const table = createSvelteTable(options)

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 4 (javascript):
```javascript
const options = writable({
  columns,
  data,
  //...
})

const table = createSvelteTable(options)

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

---

## Table State (Angular) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/angular/guide/table-state

**Contents:**
- Table State (Angular) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.
  - State Types

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a component tree, like columnSizingInfo state`, might cause bad performance issu

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
table = createAngularTable(() => ({
  columns: this.columns,
  data: this.data(),
  //...
}))

someHandler() {
  console.log(this.table.getState()) //access the entire internal state
  console.log(this.table.getState().rowSelection) //access just the row selection state
}
```

Example 2 (javascript):
```javascript
table = createAngularTable(() => ({
  columns: this.columns,
  data: this.data(),
  //...
}))

someHandler() {
  console.log(this.table.getState()) //access the entire internal state
  console.log(this.table.getState().rowSelection) //access just the row selection state
}
```

Example 3 (javascript):
```javascript
table = createAngularTable(() => ({
  columns: this.columns,
  data: this.data(),
  //...
}))

someHandler() {
  console.log(this.table.getState()) //access the entire internal state
  console.log(this.table.getState().rowSelection) //access just the row selection state
}
```

Example 4 (javascript):
```javascript
table = createAngularTable(() => ({
  columns: this.columns,
  data: this.data(),
  //...
}))

someHandler() {
  console.log(this.table.getState()) //access the entire internal state
  console.log(this.table.getState().rowSelection) //access just the row selection state
}
```

---

## Fuzzy Filtering Guide

**URL:** https://tanstack.com/table/latest/docs/guide/fuzzy-filtering

**Contents:**
- Examples
- API
- Fuzzy Filtering Guide
  - Defining a Custom Fuzzy Filter Function
  - Using Fuzzy Filtering with Global Filtering
  - Using Fuzzy Filtering with Column Filtering
    - Sorting with Fuzzy Filtering

Want to skip to the implementation? Check out these examples:

Fuzzy filtering is a technique that allows you to filter data based on approximate matches. This can be useful when you want to search for data that is similar to a given value, rather than an exact match.

You can implement a client side fuzzy filtering by defining a custom filter function. This function should take in the row, columnId, and filter value, and return a boolean indicating whether the row should be included in the filtered data.

Fuzzy filtering is mostly used with global filtering, but you can also apply it to individual columns. We will discuss how to implement fuzzy filtering for both cases.

Note: You will need to install the @tanstack/match-sorter-utils library to use fuzzy filtering. TanStack Match Sorter Utils is a fork of match-sorter by Kent C. Dodds. It was forked in order to work better with TanStack Table's row by row filtering approach.

Using the match-sorter libraries is optional, but the TanStack Match Sorter Utils library provides a great way to both fuzzy filter and sort by the rank information it returns, so that rows can be sorted by their closest matches to the search query.

Here's an example of a custom fuzzy filter function:

In this function, we're using the rankItem function from the @tanstack/match-sorter-utils library to rank the item. We then store the ranking information in the meta data of the row, and return whether the item passed the ranking criteria.

To use fuzzy filtering with global filtering, you can specify the fuzzy filter function in the globalFilterFn option of the table instance:

To use fuzzy filtering with column filtering, you should first define the fuzzy filter function in the filterFns option of the table instance. You can then specify the fuzzy filter function in the filterFn option of the column definition:

In this example, we're applying the fuzzy filter to a column that combines the firstName and lastName fields of the data.

When using fuzzy filtering with column filtering, you might also want to sort the data based on the ranking information. You can do this by defining a custom sorting function:

In this function, we're comparing the ranking information of the two rows. If the ranks are equal, we fall back to alphanumeric sorting.

You can then specify this sorting function in the sortFn option of the column definition:

**Examples:**

Example 1 (python):
```python
import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
```

Example 2 (python):
```python
import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
```

Example 3 (python):
```python
import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
```

Example 4 (python):
```python
import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
```

---

## Table State (Lit) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/lit/guide/table-state

**Contents:**
- Table State (Lit) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.
  - State Types

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a component tree, like columnSizingInfo state`, might cause bad performance issu

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
private tableController = new TableController<Person>(this);

render() {
  const table = this.tableController.table({
    columns,
    data,
    ...
  })

  console.log(table.getState()) //access the entire internal state
  console.log(table.getState().rowSelection) //access just the row selection state
  // ...
}
```

Example 2 (javascript):
```javascript
private tableController = new TableController<Person>(this);

render() {
  const table = this.tableController.table({
    columns,
    data,
    ...
  })

  console.log(table.getState()) //access the entire internal state
  console.log(table.getState().rowSelection) //access just the row selection state
  // ...
}
```

Example 3 (javascript):
```javascript
private tableController = new TableController<Person>(this);

render() {
  const table = this.tableController.table({
    columns,
    data,
    ...
  })

  console.log(table.getState()) //access the entire internal state
  console.log(table.getState().rowSelection) //access just the row selection state
  // ...
}
```

Example 4 (javascript):
```javascript
private tableController = new TableController<Person>(this);

render() {
  const table = this.tableController.table({
    columns,
    data,
    ...
  })

  console.log(table.getState()) //access the entire internal state
  console.log(table.getState().rowSelection) //access just the row selection state
  // ...
}
```

---

## Table State (Qwik) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/qwik/guide/table-state

**Contents:**
- Table State (Qwik) Guide
  - Accessing Table State
  - Custom Initial State
  - Controlled State
    - Individual Controlled State
    - Fully Controlled State
  - On State Change Callbacks
    - 1. State Change Callbacks MUST have their corresponding state value in the state option.
    - 2. Updaters can either be raw values or callback functions.
  - State Types

TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table.

You do not need to set up anything special in order for the table state to work. If you pass nothing into either state, initialState, or any of the on[State]Change table options, the table will manage its own state internally. You can access any part of this internal state by using the table.getState() table instance API.

If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the initialState option of the table instance.

Note: Only specify each particular state in either initialState or state, but not both. If you pass in a particular state value to both initialState and state, the initialized state in state will take overwrite any corresponding value in initialState.

If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the state and on[State]Change table options.

You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis.

In order to control a particular state, you need to both pass in the corresponding state value and the on[State]Change function to the table instance.

Let's take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.

Alternatively, you can control the entire table state with the onStateChange table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a component tree, like columnSizingInfo state`, might cause bad performance issu

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const table = useQwikTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 2 (javascript):
```javascript
const table = useQwikTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 3 (javascript):
```javascript
const table = useQwikTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

Example 4 (javascript):
```javascript
const table = useQwikTable({
  columns,
  data,
  //...
})

console.log(table.getState()) //access the entire internal state
console.log(table.getState().rowSelection) //access just the row selection state
```

---

## Sorting Guide

**URL:** https://tanstack.com/table/latest/docs/guide/sorting

**Contents:**
- Examples
- API
- Sorting Guide
  - Sorting State
    - Accessing Sorting State
    - Controlled Sorting State
    - Initial Sorting State
  - Client-Side vs Server-Side Sorting
  - Manual Server-Side Sorting
  - Client-Side Sorting

Want to skip to the implementation? Check out these examples:

TanStack Table provides solutions for just about any sorting use-case you might have. This guide will walk you through the various options that you can use to customize the built-in client-side sorting functionality, as well as how to opt out of client-side sorting in favor of manual server-side sorting.

The sorting state is defined as an array of objects with the following shape:

Since the sorting state is an array, it is possible to sort by multiple columns at once. Read more about the multi-sorting customizations down below.

You can access the sorting state directly from the table instance just like any other state using the table.getState() API.

However, if you need to access the sorting state before the table is initialized, you can "control" the sorting state like down below.

If you need easy access to the sorting state, you can control/manage the sorting state in your own state management with the state.sorting and onSortingChange table options.

If you do not need to control the sorting state in your own state management or scope, but you still want to set an initial sorting state, you can use the initialState table option instead of state.

NOTE: Do not use both initialState.sorting and state.sorting at the same time, as the initialized state in the state.sorting will override the initialState.sorting.

Whether or not you should use client-side or server-side sorting depends entirely on whether you are also using client-side or server-side pagination or filtering. Be consistent, because using client-side sorting with server-side pagination or filtering will only sort the data that is currently loaded, and not the entire dataset.

If you plan to just use your own server-side sorting in your back-end logic, you do not need to provide a sorted row model. But if you have provided a sorting row model, but you want to disable it, you can use the manualSorting table option.

NOTE: When manualSorting is set to true, the table will assume that the data that you provide is already sorted, and will not apply any sorting to it.

To implement client-side sorting, first you have to provide a sorting row model to the table. You can import the getSortedRowModel function from TanStack Table, and it will be used to transform your rows into sorted rows.

The default sorting function for all columns is inferred from the data type of the column. However, it can be useful to define the exact sorting fu

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
type ColumnSort = {
  id: string
  desc: boolean
}
type SortingState = ColumnSort[]
```

Example 2 (unknown):
```unknown
type ColumnSort = {
  id: string
  desc: boolean
}
type SortingState = ColumnSort[]
```

Example 3 (unknown):
```unknown
type ColumnSort = {
  id: string
  desc: boolean
}
type SortingState = ColumnSort[]
```

Example 4 (unknown):
```unknown
type ColumnSort = {
  id: string
  desc: boolean
}
type SortingState = ColumnSort[]
```

---

## Table State (Vanilla JS) Guide

**URL:** https://tanstack.com/table/latest/docs/framework/vanilla/guide/table-state

**Contents:**
- Table State (Vanilla JS) Guide

---

## Pinning Guide

**URL:** https://tanstack.com/table/latest/docs/guide/pinning

Pinning is split into 2 different feature guides:

---

## Grouping Guide

**URL:** https://tanstack.com/table/latest/docs/guide/grouping

**Contents:**
- Examples
- API
- Grouping Guide
  - Grouping state
  - Aggregations
    - Custom Aggregations
  - Manual Grouping
  - Grouping Change Handler

Want to skip to the implementation? Check out these examples:

There are 3 table features that can reorder columns, which happen in the following order:

Grouping in TanStack table is a feature that applies to columns and allows you to categorize and organize the table rows based on specific columns. This can be useful in cases where you have a large amount of data and you want to group them together based on certain criteria.

To use the grouping feature, you will need to use the grouped row model. This model is responsible for grouping the rows based on the grouping state.

When grouping state is active, the table will add matching rows as subRows to the grouped row. The grouped row will be added to the table rows at the same index as the first matching row. The matching rows will be removed from the table rows. To allow the user to expand and collapse the grouped rows, you can use the expanding feature.

The grouping state is an array of strings, where each string is the ID of a column to group by. The order of the strings in the array determines the order of the grouping. For example, if the grouping state is ['column1', 'column2'], then the table will first group by column1, and then within each group, it will group by column2. You can control the grouping state using the setGrouping function:

You can also reset the grouping state to its initial state using the resetGrouping function:

By default, when a column is grouped, it is moved to the start of the table. You can control this behavior using the groupedColumnMode option. If you set it to 'reorder', then the grouped columns will be moved to the start of the table. If you set it to 'remove', then the grouped columns will be removed from the table. If you set it to false, then the grouped columns will not be moved or removed.

When rows are grouped, you can aggregate the data in the grouped rows by columns using the aggregationFn option. This is a string that is the ID of the aggregation function. You can define the aggregation functions using the aggregationFns option.

In the above example, the sum aggregation function will be used to aggregate the data in the grouped rows. By default, numeric columns will use the sum aggregation function, and non-numeric columns will use the count aggregation function. You can override this behavior by specifying the aggregationFn option in the column definition.

There are several built-in aggregation functions that you can use:

When rows are grouped, you can 

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { getGroupedRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // other options...
  getGroupedRowModel: getGroupedRowModel(),
})
```

Example 2 (python):
```python
import { getGroupedRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // other options...
  getGroupedRowModel: getGroupedRowModel(),
})
```

Example 3 (python):
```python
import { getGroupedRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // other options...
  getGroupedRowModel: getGroupedRowModel(),
})
```

Example 4 (python):
```python
import { getGroupedRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // other options...
  getGroupedRowModel: getGroupedRowModel(),
})
```

---
