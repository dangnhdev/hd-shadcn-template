# Tanstack-Table - Features

**Pages:** 13

---

## Column Pinning APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-pinning

**Contents:**
- Can-Pin
- State
- Table Options
  - enableColumnPinning
  - onColumnPinningChange
- Column Def Options
  - enablePinning
- Table API
  - setColumnPinning
  - resetColumnPinning

The ability for a column to be pinned is determined by the following:

Pinning state is stored on the table using the following shape:

Enables/disables column pinning for all columns in the table.

If provided, this function will be called with an updaterFn when state.columnPinning changes. This overrides the default internal state management, so you will also need to supply state.columnPinning from your own managed state.

Enables/disables pinning for the column.

Sets or updates the state.columnPinning state.

Resets the columnPinning state to initialState.columnPinning, or true can be passed to force a default blank state reset to { left: [], right: [], }.

Returns whether or not any columns are pinned. Optionally specify to only check for pinned columns in either the left or right position.

Note: Does not account for column visibility

Returns the left pinned header groups for the table.

Returns the unpinned/center header groups for the table.

Returns the right pinned header groups for the table.

Returns the left pinned footer groups for the table.

Returns the unpinned/center footer groups for the table.

Returns the right pinned footer groups for the table.

Returns a flat array of left pinned headers for the table, including parent headers.

Returns a flat array of unpinned/center headers for the table, including parent headers.

Returns a flat array of right pinned headers for the table, including parent headers.

Returns a flat array of leaf-node left pinned headers for the table.

Returns a flat array of leaf-node unpinned/center headers for the table.

Returns a flat array of leaf-node right pinned headers for the table.

Returns all left pinned leaf columns.

Returns all right pinned leaf columns.

Returns all center pinned (unpinned) leaf columns.

Returns whether or not the column can be pinned.

Returns the numeric pinned index of the column within a pinned column group.

Returns the pinned position of the column. ('left', 'right' or false)

Pins a column to the 'left' or 'right', or unpins the column to the center if false is passed.

Returns all left pinned leaf cells in the row.

Returns all right pinned leaf cells in the row.

Returns all center pinned (unpinned) leaf cells in the row.

**Examples:**

Example 1 (unknown):
```unknown
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}


export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

Example 2 (unknown):
```unknown
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}


export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

Example 3 (unknown):
```unknown
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}


export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

Example 4 (unknown):
```unknown
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}


export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

---

## ColumnDef APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/column-def

**Contents:**
- Options
  - id
  - accessorKey
  - accessorFn
  - columns
  - header
  - footer
  - cell
  - meta

Column definitions are plain objects with the following options:

The unique identifier for the column.

🧠 A column ID is optional when:

The key of the row object to use when extracting the value for the column.

The accessor function to use when extracting the value for the column from each row.

The child column defs to include in a group column.

The header to display for the column. If a string is passed, it can be used as a default for the column ID. If a function is passed, it will be passed a props object for the header and should return the rendered header value (the exact type depends on the adapter being used).

The footer to display for the column. If a function is passed, it will be passed a props object for the footer and should return the rendered footer value (the exact type depends on the adapter being used).

The cell to display each row for the column. If a function is passed, it will be passed a props object for the cell and should return the rendered cell value (the exact type depends on the adapter being used).

The meta data to be associated with the column. We can access it anywhere when the column is available via column.columnDef.meta. This type is global to all tables and can be extended like so:

**Examples:**

Example 1 (unknown):
```unknown
accessorKey?: string & typeof TData
```

Example 2 (unknown):
```unknown
accessorKey?: string & typeof TData
```

Example 3 (unknown):
```unknown
accessorKey?: string & typeof TData
```

Example 4 (unknown):
```unknown
accessorKey?: string & typeof TData
```

---

## Column Visibility APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-visibility

**Contents:**
- State
- Column Def Options
  - enableHiding
- Column API
  - getCanHide
  - getIsVisible
  - toggleVisibility
  - getToggleVisibilityHandler
- Table Options
  - onColumnVisibilityChange

Column visibility state is stored on the table using the following shape:

Enables/disables hiding the column

Returns whether the column can be hidden

Returns whether the column is visible

Toggles the column visibility

Returns a function that can be used to toggle the column visibility. This function can be used to bind to an event handler to a checkbox.

