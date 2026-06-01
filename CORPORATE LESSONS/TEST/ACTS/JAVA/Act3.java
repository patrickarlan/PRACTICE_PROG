package ACTS.JAVA;

public class Act3 {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.print(i + " ");
        }
        System.out.println("\n--------------------");

        int count = 10;
        while (count >= 1) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println("\n--------------------");

        String[] employees = { "Patrick", "Maria", "Juan", "Rosa" };
        for (String name : employees) {
            System.out.print(name + " ");
        }
    }
}
