---
name: tanstack-table
description: TanStack Table - Headless UI for building powerful tables and datagrids. Use for sorting, filtering, pagination, virtualization, and complex table features.
---

# TanStack Table Skill

Comprehensive assistance with TanStack Table development - a headless UI library for building powerful tables and datagrids for React, Vue, Solid, Svelte, Qwik, and other frameworks.

## When to Use This Skill

This skill should be triggered when you are:

**Building Tables:**
- Creating data tables or datagrids from scratch
- Implementing sortable, filterable, or paginated tables
- Building tables with column resizing, pinning, or reordering
- Working with large datasets that need virtualization

**TanStack Table Features:**
- Setting up table hooks like `useReactTable`, `createSolidTable`, `useVueTable`
- Configuring column definitions with `createColumnHelper`
- Implementing filtering (column filters, global filters, faceted filters)
- Adding pagination, sorting, or row selection
- Handling grouped/hierarchical data with row expansion
- Managing table state (visibility, ordering, sizing)

**Debugging & Optimization:**
- Troubleshooting TanStack Table issues
- Optimizing table performance with memoization
- Understanding table state management
- Migrating from older table libraries

**Framework-Specific:**
- Integrating TanStack Table with React, Vue, Solid, Svelte, or Qwik
- Using framework adapters (@tanstack/react-table, @tanstack/vue-table, etc.)

## Key Concepts

### Headless Architecture
TanStack Table doesn't render any DOM elements. You control the markup and styles while TanStack provides the logic, state management, and APIs.

### Core Abstractions
- **Table Instance**: Created via `useReactTable()` - the main table object with all APIs
- **Column Definitions**: Define data structure, rendering, and behavior for each column
- **Row Model**: Different models for core data, filtering, sorting, pagination, etc.
- **Table State**: Managed state for features like sorting, filtering, pagination, visibility
- **Cell/Header/Row Objects**: Individual objects with properties and methods for rendering

### Column Definition Types
1. **Accessor Columns**: Extract primitive values from data (`accessorKey` or `accessorFn`)
2. **Display Columns**: Render UI elements without data (actions, checkboxes, etc.)
3. **Grouping Columns**: Parent columns that group child columns

### Row Models
Row models transform your data for different features:
- `getCoreRowModel()` - Base row model (required)
- `getFilteredRowModel()` - Applies column/global filters
- `getSortedRowModel()` - Applies sorting
- `getPaginatedRowModel()` - Applies pagination
- `getExpandedRowModel()` - Handles row expansion
- `getGroupedRowModel()` - Groups rows by column values

## Quick Reference

### 1. Basic Table Setup (React)

**Create a simple table with data and columns:**

```javascript
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
}

const data: Person[] = [
  { firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Smith', age: 25 },
]

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
]

function MyTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### 2. Column Helper (Type-Safe Column Definitions)

**Use `createColumnHelper` for better TypeScript support:**

```javascript
import { createColumnHelper } from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

const columns = [
  // Display Column (no data accessor)
  columnHelper.display({
    id: 'actions',
    cell: props => <button>Edit</button>,
  }),

  // Accessor Column (using object key)
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: info => info.getValue(),
  }),

  // Accessor Column (using function)
  columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
    id: 'fullName',
    header: 'Full Name',
    cell: info => info.getValue(),
  }),

  // Grouping Column
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', { header: 'First' }),
      columnHelper.accessor('lastName', { header: 'Last' }),
    ],
  }),
]
```

### 3. Adding Filtering

**Enable column filtering with filter UI:**

```javascript
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef
} from '@tanstack/react-table'

function MyTable() {
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      {/* Filter Input */}
      <input
        value={table.getColumn('firstName')?.getFilterValue() ?? ''}
        onChange={e => table.getColumn('firstName')?.setFilterValue(e.target.value)}
        placeholder="Filter by first name..."
      />

      {/* Table */}
      <table>{/* ... */}</table>
    </div>
  )
}
```

### 4. Adding Sorting

**Enable column sorting with click handlers:**

```javascript
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

function MyTable() {
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* tbody... */}
    </table>
  )
}
```

### 5. Adding Pagination

**Enable pagination with page controls:**

```javascript
import {
  useReactTable,
  getCoreRowModel,
  getPaginatedRowModel
} from '@tanstack/react-table'

function MyTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginatedRowModel: getPaginatedRowModel(),
  })

  return (
    <div>
      <table>{/* ... */}</table>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
    </div>
  )
}
```

### 6. Row Selection

**Enable row selection with checkboxes:**

```javascript
import { useState } from 'react'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

function MyTable() {
  const [rowSelection, setRowSelection] = useState({})

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    // ... other columns
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  // Access selected rows
  const selectedRows = table.getSelectedRowModel().rows
  console.log('Selected:', selectedRows.map(row => row.original))

  return <table>{/* ... */}</table>
}
```

### 7. Column Visibility

**Toggle column visibility dynamically:**

```javascript
import { useState } from 'react'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

function MyTable() {
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      {/* Column Visibility Controls */}
      <div>
        {table.getAllLeafColumns().map(column => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        ))}
      </div>

      <table>{/* ... */}</table>
    </div>
  )
}
```

### 8. Column Resizing

**Enable column resizing with drag handles:**

```javascript
import { useReactTable, getCoreRowModel, ColumnResizeMode } from '@tanstack/react-table'

function MyTable() {
  const [columnSizing, setColumnSizing] = useState({})
  const columnResizeMode: ColumnResizeMode = 'onChange'

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table style={{ width: table.getCenterTotalSize() }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ width: header.getSize() }}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* tbody... */}
    </table>
  )
}
```

### 9. Expanding Rows (Hierarchical Data)

**Enable row expansion for nested data:**

```javascript
import { useState } from 'react'
import { useReactTable, getCoreRowModel, getExpandedRowModel } from '@tanstack/react-table'

// Data with sub-rows
const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
    subRows: [
      { firstName: 'Jane', lastName: 'Doe' },
      { firstName: 'Jim', lastName: 'Doe' },
    ],
  },
]

function MyTable() {
  const [expanded, setExpanded] = useState({})

  const columns = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: ({ row, getValue }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.getCanExpand() && (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          )}
          {getValue()}
        </div>
      ),
    },
    // ... other columns
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
  })

  return <table>{/* ... */}</table>
}
```

### 10. Default Column Sizing

**Set default sizes for all columns:**

```javascript
const defaultColumn = {
  size: 150,      // default size
  minSize: 20,    // minimum resize size
  maxSize: 500,   // maximum resize size
}

const table = useReactTable({
  data,
  columns,
  defaultColumn,
  getCoreRowModel: getCoreRowModel(),
})
```

## Reference Files

This skill includes comprehensive documentation organized by category in `references/`:

### **api.md** - Core API Reference
Complete API documentation for all table features:
- **Header APIs**: Properties and methods for header objects (id, index, depth, colSpan, rowSpan)
- **HeaderGroup APIs**: Header group properties (id, depth, headers array)
- **Cell APIs**: Cell object APIs (getValue, renderValue, row, column, getContext)
- **Row APIs**: Row object properties (id, depth, index, original, getValue, subRows)
- **Table APIs**: Table instance creation and core options (data, columns, state, onStateChange)
- **Column APIs**: Column definition options and methods
- **Feature APIs**: APIs for expanding, row selection, global faceting, and filtering

### **features.md** - Feature-Specific Documentation
Detailed documentation for advanced features:
- **Column Pinning**: Pin columns left/right with state management
- **Column Visibility**: Show/hide columns dynamically
- **Column Ordering**: Reorder columns programmatically
- **Column Faceting**: Generate lists of unique values for filters
- **Pagination**: Client-side and server-side pagination with page controls
- **Column Sizing**: Default sizes, min/max constraints, and resizing

### **getting_started.md** - Installation & Setup
Foundation for getting started:
- **Overview**: TypeScript support, headless architecture, core objects/types
- **Installation**: Framework-specific packages (React, Vue, Solid, Svelte, Qwik, Angular, Lit)
- **Framework Adapters**: Choosing the right adapter for your framework

### **guide.md** - Implementation Guides
Step-by-step guides and best practices:
- **Column Definitions Guide**: Column types, column helpers, accessor columns, formatting
- **Column Sizing Guide**: Width configuration, column resizing, resize modes, performance tips
- **Global Faceting Guide**: Generating value lists for autocomplete and range filters
- **Headers Guide**: Working with header objects, header groups, nested headers

### **other.md** - Additional Topics
Miscellaneous documentation and advanced topics not covered in other categories.

## Working with This Skill

### For Beginners
1. **Start with Installation**: Read `references/getting_started.md` to install the correct adapter
2. **Learn Column Definitions**: Study `references/guide.md` → Column Definitions Guide
3. **Follow Quick Reference**: Use examples 1-3 above to build your first table
4. **Understand Core Concepts**: Read the Key Concepts section above

### For Intermediate Users
1. **Add Features Progressively**: Start with basic table, then add filtering → sorting → pagination
2. **Reference Feature Docs**: Use `references/features.md` for specific feature implementation
3. **Study API Reference**: Refer to `references/api.md` for detailed method signatures
4. **Explore Examples**: Check Quick Reference examples 4-9 for common patterns

### For Advanced Users
1. **Performance Optimization**: Study column sizing guide for memoization techniques
2. **Custom Row Models**: Implement server-side filtering, sorting, or pagination
3. **State Management**: Use `initialState` and controlled state for complex UX
4. **Framework Integration**: Deep dive into adapter-specific patterns

### Navigation Tips
- **Looking for a specific API?** → `references/api.md` has all methods organized by object type
- **Implementing a feature?** → `references/features.md` has step-by-step guides
- **Need examples?** → Quick Reference section above has 10 practical patterns
- **Starting fresh?** → `references/getting_started.md` + Quick Reference Example 1
- **Debugging state?** → `references/api.md` → Table State section

## Common Patterns

### Pattern: Controlled vs. Uncontrolled State
```javascript
// Uncontrolled (table manages state internally)
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