If provided, this function will be called with an updaterFn when state.columnVisibility changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.

Enables/disables hiding of columns.

Returns a flat array of columns that are visible, including parent columns.

Returns a flat array of leaf-node columns that are visible.

If column pinning, returns a flat array of leaf-node columns that are visible in the left portion of the table.

If column pinning, returns a flat array of leaf-node columns that are visible in the right portion of the table.

If column pinning, returns a flat array of leaf-node columns that are visible in the unpinned/center portion of the table.

Updates the column visibility state via an updater function or value

Resets the column visibility state to the initial state. If defaultState is provided, the state will be reset to {}

Toggles the visibility of all columns

Returns whether all columns are visible

Returns whether some columns are visible

Returns a handler for toggling the visibility of all columns, meant to be bound to a input[type=checkbox] element.

Returns an array of cells that account for column visibility for the row.

**Examples:**

Example 1 (unknown):
```unknown
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

Example 2 (unknown):
```unknown
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

Example 3 (unknown):
```unknown
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

Example 4 (unknown):
```unknown
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

---

## Column Faceting APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-faceting

**Contents:**
- Column API
  - getFacetedRowModel
  - getFacetedUniqueValues
  - getFacetedMinMaxValues
- Table Options
  - getColumnFacetedRowModel

⚠️ Requires that you pass a valid getFacetedRowModel function to options.facetedRowModel. A default implementation is provided via the exported getFacetedRowModel function.

Returns the row model with all other column filters applied, excluding its own filter. Useful for displaying faceted result counts.

⚠️ Requires that you pass a valid getFacetedUniqueValues function to options.getFacetedUniqueValues. A default implementation is provided via the exported getFacetedUniqueValues function.

A function that computes and returns a Map of unique values and their occurrences derived from column.getFacetedRowModel. Useful for displaying faceted result values.

⚠️ Requires that you pass a valid getFacetedMinMaxValues function to options.getFacetedMinMaxValues. A default implementation is provided via the exported getFacetedMinMaxValues function.

A function that computes and returns a min/max tuple derived from column.getFacetedRowModel. Useful for displaying faceted result values.

Returns the faceted row model for a given columnId.

**Examples:**

Example 1 (javascript):
```javascript
type getFacetedRowModel = () => RowModel<TData>
```

Example 2 (javascript):
```javascript
type getFacetedRowModel = () => RowModel<TData>
```

Example 3 (javascript):
```javascript
type getFacetedRowModel = () => RowModel<TData>
```

Example 4 (javascript):
```javascript
type getFacetedRowModel = () => RowModel<TData>
```

---

## Pagination APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/pagination

**Contents:**
- State
- Table Options
  - manualPagination
  - pageCount
  - rowCount
  - autoResetPageIndex
  - onPaginationChange
  - getPaginationRowModel
- Table API
  - setPagination

Pagination state is stored on the table using the following shape:

Enables manual pagination. If this option is set to true, the table will not automatically paginate rows using getPaginationRowModel() and instead will expect you to manually paginate the rows before passing them to the table. This is useful if you are doing server-side pagination and aggregation.

When manually controlling pagination, you can supply a total pageCount value to the table if you know it. If you do not know how many pages there are, you can set this to -1. Alternatively, you can provide a rowCount value and the table will calculate the pageCount internally.

When manually controlling pagination, you can supply a total rowCount value to the table if you know it. pageCount will be calculated internally from rowCount and pageSize.

If set to true, pagination will be reset to the first page when page-altering state changes eg. data is updated, filters change, grouping changes, etc.

🧠 Note: This option defaults to false if manualPagination is set to true

If this function is provided, it will be called when the pagination state changes and you will be expected to manage the state yourself. You can pass the managed state back to the table via the tableOptions.state.pagination option.

Returns the row model after pagination has taken place, but no further.

Pagination columns are automatically reordered by default to the start of the columns list. If you would rather remove them or leave them as-is, set the appropriate mode here.

Sets or updates the state.pagination state.

Resets the pagination state to initialState.pagination, or true can be passed to force a default blank state reset to [].

Updates the page index using the provided function or value.

Resets the page index to its initial state. If defaultState is true, the page index will be reset to 0 regardless of initial state.

Updates the page size using the provided function or value.

Resets the page size to its initial state. If defaultState is true, the page size will be reset to 10 regardless of initial state.

