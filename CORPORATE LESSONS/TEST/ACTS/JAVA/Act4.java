package ACTS.JAVA;

public class Act4 {

    public static double calculateTax(double salary) {
        return salary * 0.15;
    }

    public static double calculateNetSal(double salary) {
        return salary - calculateTax(salary);
    }

    public static boolean isHighEarner(double salary) {
        return salary > 60000;
    }

    public static void main(String[] args) {

        double salary = 75000.00;
        double calTax = calculateTax(salary);
        double netSal = calculateNetSal(salary);
        boolean highEarner = isHighEarner(salary);

        System.out.println("Gross: $" + salary);
        System.out.println("Tax: $" + calTax);
        System.out.println("Net Salary: $" + netSal);
        System.out.println("Is High Earner: " + highEarner);
    }
}