# HRIS Components Dictionary

A comprehensive directory of the components available in the `hris` project.

## Core & Layout Components
- `admin.tsx`: Root admin component wrapping CoreAdminContext and CoreAdminUI.
- `layout.tsx`: Main application layout with sidebar, header, and content area.
- `app-sidebar.tsx`: Collapsible application sidebar with navigation items.
- `authentication.tsx`: Authentication-related components (AuthCallback).
- `login-page.tsx`: Custom login page component.
- `theme-provider.tsx`: Theme context provider for shadcn/ui.
- `notification.tsx`: Global notification system wrapper.
- `ready.tsx`: Ready page shown during initial app load.

## Field Components (Display Only)
- `array-field.tsx`: Displays a list of items.
- `badge-field.tsx`: Displays text within a Badge component.
- `boolean-field.tsx`: Displays a boolean value with icons.
- `date-field.tsx`: Formats and displays date values.
- `email-field.tsx`: Displays an email address with a mailto link.
- `file-field.tsx`: Displays a link to a file.
- `image-field.tsx`: Displays an image.
- `number-field.tsx`: Formats and displays numeric values.
- `record-field.tsx`: Logic for accessing record fields.
- `reference-array-field.tsx`: Displays a list of referenced records.
- `reference-field.tsx`: Displays a single referenced record.
- `reference-many-field.tsx`: Displays related records from a one-to-many relationship.
- `select-field.tsx`: Displays the label of a selected value.
- `text-field.tsx`: Standard text display component.
- `url-field.tsx`: Displays a clickable URL.

## Input Components (Forms)
- `array-input.tsx`: Input for managing arrays of sub-records.
- `autocomplete-input.tsx`: Searchable dropdown input.
- `autocomplete-array-input.tsx`: Searchable multi-select input.
- `boolean-input.tsx`: Checkbox input for boolean values.
- `date-input.tsx`: Date picker input.
- `date-time-input.tsx`: Date and time picker input.
- `file-input.tsx`: File upload input with dropzone support.
- `number-input.tsx`: Numeric input field.
- `radio-button-group-input.tsx`: Group of radio button inputs.
- `reference-input.tsx`: Input for selecting a single related record.
- `reference-array-input.tsx`: Input for selecting multiple related records.
- `search-input.tsx`: Search field for filters.
- `select-input.tsx`: Standard dropdown select input.
- `text-input.tsx`: Standard text input field.
- `text-array-input.tsx`: Input for a list of simple strings.

## Action & Button Components
- `bulk-actions-toolbar.tsx`: Toolbar for actions on selected records.
- `bulk-delete-button.tsx`: Deletes multiple selected records.
- `bulk-export-button.tsx`: Exports multiple selected records.
- `cancel-button.tsx`: Standard cancel action button.
- `columns-button.tsx`: Toggle for selecting visible table columns.
- `create-button.tsx`: Navigates to the creation page.
- `delete-button.tsx`: Deletes a single record.
- `edit-button.tsx`: Navigates to the edit page.
- `export-button.tsx`: Exports the current list of records.
- `refresh-button.tsx`: Triggers a data refresh.
- `show-button.tsx`: Navigates to the record show page.
- `select-all-button.tsx`: Selects all rows in a list.
- `sort-button.tsx`: Triggers sorting for a specific field.
- `toggle-filter-button.tsx`: Toggles the visibility of the filter form.
- `icon-button-with-tooltip.tsx`: Reusable icon button with shadcn Tooltip.

## UI Components (shadcn/ui base)
Located in `src/components/ui/`:
- `accordion.tsx`, `alert.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `button.tsx`, `card.tsx`, `checkbox.tsx`, `command.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `input-group.tsx`, `input.tsx`, `label.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `radio-group.tsx`, `select.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `sonner.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `tooltip.tsx`.

## Guesser Components (Auto-discovery)
- `list-guesser.tsx`: Automatically builds a list view based on the data structure.
- `edit-guesser.tsx`: Automatically builds an edit form.
- `show-guesser.tsx`: Automatically builds a show view.
- `guesser-empty.tsx`: Placeholder for guesser components when no fields are found.

## Other Utility Components
- `breadcrumb.tsx`: Custom breadcrumb logic for admin navigation.
- `confirm.tsx`: Confirmation dialog component.
- `count.tsx`: Displays the count of records.
- `data-table.tsx`: A feature-rich data table component based on tanstack table.
- `error.tsx`: Custom error page/boundary component.
- `filter-form.tsx`: Form for filtering list data.
- `form.tsx`: Base form container wrapper.
- `list.tsx`: Base list view container.
- `loading.tsx`: Loading state component.
- `locales-menu-button.tsx`: Language selection menu.
- `spinner.tsx`: Visual loading spinner.
- `user-menu.tsx`: User profile menu for the header.
- `saved-queries.tsx`: Component for managing saved list filters.
- `simple-form.tsx`, `simple-form-iterator.tsx`, `simple-show-layout.tsx`: Layout-specific containers for forms and views.
