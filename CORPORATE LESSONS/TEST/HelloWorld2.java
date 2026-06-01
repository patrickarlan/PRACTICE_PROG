import java.util.ArrayList;

public class HelloWorld2 {

    // METHOD FOR `PRINT` AND SET `VARIABLES` WITH `DATA TYPES`
    public static void varPrint() {
        String name = "World";
        int age = 22;
        double salary = 50000.50;
        boolean isActive = true;

        // Using `formatted string` to print the message
        System.out.println("Hello, %s! You are %d Years old. Your salary is %.2f. Active status: %b.".formatted(name,
                age, salary, isActive));
        // Using `String.format` to print the message
        String message = String.format(
                "Hello, %s! You are %d Years old. Your salary is %.2f. Active status: %b.", name, age, salary,
                isActive);
        System.out.println(message);
        // Using `concatenation` to print the message
        System.out.println("Hello, " + name +
                "! You are " + age +
                " Years old. Your salary is " + salary +
                ". Active status: " + isActive + ".");
    }

    // JAVA CONDITIONALS
    public static void javaConditionals() {

        // IF-ELSE CONDITIONS
        int age = 25;
        if (age >= 18) {
            System.out.println("You are an adult.");
        } else if (age >= 13) {
            System.out.println("You are a teenager.");
        } else {
            System.out.println("You are a child.");
        }

        // IF-ELSEIF CONDITIONS
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 80) {
            System.out.println("Grade B");
        } else if (score >= 70) {
            System.out.println("Grade C");
        } else {
            System.out.println("Grade F");
        }

        // using AND CONDITIONS
        // USE .equals() if comparing strings (JAVA)
        int salary = 50000;
        String department1 = "Engineering";
        if (department1.equals("Engineering") && salary > 45000) {
            System.out.println("Eligible for bonus");
        } else {
            System.out.println("Not Eligble for bonus");
        }

        // SWITCH = can be used to compare 1 variable against many exact values
        String department2 = "Engineering";

        switch (department2) {
            case "Engineering":
                System.out.println("Tech department");
                break;
            case "HR":
                System.out.println("Human Resources");
                break;
            case "Sales":
                System.out.println("Sales Department");
                break;
            default:
                System.out.println("Unknown Department");
        }

    }

    // JAVA LOOPS
    public static void javaLoops() {
        // for loop - how many times
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }

        // while loop - don't know how many times
        int count = 0;
        while (count < 5) {
            System.out.println("Count: " + count);
            count++;
        }

        // for-each loop - loop through arrays
        // String[] - arrays | ":" - "in" or "as" in PHP
        // For each String called name in the employees array
        String[] employees = { "Patrick", "Maria", "Juan", "Rosa" };
        for (String name : employees) {
            System.out.println("Employee: " + name);
        }

        // EXAMPLE with employees array
        double salary = 50000;
        System.out.println("===== MONTHLY PAYROLL =====");
        for (String name : employees) {
            double monthly = salary / 12;
            System.out.println(name + ": $" + monthly);
        }
    }

    // JAVA METHODS - REUSABLE CODE BLOCKS (FUNCTIONS)
    public static double javaMethods(double salary) {
        double bonus = salary * 0.10;
        return bonus;
    }

    public static void javaArrays() {
        // Array of Strings
        String[] employees1 = { "Patrick", "Maria", "Juan", "Rosa" };

        // Access arrays (`index` starts at 0)
        System.out.println(employees1[0]);
        System.out.println(employees1[1]);
        System.out.println(employees1[2]);
        System.out.println(employees1[3]);

        // get array `length`
        int count = employees1.length;
        System.out.println("Total: " + count);

        // Array of numbers
        int[] salaries = { 50000, 55000, 48000, 52000 };

        for (int i = 0; i < salaries.length; i++) {
            System.out.println("Salary " + i + ": $" + salaries[i]);
        }

        // Array of objects (same as multidimensional arrays)
        String[][] employees2 = {
                { "Patrick", "Engineering", "50000" },
                { "Maria", "HR", "45000" },
                { "Juan", "Sales", "48000" },
        };

        for (int i = 0; i < employees2.length; i++) {
            System.out.println("Name: " + employees2[i][0]);
            System.out.println("Department: " + employees2[i][1]);
            System.out.println("Salary: $" + employees2[i][2]);
            System.out.println("---");
        }
        // Array List = expandable array
        // !!! import java.util.ArrayList;

        ArrayList<String> teamMembers = new ArrayList<>();
        teamMembers.add("Patrick");
        teamMembers.add("Maria");
        teamMembers.add("Juan");

        // Access values/items
        System.out.println(teamMembers.get(0)); // Patrick

        // Loop through
        for (String member : teamMembers) {
            System.out.println("Team: " + member);
        }

        // Get size
        // ArrayList uses .size to count items inside (like .length)
        System.out.println("Total: " + teamMembers.size());
    }

    public static void EmployeeReport() {
        String[] names = { "Patrick", "Maria", "Juan", "Rosa" };
        double[] salaries = { 50000, 55000, 48000, 52000 };

        System.out.println("===== EMPLOYEE REPORT =====");

        double total = 0;
        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i] + ": $" + salaries[i]);
            total += salaries[i];
        }

        System.out.println("Total Salary: $" + total);
        System.out.println(
                "Average Salary: $" + (total / names.length));
    }

    public static void main(String[] args) {

        // CALL javaMethods
        double bonus1 = javaMethods(50000);
        double bonus2 = javaMethods(60000);

        System.out.println("Bonus 1: $" + bonus1);
        System.out.println("Bonus 2: $" + bonus2);
    }
}