Returns an array of page options (zero-index-based) for the current page size.

Returns whether the table can go to the previous page.

Returns whether the table can go to the next page.

Decrements the page index by one, if possible.

Increments the page index by one, if possible.

Sets the page index to 0.

Sets the page index to the last available page.

Returns the page count. If manually paginating or con

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type PaginationTableState = {
  pagination: PaginationState
}

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>
}
```

Example 2 (unknown):
```unknown
export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type PaginationTableState = {
  pagination: PaginationState
}

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>
}
```

Example 3 (unknown):
```unknown
export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type PaginationTableState = {
  pagination: PaginationState
}

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>
}
```

Example 4 (unknown):
```unknown
export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type PaginationTableState = {
  pagination: PaginationState
}

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>
}
```

---

## Column Ordering APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-ordering

**Contents:**
- State
- Table Options
  - onColumnOrderChange
- Table API
  - setColumnOrder
  - resetColumnOrder
- Column API
  - getIndex
  - getIsFirstColumn
  - getIsLastColumn

Column ordering state is stored on the table using the following shape:

If provided, this function will be called with an updaterFn when state.columnOrder changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.

Sets or updates the state.columnOrder state.

Resets the columnOrder state to initialState.columnOrder, or true can be passed to force a default blank state reset to [].

Returns the index of the column in the order of the visible columns. Optionally pass a position parameter to get the index of the column in a sub-section of the table.

Returns true if the column is the first column in the order of the visible columns. Optionally pass a position parameter to check if the column is the first in a sub-section of the table.

Returns true if the column is the last column in the order of the visible columns. Optionally pass a position parameter to check if the column is the last in a sub-section of the table.

**Examples:**

Example 1 (unknown):
```unknown
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

Example 2 (unknown):
```unknown
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

Example 3 (unknown):
```unknown
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

Example 4 (unknown):
```unknown
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

---

## Column Sizing APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-sizing

**Contents:**
- State
- Column Def Options
  - enableResizing
  - size
  - minSize
  - maxSize
- Column API
  - getSize
  - getStart
  - getAfter

Column sizing state is stored on the table using the following shape:

Enables or disables column resizing for the column.

The desired size for the column

The minimum allowed size for the column

The maximum allowed size for the column

Returns the current size of the column

Returns the offset measurement along the row-axis (usually the x-axis for standard tables) for the column, measuring the size of all preceding columns.

Useful for sticky or absolute positioning of columns. (e.g. left or transform)

Returns the offset measurement along the row-axis (usually the x-axis for standard tables) for the column, measuring the size of all succeeding columns.

Useful for sticky or absolute positioning of columns. (e.g. right or transform)

Returns true if the column can be resized.

Returns true if the column is currently being resized.

Resets the column size to its initial size.

Returns the size for the header, calculated by summing the size of all leaf-columns that belong to it.

Returns the offset measurement along the row-axis (usually the x-axis for standard tables) for the header. This is effectively a sum of the offset measurements of all preceding headers.

Returns an event handler function that can be used to resize the header. It can be used as an:

The dragging and release events are automatically handled for you.

Enables/disables column resizing for *all columns**.

Determines when the columnSizing state is updated. onChange updates the state when the user is dragging the resize handle. onEnd updates the state when the user releases the resize handle.

Enables or disables right-to-left support for resizing the column. defaults to 'ltr'.

This optional function will be called when the columnSizing state changes. If you provide this function, you will be responsible for maintaining its state yourself. You can pass this state back to the table via the state.columnSizing table option.

This optional function will be called when the columnSizingInfo state changes. If you provide this function, you will be responsible for maintaining its state yourself. You can pass this state back to the table via the state.columnSizingInfo table option.

Sets the column sizing state using an updater function or a value. This will trigger the underlying onColumnSizingChange function if one is passed to the table options, otherwise the state will be managed automatically by the table.

Sets the column sizing info state using an updater function or a value. This will 

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

Example 2 (unknown):
```unknown
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

Example 3 (unknown):
```unknown
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

Example 4 (unknown):
```unknown
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

---

## Global Filtering APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/global-filtering

**Contents:**
- Can-Filter
- State
- Filter Functions
    - Using Filter Functions
    - Filter Meta
- Column Def Options
  - enableGlobalFilter
