<?php

activity1();
activity2();
activity3();
activity4();
activity5();
activity6();
activity7();
activity8();

function activity1()
{
    $employeeId = 1001;
    $firstName = "Patrick";
    $lastName = "Arlan";
    $fullName = $firstName . " " . $lastName;
    $salary = 50000;
    $isActive = true;
    $annualBonus = $salary * 0.10;


    echo "Employee ID: " . $employeeId . "\n";
    echo "First Name: " . $firstName . "\n";
    echo "Last Name: " . $lastName . "\n";
    echo "Full Name: " . $fullName . "\n";
    echo "Salary: $" . number_format($salary, 2) . "\n";
    echo "Is Active: " . ($isActive ? "1" : "0") . "\n";
    echo "Annual Bonus: $" . number_format($annualBonus, 2) . "\n\n";
}

function activity2()
{
    function salDiff($oldSal, $newSal)
    {
        $diff = abs($oldSal - $newSal);
        return $diff;
    }

    function percentInc($oldSal, $newSal)
    {
        if ($oldSal == 0)
            return 0;
        $increase = ($newSal - $oldSal) / $oldSal * 100;
        return $increase;
    }

    $testCases = array(
        array(50000, 55000, "10% increase"),
        array(50000, 51000, "2% increase"),
        array(50000, 50000, "0% increase")
    );

    foreach ($testCases as $test) {
        $old = $test[0];
        $new = $test[1];
        $desc = $test[2];
        $diff = salDiff($old, $new);
        $percentage = percentInc($old, $new);

        echo "Test Case: $desc\n";
        echo "Old salary: $" . number_format($old, 2) . "\n";
        echo "New salary: $" . number_format($new, 2) . "\n";
        echo "Salary difference: $" . number_format($diff, 2) . "\n";
        echo "Salary Increase: " . number_format($percentage, 1) . "%" . "\n";
        if ($percentage >= 5.0) {
            echo "Salary Increased by more than 5%: " . number_format($percentage, 1) . "%" . "\n\n";
        } else {
            echo "Salary percentage: " . number_format($percentage, 1) . "%" . "\n\n";
        }
    }

}

function activity3()
{


    function eligibility($employee)
    {
        if ($employee["worked"] >= 5 && $employee["salary"] >= 50000) {
            $Bonus = 0.15;
            return $Bonus;
        } elseif ($employee["worked"] >= 3 && $employee["salary"] >= 40000) {
            $Bonus = 0.10;
            return $Bonus;
        } elseif ($employee["worked"] >= 1) {
            $Bonus = 0.05;
            return $Bonus;
        } else {
            $Bonus = 0;
            return $Bonus;
        }
    }

    $empl1 = array(
        "name" => "Patrick",
        "worked" => 5,
        "salary" => 50000,
        "bonus" => 0
    );
    $empl2 = array(
        "name" => "Arlan",
        "worked" => 2,
        "salary" => 25000,
        "bonus" => 0
    );
    $empl3 = array(
        "name" => "Brequillo",
        "worked" => 6,
        "salary" => 60000,
        "bonus" => 0
    );

    $empl1["bonus"] = eligibility($empl1);
    $empl2["bonus"] = eligibility($empl2);
    $empl3["bonus"] = eligibility($empl3);

    echo "Employee 1 Bonus: " . number_format($empl1["bonus"] * 100, 1) . "%" . "\n";
    echo "Employee 2 Bonus: " . number_format($empl2["bonus"] * 100, 1) . "%" . "\n";
    echo "Employee 3 Bonus: " . number_format($empl3["bonus"] * 100, 1) . "%" . "\n";
    echo "\n\n";
}

function activity4()
{

    //for loop: count from 1 to 10
    for ($i = 1; $i <= 10; $i++) {
        echo $i . " ";
    }
    echo "\n";

    //while loop: print numbers 20 to 15
    $x = 20; //value of x
    while ($x >= 15) {
        echo $x . " ";
        $x--;
    }
    echo "\n";

    $months = [];
    for ($month = 1; $month <= 12; $month++) {
        $months[] = date("F", mktime(0, 0, 0, $month, 1));
    }


    foreach ($months as $month) {
        echo $month . " ";
    }
    echo "\n";
}

function activity5()
{
    $employees = array(
        array("name" => "Patrick", "dept" => "Engineering", "salary" => 50000),
        array("name" => "Maria", "dept" => "HR", "salary" => 55000),
        array("name" => "Arlan", "dept" => "Engineering", "salary" => 65000),
        array("name" => "Zoom", "dept" => "Engineering", "salary" => 75000),
        array("name" => "Kyla", "dept" => "IT", "salary" => 85000)
    );
    //loop through each employees

    $total = 0;
    foreach ($employees as $emp) {
        echo "Name: " . $emp["name"] . "\n";
        echo "Department: " . $emp["dept"] . "\n";
        echo "Salary: $" . number_format($emp["salary"], 2) . "\n";
        echo "--------------------\n";

        //calculate total salary spending
        $total += $emp["salary"];
    }

    echo "Total Salary Spending: $" . number_format($total, 2) . "\n";

    // Count how many employees are in Engineering
    $engineeringCount = 0;
    foreach ($employees as $emp) {
        if ($emp["dept"] == "Engineering") {
            $engineeringCount++;
        }
    }
    echo "Employees in Engineering: " . $engineeringCount . "\n";

    // Calculate average salary
    $averageSalary = $total / count($employees);
    echo "Average Salary: $" . number_format($averageSalary, 2) . "\n\n";
}

