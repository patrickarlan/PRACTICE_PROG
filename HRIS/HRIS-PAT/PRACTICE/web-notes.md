Task 1: Map the HRIS structure
hris
|___src
    |___assets // this contains the svg used in the ui
    |___auth // this folder handle the login and authentication of the user
    |___components // sthis folder contains the reusable components used in the ui
    |___context // this folder contains the context used in the ui
    |___features // this folder contains the features of the ui
    |___hooks // this folder contains the hooks used in the ui
    |___lib // this folder contains the utility functions used in the ui
    |___resources // this folder contains the resources used in the ui

Task 2: .ts vs .tsx
authProvider.ts // this file is responsible for the authentication of the user.
App.tsx // this file is responsible for the routes and resources of the application.

Task 3: The cn() Utility
```ts
// this is a utility function that is used to merge the class names of the components.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Task 4: Setup your Portfolio Structure
Navigate to your PRACTICE/PORTFOLIO/src/ folder.
Manually create the following folders: components/, features/, hooks/, and lib/. (Leave them empty for now).

= done