- Column API
  - getCanGlobalFilter
- Row API

The ability for a column to be globally filtered is determined by the following:

Filter state is stored on the table using the following shape:

You can use the same filter functions that are available for column filtering for global filtering. See the Column Filtering to learn more about filter functions.

Filter functions can be used/referenced/defined by passing the following to options.globalFilterFn:

The final list of filter functions available for the tableOptions.globalFilterFn options use the following type:

Filtering data can often expose additional information about the data that can be used to aid other future operations on the same data. A good example of this concept is a ranking-system like that of match-sorter that simultaneously ranks, filters and sorts data. While utilities like match-sorter make a lot of sense for single-dimensional filter+sort tasks, the decoupled filtering/sorting architecture of building a table makes them very difficult and slow to use.

To make a ranking/filtering/sorting system work with tables, filterFns can optionally mark results with a filter meta value that can be used later to sort/group/etc the data to your liking. This is done by calling the addMeta function supplied to your custom filterFn.

Below is an example using our own match-sorter-utils package (a utility fork of match-sorter) to rank, filter, and sort the data

Enables/disables the global filter for this column.

Returns whether or not the column can be globally filtered. Set to false to disable a column from being scanned during global filtering.

The column filters meta map for the row. This object tracks any filter meta for a row as optionally provided during the filtering process.

This option allows you to define custom filter functions that can be referenced in a column's filterFn option by their key. Example:

By default, filtering is done from parent rows down (so if a parent row is filtered out, all of its children will be filtered out as well). Setting this option to true will cause filtering to be done from leaf rows up (which means parent rows will be included so long as one of their child or grand-child rows is also included).

By default, filtering is done for all rows (max depth of 100), no matter if they are root level parent rows or the child leaf rows of a parent row. Setting this option to 0 will cause filtering to only be applied to the root level parent rows, with all sub-rows remaining unfiltered. Similarly, setting this opt

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export interface GlobalFilterTableState {
  globalFilter: any
}
```

Example 2 (unknown):
```unknown
export interface GlobalFilterTableState {
  globalFilter: any
}
```

Example 3 (unknown):
```unknown
export interface GlobalFilterTableState {
  globalFilter: any
}
```

Example 4 (unknown):
```unknown
export interface GlobalFilterTableState {
  globalFilter: any
}
```

---

## Column APIs

**URL:** https://tanstack.com/table/latest/docs/api/core/column

**Contents:**
- Column API
  - id
  - depth
  - accessorFn
  - columnDef
  - columns
  - parent
  - getFlatColumns
  - getLeafColumns

These are core options and API properties for all columns. More options and API properties are available for other table features.

All column objects have the following properties:

The resolved unique identifier for the column resolved in this priority:

The depth of the column (if grouped) relative to the root column def array.

The resolved accessor function to use when extracting the value for the column from each row. Will only be defined if the column def has a valid accessor key or function defined.

The original column def used to create the column.

The child column (if the column is a group column). Will be an empty array if the column is not a group column.

The parent column for this column. Will be undefined if this is a root column.

Returns the flattened array of this column and all child/grand-child columns for this column.

Returns an array of all leaf-node columns for this column. If a column has no children, it is considered the only leaf-node column.

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

## Column Filtering APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/column-filtering

**Contents:**
- Can-Filter
- State
- Filter Functions
  - filterFn.resolveFilterValue
  - filterFn.autoRemove
    - Using Filter Functions
    - Filter Meta
- Column Def Options
  - filterFn
  - enableColumnFilter

The ability for a column to be column filtered is determined by the following:

Filter state is stored on the table using the following shape:

The following filter functions are built-in to the table core:

Every filter function receives:

and should return true if the row should be included in the filtered rows, and false if it should be removed.

This is the type signature for every filter function:

This optional "hanging" method on any given filterFn allows the filter function to transform/sanitize/format the filter value before it is passed to the filter function.

This optional "hanging" method on any given filterFn is passed a filter value and expected to return true if the filter value should be removed from the filter state. eg. Some boolean-style filters may want to remove the filter value from the table state if the filter value is set to false.

Filter functions can be used/referenced/defined by passing the following to columnDefinition.filterFn:

The final list of filter functions available for the columnDef.filterFn option use the following type:

Filtering data can often expose additional information about the data that can be used to aid other future operations on the same data. A good example of this concept is a ranking-system like that of match-sorter that simultaneously ranks, filters and sorts data. While utilities like match-sorter make a lot of sense for single-dimensional filter+sort tasks, the decoupled filtering/sorting architecture of building a table makes them very difficult and slow to use.

To make a ranking/filtering/sorting system work with tables, filterFns can optionally mark results with a filter meta value that can be used later to sort/group/etc the data to your liking. This is done by calling the addMeta function supplied to your custom filterFn.

Below is an example using our own match-sorter-utils package (a utility fork of match-sorter) to rank, filter, and sort the data

The filter function to use with this column.

Enables/disables the column filter for this column.

Returns whether or not the column can be column filtered.

Returns the index (including -1) of the column filter in the table's state.columnFilters array.

Returns whether or not the column is currently filtered.

Returns the current filter value of the column.

A function that sets the current filter value for the column. You can pass it a value or an updater function for immutability-safe operations on existing values.

Returns an automatically ca

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export interface ColumnFiltersTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}
```

