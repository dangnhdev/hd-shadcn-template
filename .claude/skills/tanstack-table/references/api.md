# Tanstack-Table - Api

**Pages:** 9

---

## Header APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/header

**Contents:**
- Header API
  - id
  - index
  - depth
  - column
  - headerGroup
  - subHeaders
  - colSpan
  - rowSpan
  - getLeafHeaders

These are core options and API properties for all headers. More options and API properties may be available for other table features.

All header objects have the following properties:

The unique identifier for the header.

The index for the header within the header group.

The depth of the header, zero-indexed based.

The header's associated Column object

The header's associated HeaderGroup object

The header's hierarchical sub/child headers. Will be empty if the header's associated column is a leaf-column.

The col-span for the header.

The row-span for the header.

Returns the leaf headers hierarchically nested under this header.

A boolean denoting if the header is a placeholder header

If the header is a placeholder header, this will be a unique header ID that does not conflict with any other headers across the table

Returns the rendering context (or props) for column-based components like headers, footers and filters. Use these props with your framework's flexRender utility to render these using the template of your choice:

Returns all header groups for the table.

If pinning, returns the header groups for the left pinned columns.

If pinning, returns the header groups for columns that are not pinned.

If pinning, returns the header groups for the right pinned columns.

Returns all footer groups for the table.

If pinning, returns the footer groups for the left pinned columns.

If pinning, returns the footer groups for columns that are not pinned.

If pinning, returns the footer groups for the right pinned columns.

Returns headers for all columns in the table, including parent headers.

If pinning, returns headers for all left pinned columns in the table, including parent headers.

If pinning, returns headers for all columns that are not pinned, including parent headers.

If pinning, returns headers for all right pinned columns in the table, including parent headers.

Returns headers for all leaf columns in the table, (not including parent headers).

If pinning, returns headers for all left pinned leaf columns in the table, (not including parent headers).

If pinning, returns headers for all columns that are not pinned, (not including parent headers).

If pinning, returns headers for all right pinned leaf columns in the table, (not including parent headers).

**Examples:**

Example 1 (unknown):
```unknown
index: number
```

Example 2 (unknown):
```unknown
index: number
```

Example 3 (unknown):
```unknown
index: number
```

Example 4 (unknown):
```unknown
index: number
```

---

## Expanding APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/expanding

**Contents:**
- State
- Row API
  - toggleExpanded
  - getIsExpanded
  - getIsAllParentsExpanded
  - getCanExpand
  - getToggleExpandedHandler
- Table Options
  - manualExpanding
  - onExpandedChange

Expanding state is stored on the table using the following shape:

Toggles the expanded state (or sets it if expanded is provided) for the row.

Returns whether the row is expanded.

Returns whether all parent rows of the row are expanded.

Returns whether the row can be expanded.

Returns a function that can be used to toggle the expanded state of the row. This function can be used to bind to an event handler to a button.

Enables manual row expansion. If this is set to true, getExpandedRowModel will not be used to expand rows and you would be expected to perform the expansion in your own data model. This is useful if you are doing server-side expansion.

This function is called when the expanded table state changes. If a function is provided, you will be responsible for managing this state on your own. To pass the managed state back to the table, use the tableOptions.state.expanded option.

Enable this setting to automatically reset the expanded state of the table when expanding state changes.

Enable/disable expanding for all rows.

This function is responsible for returning the expanded row model. If this function is not provided, the table will not expand rows. You can use the default exported getExpandedRowModel function to get the expanded row model or implement your own.

If provided, allows you to override the default behavior of determining whether a row is currently expanded.

If provided, allows you to override the default behavior of determining whether a row can be expanded.

If true expanded rows will be paginated along with the rest of the table (which means expanded rows may span multiple pages).

If false expanded rows will not be considered for pagination (which means expanded rows will always render on their parents page. This also means more rows will be rendered than the set page size)

Updates the expanded state of the table via an update function or value

Toggles the expanded state for all rows. Optionally, provide a value to set the expanded state to.

Reset the expanded state of the table to the initial state. If defaultState is provided, the expanded state will be reset to {}

Returns whether there are any rows that can be expanded.

Returns a handler that can be used to toggle the expanded state of all rows. This handler is meant to be used with an input[type=checkbox] element.

Returns whether there are any rows that are currently expanded.

Returns whether all rows are currently expanded.

Returns the maximum depth of the exp

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

