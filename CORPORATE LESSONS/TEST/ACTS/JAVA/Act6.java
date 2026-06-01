package ACTS.JAVA;

public class Act6 {

    public static double calculateBonus(double salary, double bonus) {
        // calculate each salaries bonus
        return salary * bonus;
    }

    public static void payrollPrint(String[] employees, double[] salaries, double bonus) {
        double total = 0.0;
        double bonusBudget = 0.0;

        System.out.println("================ Payroll Report ================");
        for (int i = 0; i < employees.length; i++) {
            total += salaries[i];
            bonusBudget += calculateBonus(salaries[i], bonus);
            System.out.println(
                    employees[i] + ": $" +
                            salaries[i] + ", Bonus: $" +
                            calculateBonus(salaries[i], bonus)
                            + ", High Earner: " + (salaries[i] > 60000));
        }
        System.out.println("------------------------------------------------");
        System.out.println("Total Salary: $" + total);
        System.out.println("Total Bonus Budget: $" + bonusBudget);
    }

    public static void main(String[] args) {
        String[] employees = { "Patrick", "Maria", "Juan", "Rosa", "Carlos" };
        double[] salaries = { 55000.00, 62000.00, 48000.00, 75000.00, 53000.00 };
        double bonus = 0.10;
        payrollPrint(employees, salaries, bonus);
    }
}