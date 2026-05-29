<?php
$isActive = true;
$department = "Engineering";
$salary = 50000;
$yearsExperience = 5;

// AND (&&) - ALL conditions must be true
$eligible1 = ($department == "Engineering" && $salary > 45000);
// Is department Engineering? YES. Is salary > 45000? YES. Result: true

$eligible2 = ($department == "Engineering" && $salary < 40000);
// Is department Engineering? YES. Is salary < 40000? NO. Result: false

// OR (||) - AT LEAST ONE condition must be true
$eligible3 = ($department == "HR" || $department == "Engineering");
// Is department HR? NO. Is department Engineering? YES. Result: true

$eligible4 = ($department == "Sales" || $department == "Marketing");
// Is department Sales? NO. Is department Marketing? NO. Result: false

// NOT (!) - Reverses true/false
$inactive = !$isActive;  // If isActive is true, inactive is false

echo "Eligible for bonus (AND): " . ($eligible1 ? "Yes" : "No") . "\n";
echo "Eligible for bonus (AND): " . ($eligible2 ? "Yes" : "No") . "\n";
echo "Eligible for bonus (OR): " . ($eligible3 ? "Yes" : "No") . "\n";
echo "Eligible for bonus (OR): " . ($eligible4 ? "Yes" : "No") . "\n";
echo "Is employee inactive? " . ($inactive ? "Yes" : "No") . "\n";
?>