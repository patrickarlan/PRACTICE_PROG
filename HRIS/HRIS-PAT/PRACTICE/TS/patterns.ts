const user = { firstName: "Patrick", lastName: "Star", age: 25 };

const { firstName, age } = user;
console.log(firstName, age);

console.log("\n-------------------------");

const coordinates = [10.5, 20.1, 99.9];

const [x, y] = coordinates;
console.log(x, y);

console.log("\n-------------------------");

const updatedUser = {
    ...user,
    age: 26,
};
console.log(updatedUser);

console.log("\n-------------------------");

const newCoordinates = [...coordinates, 55.5];
console.log(newCoordinates);

console.log("\n-------------------------");

let hasError: boolean = true;

hasError && console.log("An error occured!");



