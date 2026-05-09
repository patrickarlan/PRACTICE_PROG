# HRIS Frontend

This is the frontend application for the Human Resource Information System (HRIS). It is built with React, Vite, TypeScript, React Admin, and Shadcn UI.

## Core Technologies
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Admin Framework:** React Admin v5
- **UI Library:** Shadcn UI + Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- NPM or Yarn

### Installation
1. Navigate to the `hris` directory:
   ```bash
   cd hris
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`. Make sure the .NET backend is also running.

## Architecture & Best Practices

### React Admin + Shadcn UI Integration
This project uses **React Admin** for data fetching and routing, but completely replaces its default Material UI (MUI) components with **Shadcn UI** and Tailwind CSS. 

**CRITICAL RULE:** Do not import UI components directly from `react-admin` or `@mui/material` (e.g., `<SimpleForm>`, `<DeleteButton>`, `<Datagrid>`). Mixing MUI's theme engine with our Shadcn setup causes severe crashes (e.g., `TypeError: Cannot read properties of null (reading 'breakpoints')`).

Instead, ALWAYS use the custom wrappers provided in `@/components`:
```tsx
// ❌ BAD: Will crash the theme provider
import { SimpleForm, DeleteButton } from 'react-admin';

// ✅ GOOD: Use our local wrappers
import { SimpleForm, DeleteButton } from '@/components';
```

### Data Provider (`dataProvider.ts`)
The application uses a custom `dataProvider` to communicate with the .NET backend.
- It automatically unwraps the backend's `ApiResponse<T>` pattern.
- It handles ID mapping mapping (e.g., converting the backend's `reportId` to React Admin's required `id` field).

### Accomplishment Reports (AR) UI
The Accomplishment Reports feature utilizes a custom "Tabular Entry" spreadsheet-style UI. 
- **Creation (`ARCreate.tsx`)**: Allows users to enter multiple rows of tasks at once.
- **Editing (`AREdit.tsx`)**: Uses the exact same tabular UI layout to provide a consistent spreadsheet experience, loading initial data efficiently via the dataprovider.
- Both pages calculate hours automatically based on start and end times.
- **Pessimistic Mutations**: Deletions and updates use `mutationMode="pessimistic"` to ensure the UI waits for the backend to succeed, preventing "bounce-back" records if a request fails.

### Status-Based UI Guards (Soft Editing)
The UI dynamically hides action buttons based on the status of a record. For example, in the Accomplishment Reports list, the *Edit* and *Delete* buttons only appear if the report `status` is "Pending". Once Approved or Submitted, the record becomes visually read-only.
