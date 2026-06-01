package ACTS.JAVA;

public class Act5 {
    public static void main(String[] args) {
        String[] employees = { "Patrick", "Maria", "Juan", "Rosa", "Carlos" };
        double[] salaries = { 55000.00, 62000.00, 48000.00, 75000.00, 53000.00 };
        double total = 0;
        double totalAve = 0;
        for (int i = 0; i < employees.length; i++) {
            System.out.println(employees[i] + ": $" + salaries[i]);
            total += salaries[i];
            totalAve += salaries[i] / employees.length;
        }
        System.out.println("Total Salary: $" + total);
        System.out.println("Average Salary: $" + totalAve);
    }
}