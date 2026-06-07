// 1. variables
let name = "Patrick";
let age = 22;
let isStudent = false;
let favoriteFoods = ["Burger", "Pizza", "Chicken"];
let person = {
    firstName: "Patrick",
    jobTitle: "Unemployed"
};


// 2. Functions
const sayHello = (name) => {
    return `Welcome to JS, ${name}!`
}
console.log(sayHello("Patrick"));

// 3. If/Else
if (age => 18) {
    console.log("You can vote!");
} else {
    console.log("Too young to vote!")
}

// 4. For Loop
for (let i = 0; i < favoriteFoods.length; i++) {
    console.log(favoriteFoods[i]);
}
// 5. Map
function newFavFood() {
    return favoriteFoods.map((food) => {
        return food + " is delicious!"
    });
}
console.log(newFavFood());