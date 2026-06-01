Activity 1: Fix Syntax Errors
Given Code (Has 3 Syntax Errors):
```java
public class ErrorFinder {
    public static void main(String[] args) {
        String name = "Patrick"  // Error 1
        int age = 25
        System.out.println("Name: " + name);
        System.out.println(Age: " + age);  // Error 2
    }
}
```
ANSWER
```java
public class ErrorFinder {
    public static void main(String[] args) {
        String name = "Patrick";
        int age = 25;           
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
```

Activity 2: Find Logic Errors
Given Code:
```java
public class BonusCalculator {
    public static void main(String[] args) {
        double salary = 55000;
        
        if (salary > 60000) {
            System.out.println("Bonus: 15%");
        } else if (salary > 50000) {
            System.out.println("Bonus: 10%");
        } else {
            System.out.println("Bonus: 5%");
        }
    }
}
```
ANSWER:
```java
public static void main(String[] args) {
        double salary = 55000;
        
        if (salary >= 55000) {
            System.out.println("Bonus: 15%");
        } else if (salary > 50000) {
            System.out.println("Bonus: 10%");
        } else {
            System.out.println("Bonus: 5%");
        }
    }
```

Activity 3: Runtime Error
Given Code:
```java
public class ArrayPrinter {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        
        for (int i = 0; i <= numbers.length; i++) {
            System.out.println(numbers[i]);
        }
    }
}
```
Problem: Program crashes with ArrayIndexOutOfBoundsException
ANSWER: 
```java
public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        
        for (int i = 0; i < numbers.length; i++) {
            System.out.println(numbers[i]);
        }
    }
```

Activity 4: Complete Debugging Challenge
Given Code (Multiple Errors):

```java
public class EmployeeSystem {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        int[] salaries = {50000, 55000, 48000};
        
        // Loop through employees
        for (int i = 0; i <= names.length; i++) {  // Error 1
            String name = names[i];
            int salary = salaries[i];
            
            if (salary = 50000) {  // Error 2
                System.out.println(name + " gets bonus");
            }
        }
    }
}
```
ANSWER
```java
public class EmployeeSystem {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        int[] salaries = {50000, 55000, 48000};
        
        // Loop through employees
        for (int i = 0; i < names.length; i++) {
            String name = names[i];
            int salary = salaries[i];
            
            if (salary == 50000) { 
                System.out.println(name + " gets bonus");
            }
        }
    }
}
```