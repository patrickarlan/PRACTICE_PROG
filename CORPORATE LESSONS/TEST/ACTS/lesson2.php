<?php

// Run all activities
activity1();
activity2();
activity3();
activity4();
activity5();
activity6_process();

// ============================================
// ACTIVITY 1: Output Variables
// ============================================
function activity1()
{
    echo "===== ACTIVITY 1: Output Variables =====\n";

    // TODO: Create 3 variables: $name, $position, $department
    // TODO: Assign values to each
    // TODO: Output them with labels using echo

    // Your code here:


    echo "\n";
}

// ============================================
// ACTIVITY 2: Create & Use a Function
// ============================================
function activity2()
{
    echo "===== ACTIVITY 2: Calculate Net Salary =====\n";

    // TODO: Create a function called calculateNetSalary
    // TODO: Takes $salary as parameter
    // TODO: Calculates tax as 15% of salary
    // TODO: Returns net salary (salary - tax)
    // TODO: Test with salary = 50000

    // Your code here:


    echo "\n";
}

// ============================================
// ACTIVITY 3: Loop Through Array
// ============================================
function activity3()
{
    echo "===== ACTIVITY 3: Loop Through Job Titles =====\n";

    // TODO: Create an array of 5 job titles
    // TODO: Use foreach loop to go through each title
    // TODO: Output: "Position: [title]"

    // Your code here:


    echo "\n";
}

// ============================================
// ACTIVITY 4: Associative Array
// ============================================
function activity4()
{
    echo "===== ACTIVITY 4: Employee Information =====\n";

    // TODO: Create an associative array for an employee
    // TODO: Keys: id, name, email, phone
    // TODO: Assign realistic values
    // TODO: Output each key-value pair with labels

    // Your code here:


    echo "\n";
}

// ============================================
// ACTIVITY 5: Array of Employees (Challenge)
// ============================================
function activity5()
{
    echo "===== ACTIVITY 5: Employee Report =====\n";

    // TODO: Create an array of 3 employees
    // TODO: Each employee should have: name, department, salary
    // TODO: Loop through and display each employee's info
    // TODO: Calculate and display total salary spending

    // Your code here:


    echo "\n";
}

// ============================================
// ACTIVITY 6: Form Processing (Challenge)
// ============================================
function activity6_process()
{
    echo "===== ACTIVITY 6: Form Processing =====\n";

    // TODO: Check if form was submitted with if ($_POST)
    // TODO: If submitted:
    //       - Get name from $_POST["name"]
    //       - Get age from $_POST["age"]
    //       - Output: "Hello [name], you are [age] years old"
    // TODO: If NOT submitted:
    //       - Show HTML form with name and age inputs

    // Your code here:


    echo "\n";
}

// TODO: When ready, also create a separate HTML file for the form
// Create form.html in the same directory with an HTML form
// The form should have:
// - method="POST" action="lesson2.php"
// - Input for name
// - Input for age
// - Submit button

?>