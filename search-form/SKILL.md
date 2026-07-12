---
name: search-form
description: Generate a search/filter form UI component with keyword input, select dropdowns, date range, and checkboxes. Use when user asks to create a search form, filter panel, or search UI with multiple filter types.
tools: Read, Glob, Grep, Write, Edit
---

# Search Form Generator

Generate a polished search form UI component with 4-6 filters for $ARGUMENTS.

## Step 1: Detect Project Stack

```
- package.json: !`cat package.json 2>/dev/null | grep -E '"(react|vue|next|tailwind|shadcn|mui|antd|react-hook-form|zod|dayjs|date-fns)"'`
- Existing components: !`ls src/components/ app/components/ components/ 2>/dev/null | head -20`
- TypeScript: !`ls tsconfig.json 2>/dev/null`
```

Check for:
- UI library: Tailwind CSS / shadcn/ui / MUI / Ant Design / plain CSS
- Form library: react-hook-form / Formik / none
- Date library: date-fns / dayjs / none
- TypeScript: yes / no
- Framework: Next.js / React / Vue

Also read 1-2 existing components to match naming conventions and patterns.

## Step 2: Determine Fields

Parse $ARGUMENTS for custom field names. If not specified, use these defaults:

| Filter | Type | Default Name |
|--------|------|-------------|
| Keyword | text input | `keyword` |
| Category | select | `category` |
| Status | select | `status` |
| Date from | date input | `dateFrom` |
| Date to | date to | `dateTo` |
| Tags / Options | checkbox group | `tags` |

If $ARGUMENTS specifies field names (e.g. "案件検索 フィールド: title, industry, region, dateFrom, dateTo, isActive"), use those instead.

## Step 3: Generate the Component

### Output file
- React/Next.js: `components/SearchForm.tsx` (or `.jsx` if no TS)
- Vue: `components/SearchForm.vue`
- Match the project's component directory

### Component Requirements

**Structure:**
```
<form>
  [Keyword input]       — text, with search icon
  [Select 1]            — e.g. category / status
  [Select 2]            — e.g. region / type  (if applicable)
  [Date range]          — from / to pair, inline
  [Checkbox group]      — 3-5 options, horizontal layout
  [Reset] [Search]      — action buttons, right-aligned
</form>
```

**State:**
- Single `filters` state object (not individual useState per field)
- `onSearch(filters)` callback prop
- `onReset()` resets all to defaults

**TypeScript (if detected):**
```ts
export type SearchFilters = {
  keyword: string
  category: string
  status: string
  dateFrom: string
  dateTo: string
  tags: string[]
}
```

**Styling rules:**
- Tailwind: responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), gap-4
- shadcn/ui: use `Input`, `Select`, `Checkbox`, `Button` components
- MUI: use `TextField`, `Select`, `Checkbox`, `DatePicker`
- Ant Design: use `Input`, `Select`, `Checkbox.Group`, `DatePicker.RangePicker`
- Plain CSS: provide a `.search-form` CSS module or inline style object

**Accessibility:**
- All inputs have `<label>` or `aria-label`
- Date range inputs have clear `from` / `to` labels
- Checkbox group has `<fieldset>` + `<legend>`

**No external dependencies beyond what's already installed.**

## Step 4: Also Generate a Usage Example

Add a brief usage snippet as a comment at the top of the file, or in a sibling `SearchForm.example.tsx`:

```tsx
// Usage:
// <SearchForm onSearch={(filters) => console.log(filters)} />
```

## Output Checklist

Before finishing, confirm:
- [ ] All 4+ filter types included: text, select, date range, checkbox
- [ ] TypeScript types defined (if TS project)
- [ ] `onSearch` and `onReset` props work correctly
- [ ] Responsive layout
- [ ] Labels / accessibility attributes present
- [ ] Matches project's existing component style
