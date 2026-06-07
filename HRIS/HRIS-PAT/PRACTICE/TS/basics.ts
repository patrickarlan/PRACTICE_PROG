// 1. variables
let myName: string = "Patrick";
let myAge: number = 22;
let Student: boolean = false;
let faveFoods: string[] = ["Burder", "Pizza", "Chicken"];
let person2: object = {
    firstName: "Patrick",
    jobTitle: "Unemployed"
}

// 2. functions
const sayHello2 = (name: string): string => {
    return `Welcome to TS, ${name}!`;
}


// 3. interface
interface Employee {
    id: number,
    name: string,
    department: string,
    isActive: boolean
}

// 4. assign interface
const employeeInfo: Employee = {
    id: 1,
    name: "Patrick",
    department: "IT",
    isActive: true
}

// 5. department interface
interface Department {
    id: number,
    name: string,
    code?: string
}

// 6. array
const employees: Employee[] = [{
    id: 1,
    name: "Patrick",
    department: "IT",
    isActive: true
}, {
    id: 2,
    name: "Patrick",
    department: "IT",
    isActive: true
}, {
    id: 3,
    name: "Patrick",
    department: "IT",
    isActive: true
}]

// 7. hris tsx

interface ARDashboardProps {
    mode?: 'my-ar' | 'team-ar';
}

// from ARDashboard.tsx
// this interface lets mode to be optional between
//  the union of `my-ar` or `team-ar`
// in plain english: It's a prop that controls
// which view the component shows — either the employee's own reports
// or the team's reports — and TypeScript ensures only those two values are accepted.




