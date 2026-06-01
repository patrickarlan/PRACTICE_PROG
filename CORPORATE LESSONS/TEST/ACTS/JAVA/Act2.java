package ACTS.JAVA;

public class Act2 {

    public static void main(String[] args) {
        double salary = 55000.00;

        if (salary >= 50000) {
            System.out.println("Salary: $" + salary);
            System.out.println("Bonus: 15%");
        } else if (salary >= 40000) {
            System.out.println("Salary: $" + salary);
            System.out.println("Bonus: 10%");
        } else {
            System.out.println("Salary: $" + salary);
            System.out.println("Bonus: 5%");
        }
    }
}