// Controlled (you manage state externally)
const [sorting, setSorting] = useState([])
const table = useReactTable({
  data,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
})
```

### Pattern: Combining Multiple Features
```javascript
const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    pagination,
  },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginatedRowModel: getPaginatedRowModel(),
})
```

### Pattern: Server-Side Operations
```javascript
// For server-side pagination, sorting, filtering
const table = useReactTable({
  data, // only current page data from server
  columns,
  pageCount: totalPageCount, // from server
  state: {
    pagination,
    sorting,
    columnFilters,
  },
  onPaginationChange: setPagination,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,  // disable client-side pagination
  manualSorting: true,     // disable client-side sorting
  manualFiltering: true,   // disable client-side filtering
})

// Fetch data when state changes
useEffect(() => {
  fetchDataFromServer({ pagination, sorting, columnFilters })
}, [pagination, sorting, columnFilters])
```

## Resources

### Official Documentation
- **TanStack Table Docs**: https://tanstack.com/table/latest
- **GitHub Repository**: https://github.com/TanStack/table
- **API Reference**: https://tanstack.com/table/latest/docs/api/core/table

### Framework Adapters
- `@tanstack/react-table` - React 16.8+
- `@tanstack/vue-table` - Vue 3
- `@tanstack/solid-table` - Solid-JS 1
- `@tanstack/svelte-table` - Svelte 3/4
- `@tanstack/qwik-table` - Qwik 1
- `@tanstack/angular-table` - Angular 17+
- `@tanstack/lit-table` - Lit 3
- `@tanstack/table-core` - Framework-agnostic core

### Community
- **Discord**: TanStack Discord server
- **Examples**: https://tanstack.com/table/latest/docs/examples/react/basic
- **StackOverflow**: Tag `tanstack-table`

## Notes

- **Headless Design**: TanStack Table provides logic, not UI - you control all markup and styles
- **TypeScript First**: Fully typed APIs with excellent IDE autocomplete support
- **Framework Agnostic Core**: Same API across all framework adapters
- **Performance**: Optimized for large datasets with proper memoization
- **Extensible**: Plugin-based architecture for custom features

## Troubleshooting

**Table not rendering?**
- Ensure you've included `getCoreRowModel: getCoreRowModel()`
- Check that `data` and `columns` are properly defined

**State not updating?**
- For controlled state, ensure you're using both `state` and the corresponding `onChange` handler
- Example: `state: { sorting }` + `onSortingChange: setSorting`

**Type errors with TypeScript?**
- Use `createColumnHelper<YourDataType>()` for type-safe column definitions
- Define your data type: `type Person = { ... }`

**Features not working?**
- Each feature requires its specific row model (e.g., `getFilteredRowModel()` for filtering)
- Check that you've imported and included the necessary row models

**Performance issues?**
- Memoize your `data` and `columns` arrays with `useMemo`
- Use `columnResizeMode: 'onEnd'` for smoother column resizing
- Consider pagination for large datasets
