// File 1: Calculator.java
// This is a HELPER CLASS - it only has methods, no main()
// Other files can use these methods
package ACTS.JAVA.JAVAtest;

public class Calculator {

    // Calculate 10% bonus
    public static double calculateBonus(double salary) {
        return salary * 0.10;
    }

    // Calculate 15% tax
    public static double calculateTax(double salary) {
        return salary * 0.15;
    }

    // Calculate net salary (salary - tax)
    public static double calculateNetSalary(double salary) {
        double tax = calculateTax(salary);
        return salary - tax;
    }
}