Example 2 (unknown):
```unknown
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

Example 3 (unknown):
```unknown
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

Example 4 (unknown):
```unknown
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

---

## HeaderGroup APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/header-group

**Contents:**
- Header Group API
  - id
  - depth
  - headers

These are core options and API properties for all header groups. More options and API properties may be available for other table features.

All header group objects have the following properties:

The unique identifier for the header group.

The depth of the header group, zero-indexed based.

An array of Header objects that belong to this header group

**Examples:**

Example 1 (unknown):
```unknown
depth: number
```

Example 2 (unknown):
```unknown
depth: number
```

Example 3 (unknown):
```unknown
depth: number
```

Example 4 (unknown):
```unknown
depth: number
```

---

## Cell APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/cell

**Contents:**
- Cell API
  - id
  - getValue
  - renderValue
  - row
  - column
  - getContext

These are core options and API properties for all cells. More options and API properties are available for other table features.

All cell objects have the following properties:

The unique ID for the cell across the entire table.

Returns the value for the cell, accessed via the associated column's accessor key or accessor function.

Renders the value for a cell the same as getValue, but will return the renderFallbackValue if no value is found.

The associated Row object for the cell.

The associated Column object for the cell.

Returns the rendering context (or props) for cell-based components like cells and aggregated cells. Use these props with your framework's flexRender utility to render these using the template of your choice:

**Examples:**

Example 1 (javascript):
```javascript
getValue: () => any
```

Example 2 (javascript):
```javascript
getValue: () => any
```

Example 3 (javascript):
```javascript
getValue: () => any
```

Example 4 (javascript):
```javascript
getValue: () => any
```

---

## Table APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/table

**Contents:**
- useReactTable / createSolidTable / useQwikTable / useVueTable / createSvelteTable
- Options
  - data
  - columns
  - defaultColumn
  - initialState
  - autoResetAll
  - meta
  - state
  - onStateChange

These functions are used to create a table. Which one you use depends on which framework adapter you are using.

These are core options and API properties for the table. More options and API properties are available for other table features.

The data for the table to display. This array should match the type you provided to table.setRowType<...>, but in theory could be an array of anything. It's common for each item in the array to be an object of key/values but this is not required. Columns can access this data via string/index or a functional accessor to return anything they want.

When the data option changes reference (compared via Object.is), the table will reprocess the data. Any other data processing that relies on the core data model (such as grouping, sorting, filtering, etc) will also be reprocessed.

🧠 Make sure your data option is only changing when you want the table to reprocess. Providing an inline [] or constructing the data array as a new object every time you want to render the table will result in a lot of unnecessary re-processing. This can easily go unnoticed in smaller tables, but you will likely notice it in larger tables.

The array of column defs to use for the table. See the Column Def Guide for more information on creating column definitions.

Default column options to use for all column defs supplied to the table. This is useful for providing default cell/header/footer renderers, sorting/filtering/grouping options, etc. All column definitions passed to options.columns are merged with this default column definition to produce the final column definitions.

Use this option to optionally pass initial state to the table. This state will be used when resetting various table states either automatically by the table (eg. options.autoResetPageIndex) or via functions like table.resetRowSelection(). Most reset function allow you optionally pass a flag to reset to a blank/default state instead of the initial state.

🧠 Table state will not be reset when this object changes, which also means that the initial state object does not need to be stable.

Set this option to override any of the autoReset... feature options.

You can pass any object to options.meta and access it anywhere the table is available via table.options.meta This type is global to all tables and can be extended like so:

🧠 Think of this option as an arbitrary "context" for your table. This is a great way to pass arbitrary data or functions to your table without having to pa

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
type useReactTable = <TData extends AnyData>(
  options: TableOptions<TData>
) => Table<TData>
```

Example 2 (javascript):
```javascript
type useReactTable = <TData extends AnyData>(
  options: TableOptions<TData>
) => Table<TData>
```

Example 3 (javascript):
```javascript
type useReactTable = <TData extends AnyData>(
  options: TableOptions<TData>
) => Table<TData>
```

Example 4 (javascript):
```javascript
type useReactTable = <TData extends AnyData>(
  options: TableOptions<TData>
) => Table<TData>
```

---

## Row APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/row

**Contents:**
- Row API
  - id
  - depth
  - index
  - original
  - parentId
  - getValue
  - renderValue
  - getUniqueValues
  - subRows

These are core options and API properties for all rows. More options and API properties are available for other table features.

