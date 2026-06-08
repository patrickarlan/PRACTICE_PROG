// 1. Union types

let isStatus: "active" | "inactive"


isStatus = "active";


console.log(`Employee Status is: ${isStatus}`);

// 2. Nullables and optional chaining (?.)

type Manager = {
    yourName: string;
};

const company = {
    yourName: "Tech Corp",
    manager: null as Manager | null
};

const nameManager = company.manager?.yourName;
console.log(`Company Manager is: ${nameManager}`);

// 3. Nullish Coalescing ()

let supervisor: string | null = null;
const supervisorResult = supervisor ?? "No Supervisor Assigned";
console.log(`Supervisor is: ${supervisorResult}`);

// 4. Generics

function wrapInArray<T>(item: T): T[] {
    return [item];
}

const stringArray = wrapInArray("Hello");
const numberArray = wrapInArray(99);
const boolArray = wrapInArray(true);

console.log(`String Array: ${stringArray}`);
console.log(`Number Array: ${numberArray}`);
console.log(`Boolean Array: ${boolArray}`);

