// File 3: Main.java
// This is the MAIN PROGRAM
// It CALLS methods from Calculator.java and Printer.java
// This is where the program starts (has main method)
package ACTS.JAVA.JAVAtest;

public class Main {
    public static void main(String[] args) {
        // Print header using Printer class
        Printer.printHeader("PAYROLL SYSTEM - LESSON 4.7");

        // Employee data
        String empName = "Patrick";
        int empId = 1001;
        double empSalary = 50000;

        // Print employee info using Printer class
        Printer.printEmployeeInfo(empName, empId, empSalary);

        // Calculate values using Calculator class
        double bonus = Calculator.calculateBonus(empSalary);
        double tax = Calculator.calculateTax(empSalary);
        double netSalary = Calculator.calculateNetSalary(empSalary);

        // Print salary breakdown using Printer class
        Printer.printSalaryBreakdown(empSalary, bonus, tax, netSalary);

        System.out.println("\n✅ Program completed successfully!");
    }
}