function activity6()
{

    function calculateTax($salary)
    {
        $tax = 0.15;
        $salaryTax = $salary * $tax;
        return $salaryTax;
    }
    function calculateNetSalary($calculatedTax, $totalSalary)
    {
        $calNet = $totalSalary - $calculatedTax;
        return $calNet;
    }

    function formCurrency($amount)
    {
        $amount = "$" . number_format($amount, 2);
        return $amount;
    }

    function isHighEarner($totalSalary)
    {
        return $totalSalary > 60000;
    }

    // Test with multiple inputs
    $testSalaries = array(23000, 50000, 65000, 40000);

    foreach ($testSalaries as $totalSalary) {
        echo "===== Testing Salary: " . formCurrency($totalSalary) . " =====\n";
        $calculatedTax = calculateTax($totalSalary);
        $netSal = calculateNetSalary($calculatedTax, $totalSalary);
        $highEarner = isHighEarner($totalSalary);

        echo "Tax (15%): " . formCurrency($calculatedTax) . "\n";
        echo "Net Salary: " . formCurrency($netSal) . "\n";
        echo "High Earner: " . ($highEarner ? "Yes" : "No") . "\n\n";
    }
}

function activity7()
{


    function calTax($employees, $tax)
    {
        $taxes = array();
        foreach ($employees as $emp) {
            $taxes[] = $emp["gross_salary"] * $tax;
        }
        return $taxes;

    }

    function calNet($employees, $empTax)
    {
        $netSal = array();
        foreach ($employees as $index => $emp) {
            $netSal[] = $emp["gross_salary"] - $empTax[$index];
        }
        return $netSal;
    }
    //calculate Bonus of each employees
    //Engineering = 10% | others = 5%
    function calBon($employees)
    {
        $bonuses = array();
        foreach ($employees as $emp) {
            if ($emp["department"] == "Engineering") {
                $bonuses[] = $emp["gross_salary"] * 0.10;
            } else {
                $bonuses[] = $emp["gross_salary"] * 0.05;
            }
        }
        return $bonuses;
    }

    //printing employees as payslip
    function printPay($employees, $empTax, $minTax, $bonus)
    {
        foreach ($employees as $index => $emp) {
            echo "====== PAYSLIP ======" . "\n";
            echo "Employee ID: " . $emp["id"] . "\n";
            echo "Employee: " . $emp["name"] . "\n";
            echo "Department: " . $emp["department"] . "\n";
            echo "Gross Salary: $" . number_format($emp["gross_salary"], 2) . "\n";
            echo "Tax (15%): $" . number_format($empTax[$index], 2) . "\n";
            echo "Bonus: $" . number_format($bonus[$index], 2) . "\n";
            echo "Net Salary: $" . number_format($minTax[$index], 2) . "\n";
            echo "=====================" . "\n\n";
        }
    }

    //array of employees:
    $employees = array(
        array("id" => 1, "name" => "Patrick", "department" => "Engineering", "gross_salary" => 50000),
        array("id" => 2, "name" => "Arlan", "department" => "Management", "gross_salary" => 40000),
        array("id" => 3, "name" => "Brequillo", "department" => "HR", "gross_salary" => 30000)
    );

    $tax = 0.15;
    $empTax = calTax($employees, $tax);
    $minTax = calNet($employees, $empTax);
    $bonus = calBon($employees);
    printPay($employees, $empTax, $minTax, $bonus);
}

function activity8()
{
    //create an array of 10 employee salaries
    $salaries = array(
        50000,
        30000,
        20000,
        50000,
        24000,
        25000,
        55000,
        60000,
        15000,
        65000
    );

    $total = 0;
    foreach ($salaries as $sal) {
        $total += $sal;
    }

    //calculate which ones are above average
    $average = $total / count($salaries);
    $aboveAverage = 0;
    foreach ($salaries as $sal) {
        if ($sal > $average) {
            $aboveAverage++;
        }
    }

    //count how many are in each range:
    // Below $40,000
    // $40,000 - $50,000
    // $50,000 - $60,000
    // Above $60,000

    $below_40 = 0;
    $range40_50 = 0;
    $range50_60 = 0;
    $above60 = 0;

    foreach ($salaries as $sal) {
        if ($sal > 60000) {
            $above60++;
        } elseif ($sal >= 50000 && $sal <= 60000) {
            $range50_60++;
        } elseif ($sal >= 40000 && $sal <= 50000) {
            $range40_50++;
        } elseif ($sal < 40000) {
            $below_40++;
        }
    }

    echo "Total Employees: " . count($salaries) . "\n";
    echo "Average Salary: " . number_format($average, 2) . "\n";
    echo "Employees above average: " . $aboveAverage . "\n";
    echo "Employees below $40,000: " . $below_40 . "\n";
    echo "Employees between $40,000 and $50,000: " . $range40_50 . "\n";
    echo "Employees between $50,000 and $60,000: " . $range50_60 . "\n";
    echo "Employees above $60,000: " . $above60 . "\n";
}

?>