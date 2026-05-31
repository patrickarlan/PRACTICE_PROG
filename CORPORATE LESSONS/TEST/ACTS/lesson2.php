<?php
echo "<pre>";
// Run all activities
activity1();
activity2();
activity3();
activity4();
activity5();
activity6_process();

echo "<pre>";
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
    $name = "Alice Johnson";
    $position = "Software Engineer";
    $department = "IT";

    echo "Name: $name\n"; // interpolation
    echo "Position: $position\n";
    echo "Department: " . $department . "\n"; // concatenation

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

    function calculateNetSalary($salary, $tax = 0.15)
    {
        $netTax = $salary * $tax;
        $netSal = $salary - $netTax;
        return array(
            "tax" => $netTax,
            "netSal" => $netSal
        );
    }
    $salary = 50000;
    $netSal = calculateNetSalary($salary);

    echo "Tax (15%): $" . number_format($netSal["tax"], 2) . "\n";
    echo "Net Salary: $" . number_format($netSal["netSal"], 2) . "\n";
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
    $employee = array("HR", "ENGR", "IT", "SL", "MNG");
    foreach ($employee as $emp) {
        echo "POSITION: $emp\n";
    }
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

    $employee = array(
        array("id" => 0001, "name" => "Patrick", "email" => "patrick@ex.com", "phone" => "09694831145")
    );

    foreach ($employee as $emp) {
        echo "===== EMPLOYEE DATA =====\n";
        foreach ($emp as $key => $value) {
            echo $key . ": " . $value . "\n";
        }
    }

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
    $total = 0;

    $employee = array(
        array("Name" => "Patrick", "Department" => "Engineering", "Salary" => 50000),
        array("Name" => "Arlan", "Department" => "Human Resource", "Salary" => 40000),
        array("Name" => "MJ", "Department" => "Development", "Salary" => 55000)
    );

    foreach ($employee as $emp) {
        echo "===== EMPLOYEE DATA =====\n";
        foreach ($emp as $key => $value) {
            if ($key == "Salary") {
                echo $key . ": $" . number_format($value, 2) . "\n";
            } else {
                echo $key . ": " . $value . "\n";
            }
        }
        echo "=========================\n";
    }

    foreach ($employee as $emp) {
        $total += $emp["Salary"];
    }
    echo "Total Amount Spending: " . number_format($total, 2) . "\n";

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
    if ($_POST) {
        $name = $_POST["name"];
        $age = $_POST["age"];
        echo "Hello $name, you are $age years old\n";
    } else {
        echo "Please submit the form above. \n";
    }

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