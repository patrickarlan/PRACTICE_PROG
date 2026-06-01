// File 2: Printer.java
// This is a HELPER CLASS - it only has printing methods, no main()
// Other files can use these methods to display information
package ACTS.JAVA.JAVAtest;

public class Printer {

    // Print employee information
    public static void printEmployeeInfo(String name, int id, double salary) {
        System.out.println("========== EMPLOYEE INFO ==========");
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: $" + salary);
        System.out.println("==================================");
    }

    // Print salary breakdown
    public static void printSalaryBreakdown(double salary, double bonus, double tax, double net) {
        System.out.println("\n========== SALARY BREAKDOWN ==========");
        System.out.println("Gross Salary: $" + salary);
        System.out.println("Bonus (10%): $" + bonus);
        System.out.println("Tax (15%): $" + tax);
        System.out.println("Net Salary: $" + net);
        System.out.println("=====================================");
    }

    // Print simple header
    public static void printHeader(String title) {
        System.out.println("\n*** " + title + " ***\n");
    }
}
