//This code consists of print, string literal, variables, chars

namespace MainProgram.Basics;

public class Lesson01
{
    public static void Run()
    {
        Lesson01Ex1();
        Lesson01Ex2();
        Lesson01Ex3();
        return;

        static void Lesson01Ex1()
        {
            //student profile task
            string name = "Patrick Arlan";
            int age = 22;
            double GPA = 3.8;
            bool Enrolled = true;

            Console.WriteLine("STUDENT PROFILE");
            Console.WriteLine("_________________");

            Console.WriteLine($"Student: {name}");
            Console.WriteLine($"Age: {age}");
            Console.WriteLine($"GPA: {GPA}");
            Console.WriteLine($"Enrolled: {Enrolled}");
        }

        static void Lesson01Ex2()
        {
            //error fixing
            string studentName = "Alice";
            char grade = 'A';
            double gpa = 4.0;
            char initial = 'B';

            Console.WriteLine("STUDENT PROFILE");
            Console.WriteLine("_________________");

            Console.WriteLine($"Student: {studentName}");
            Console.WriteLine($"Grade: {grade}");
            Console.WriteLine($"GPA: {gpa}");
            Console.WriteLine($"Initial: {initial}");
        }

        static void Lesson01Ex3()
        {
            Console.WriteLine("_________________");
            //challenge task
            var name = "Patrick Arlan";
            var age = 22;
            var address = "123 Main St, Anytown, USA";

            Console.Write(
                "Hello, my name is " + name
                + " and I am " + age
                + " years old."
                + " I am from " + address
            );
        }
    }
}