Example 2 (unknown):
```unknown
export interface ColumnFiltersTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}
```

Example 3 (unknown):
```unknown
export interface ColumnFiltersTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}
```

Example 4 (unknown):
```unknown
export interface ColumnFiltersTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}
```

---

## Sorting APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/sorting

**Contents:**
- State
- Sorting Functions
    - Using Sorting Functions
- Column Def Options
  - sortingFn
  - sortDescFirst
  - enableSorting
  - enableMultiSort
  - invertSorting
  - sortUndefined

Sorting state is stored on the table using the following shape:

The following sorting functions are built-in to the table core:

Every sorting function receives 2 rows and a column ID and are expected to compare the two rows using the column ID to return -1, 0, or 1 in ascending order. Here's a cheat sheet:

This is the type signature for every sorting function:

Sorting functions can be used/referenced/defined by passing the following to columnDefinition.sortingFn:

The final list of sorting functions available for the columnDef.sortingFn use the following type:

The sorting function to use with this column.

Set to true for sorting toggles on this column to start in the descending direction.

Enables/Disables sorting for this column.

Enables/Disables multi-sorting for this column.

Inverts the order of the sorting for this column. This is useful for values that have an inverted best/worst scale where lower numbers are better, eg. a ranking (1st, 2nd, 3rd) or golf-like scoring

NOTE: 'first' and 'last' options are new in v8.16.0

Returns a sorting function automatically inferred based on the columns values.

Returns a sort direction automatically inferred based on the columns values.

Returns the resolved sorting function to be used for this column

Returns the next sorting order.

Returns whether this column can be sorted.

Returns whether this column can be multi-sorted.

Returns the index position of this column's sorting within the sorting state

Returns whether this column is sorted.

Returns the first direction that should be used when sorting this column.

Removes this column from the table's sorting state

Toggles this columns sorting state. If desc is provided, it will force the sort direction to that value. If isMulti is provided, it will additivity multi-sort the column (or toggle it if it is already sorted).

Returns a function that can be used to toggle this column's sorting state. This is useful for attaching a click handler to the column header.

This option allows you to define custom sorting functions that can be referenced in a column's sortingFn option by their key. Example:

Enables manual sorting for the table. If this is true, you will be expected to sort your data before it is passed to the table. This is useful if you are doing server-side sorting.

If provided, this function will be called with an updaterFn when state.sorting changes. This overrides the default internal state management, so you will need to persist the state cha

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

Example 2 (unknown):
```unknown
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

Example 3 (unknown):
```unknown
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

Example 4 (unknown):
```unknown
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

---

## Row Pinning APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/row-pinning

**Contents:**
- Can-Pin
- State
- Table Options
  - enableRowPinning
  - keepPinnedRows
  - onRowPinningChange
- Table API
  - setRowPinning
  - resetRowPinning
  - getIsSomeRowsPinned

The ability for a row to be pinned is determined by the following:

Pinning state is stored on the table using the following shape:

Enables/disables row pinning for all rows in the table.

When false, pinned rows will not be visible if they are filtered or paginated out of the table. When true, pinned rows will always be visible regardless of filtering or pagination. Defaults to true.

If provided, this function will be called with an updaterFn when state.rowPinning changes. This overrides the default internal state management, so you will also need to supply state.rowPinning from your own managed state.

Sets or updates the state.rowPinning state.

Resets the rowPinning state to initialState.rowPinning, or true can be passed to force a default blank state reset to {}.

Returns whether or not any rows are pinned. Optionally specify to only check for pinned rows in either the top or bottom position.

Returns all top pinned rows.

Returns all bottom pinned rows.

Returns all rows that are not pinned to the top or bottom.

Pins a row to the 'top' or 'bottom', or unpins the row to the center if false is passed.

Returns whether or not the row can be pinned.

Returns the pinned position of the row. ('top', 'bottom' or false)

Returns the numeric pinned index of the row within a pinned row group.

**Examples:**

Example 1 (unknown):
```unknown
export type RowPinningPosition = false | 'top' | 'bottom'