All row objects have the following properties:

The resolved unique identifier for the row resolved via the options.getRowId option. Defaults to the row's index (or relative index if it is a subRow)

The depth of the row (if nested or grouped) relative to the root row array.

The index of the row within its parent array (or the root data array)

The original row object provided to the table.

🧠 If the row is a grouped row, the original row object will be the first original in the group.

If nested, this row's parent row id.

Returns the value from the row for a given columnId

Renders the value from the row for a given columnId, but will return the renderFallbackValue if no value is found.

Returns a unique array of values from the row for a given columnId.

An array of subRows for the row as returned and created by the options.getSubRows option.

Returns the parent row for the row, if it exists.

Returns the parent rows for the row, all the way up to a root row.

Returns the leaf rows for the row, not including any parent rows.

An array of the original subRows as returned by the options.getSubRows option.

Returns all of the Cells for the row.

**Examples:**

Example 1 (unknown):
```unknown
depth: number
```

Example 2 (unknown):
```unknown
depth: number
```

Example 3 (unknown):
```unknown
depth: number
```

Example 4 (unknown):
```unknown
depth: number
```

---

## Global Faceting APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/global-faceting

**Contents:**
- Table API
  - getGlobalFacetedRowModel
  - getGlobalFacetedUniqueValues
  - getGlobalFacetedMinMaxValues

Returns the faceted row model for the global filter.

Returns the faceted unique values for the global filter.

Returns the faceted min and max values for the global filter.

**Examples:**

Example 1 (javascript):
```javascript
getGlobalFacetedRowModel: () => RowModel<TData>
```

Example 2 (javascript):
```javascript
getGlobalFacetedRowModel: () => RowModel<TData>
```

Example 3 (javascript):
```javascript
getGlobalFacetedRowModel: () => RowModel<TData>
```

Example 4 (javascript):
```javascript
getGlobalFacetedRowModel: () => RowModel<TData>
```

---

## Filter APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/filters

The Filtering API docs are now split into multiple API doc pages:

---

## Row Selection APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/row-selection

**Contents:**
- State
- Table Options
  - enableRowSelection
  - enableMultiRowSelection
  - enableSubRowSelection
  - onRowSelectionChange
- Table API
  - getToggleAllRowsSelectedHandler
  - getToggleAllPageRowsSelectedHandler
  - setRowSelection

Row selection state is stored on the table using the following shape:

By default, the row selection state uses the index of each row as the row identifiers. Row selection state can instead be tracked with a custom unique row id by passing in a custom getRowId function to the the table.

Enables/disables automatic sub-row selection when a parent row is selected, or a function that enables/disables automatic sub-row selection for each row.

(Use in combination with expanding or grouping features)

If provided, this function will be called with an updaterFn when state.rowSelection changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.

Returns a handler that can be used to toggle all rows in the table.

Returns a handler that can be used to toggle all rows on the current page.

Sets or updates the state.rowSelection state.

Resets the rowSelection state to the initialState.rowSelection, or true can be passed to force a default blank state reset to {}.

Returns whether or not all rows in the table are selected.

Returns whether or not all rows on the current page are selected.

Returns whether or not any rows in the table are selected.

Returns whether or not any rows on the current page are selected.

Selects/deselects all rows in the table.

Selects/deselects all rows on the current page.

Returns whether or not the row is selected.

Returns whether or not some of the row's sub rows are selected.

Returns whether or not all of the row's sub rows are selected.

Returns whether or not the row can be selected.

Returns whether or not the row can multi-select.

Returns whether or not the row can select sub rows automatically when the parent row is selected.

Selects/deselects the row.

Returns a handler that can be used to toggle the row.

**Examples:**

Example 1 (unknown):
```unknown
export type RowSelectionState = Record<string, boolean>

export type RowSelectionTableState = {
  rowSelection: RowSelectionState
}
```

Example 2 (unknown):
```unknown
export type RowSelectionState = Record<string, boolean>

export type RowSelectionTableState = {
  rowSelection: RowSelectionState
}
```

Example 3 (unknown):
```unknown
export type RowSelectionState = Record<string, boolean>

export type RowSelectionTableState = {
  rowSelection: RowSelectionState
}
```

Example 4 (unknown):
```unknown
export type RowSelectionState = Record<string, boolean>

export type RowSelectionTableState = {
  rowSelection: RowSelectionState
}
```

---