export type RowPinningState = {
  top?: string[]
  bottom?: string[]
}

export type RowPinningRowState = {
  rowPinning: RowPinningState
}
```

Example 2 (unknown):
```unknown
export type RowPinningPosition = false | 'top' | 'bottom'

export type RowPinningState = {
  top?: string[]
  bottom?: string[]
}

export type RowPinningRowState = {
  rowPinning: RowPinningState
}
```

Example 3 (unknown):
```unknown
export type RowPinningPosition = false | 'top' | 'bottom'

export type RowPinningState = {
  top?: string[]
  bottom?: string[]
}

export type RowPinningRowState = {
  rowPinning: RowPinningState
}
```

Example 4 (unknown):
```unknown
export type RowPinningPosition = false | 'top' | 'bottom'

export type RowPinningState = {
  top?: string[]
  bottom?: string[]
}

export type RowPinningRowState = {
  rowPinning: RowPinningState
}
```

---

## Grouping APIs

**URL:** https://tanstack.com/table/latest/docs/api/features/grouping

**Contents:**
- State
- Aggregation Functions
    - Using Aggregation Functions
- Column Def Options
  - aggregationFn
  - aggregatedCell
  - enableGrouping
  - getGroupingValue
- Column API
  - aggregationFn

Grouping state is stored on the table using the following shape:

The following aggregation functions are built-in to the table core:

Every grouping function receives:

and should return a value (usually primitive) to build the aggregated row model.

This is the type signature for every aggregation function:

Aggregation functions can be used/referenced/defined by passing the following to columnDefinition.aggregationFn:

The final list of aggregation functions available for the columnDef.aggregationFn use the following type:

The aggregation function to use with this column.

The cell to display each row for the column if the cell is an aggregate. If a function is passed, it will be passed a props object with the context of the cell and should return the property type for your adapter (the exact type depends on the adapter being used).

Enables/disables grouping for this column.

Specify a value to be used for grouping rows on this column. If this option is not specified, the value derived from accessorKey / accessorFn will be used instead.

The resolved aggregation function for the column.

Returns whether or not the column can be grouped.

Returns whether or not the column is currently grouped.

Returns the index of the column in the grouping state.

Toggles the grouping state of the column.

Returns a function that toggles the grouping state of the column. This is useful for passing to the onClick prop of a button.

Returns the automatically inferred aggregation function for the column.

Returns the aggregation function for the column.

If this row is grouped, this is the id of the column that this row is grouped by.

If this row is grouped, this is the unique/shared value for the groupingColumnId for all of the rows in this group.

Returns whether or not the row is currently grouped.

Returns the grouping value for any row and column (including leaf rows).

This option allows you to define custom aggregation functions that can be referenced in a column's aggregationFn option by their key. Example:

Enables manual grouping. If this option is set to true, the table will not automatically group rows using getGroupedRowModel() and instead will expect you to manually group the rows before passing them to the table. This is useful if you are doing server-side grouping and aggregation.

If this function is provided, it will be called when the grouping state changes and you will be expected to manage the state yourself. You can pass the managed state back to 

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export type GroupingState = string[]

export type GroupingTableState = {
  grouping: GroupingState
}
```

Example 2 (unknown):
```unknown
export type GroupingState = string[]

export type GroupingTableState = {
  grouping: GroupingState
}
```

Example 3 (unknown):
```unknown
export type GroupingState = string[]

export type GroupingTableState = {
  grouping: GroupingState
}
```

Example 4 (unknown):
```unknown
export type GroupingState = string[]

export type GroupingTableState = {
  grouping: GroupingState
}
```

---
