//This code consists of print, string literal, variables, chars

namespace MainProgram.Basics;

public class Lesson01
{
    // Store and Retrieve Data Using Literal and Variable Values in C#
    public static void Les1_1()
    {
        Lesson01Ex1();
        Lesson01Ex2();
        Lesson01Ex3();

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

    // Perform Basic String Formatting in C#
    public static void Les1_2()
    {

        // Lesson01Ex2();
        // Lesson01Ex3();
        Lesson01Ex4();
        return;
        Practice01 ();
        Practice02 ();

        static void Practice01()
        {
            // Character Esc. Sequences
            Console.WriteLine("Generate sales invoice for \"Patrick\"...\n");
            Console.WriteLine("Invoice: 1021 \t\tComplete!");
            Console.WriteLine("Invoice: 1022 \t\tComplete!");
            Console.Write("\nOutput Directory:\t");
            Console.WriteLine(@"C:\Output\Invoices");

            // Verbatim String
            Console.Write(
                @"This is the
                way"
                );

            // Unicode Esc. Chars
            Console.WriteLine("\n\n\u65e5\u672c\u306e\u8acb\u6c42\u66f8\u3092\u751f\u6210\u3059\u308b\u306b\u306f\uff1a\n\t");

            // String Concatenation
            int value = 4;
            Console.WriteLine($"This is the {value} in the row.");
            
            // String interpolation
            string[] words = { "Apple", "Banana", "Cherry" };

            Console.WriteLine(words[0]);
            Console.WriteLine(words[1]);
            Console.WriteLine(words[2]);
        }

        static void Practice02()
        {
            string projectName = "ACME";
            string russianMessage = "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u0443\u0441\u0441\u043a\u0438\u0439 \u0432\u044b\u0432\u043e\u0434";
            
            Console.WriteLine($@"View English Output:
                c:\Exercise\{projectName}\data.txt");
            
            Console.WriteLine("\n" + russianMessage + ":\n\t" + $@"c:\Exercise\{projectName}\ru-RU\data.txt");

        }

        static void Lesson01Ex2()
        {
            string mission = "MARS EXPLORATION";
            string comm = "\"A. Shepard\"";
            int crew = 3;
            double distance = 225000000;
            bool stat = true;

            string[] notes2 =
            {
                "* Avoid the 'Red Zone' area.\n", 
                "* Unicode Signal: \U0001F680\n"
            };

            Console.WriteLine($"MISSION: {mission} ");
            Console.WriteLine("-------------------------");
            Console.WriteLine($"Commander:\t{comm}");
            Console.WriteLine($"Crew Size:\t{crew}");
            Console.WriteLine($"Distance:\t{distance:N0} km");
            Console.WriteLine($"Status:\t\t{stat}");
            Console.WriteLine("Notes:\n" + @" * Check the \source\logs directory.", "\n");
            Console.WriteLine($" {notes2[0]} {notes2[1]}");
            Console.WriteLine("-------------------------");
        }
        
        static void Lesson01Ex3()
        {
            var mission = "Luna";
            int crew = 2;
            double fuel = 100.5;
            Console.WriteLine($@"Path: C:\missions\{mission}");
        } 

        static void Lesson01Ex4()
        {
            //The Coffee Shop POS
            var item = "Chocolate Muffin";
            int qty = 3;
            var prc = 3.50m;
            var taxR = 0.10m;
            var subT = qty * prc;
            var tax = subT * taxR;
            var tot = subT + tax;

            Console.WriteLine(
                "CAFE RECEIPT\n" +
                "------------\n" +
                $"Item:\t\t{item}\n" +
                $"Quantity:\t{qty}\n" +
                $"Price:\t\t{prc:C}\n\n" +
                $"Subtotal:\t{subT:C}\n" +
                $"Tax:\t\t{tax:C}\n" +
                $"Total:\t\t{tot:C}\n"
            );
                Console.WriteLine("-------------------------");
                
                //BUG HUNTER 3.0
                
                var apples = 5d;
                var oranges = 2d;
                double result = apples / oranges; 
                Console.WriteLine(result);

                //it results in 2 because of the previous usage of int instead of double or decimal
        } 
    }

    public static void Les1_3()
    {
        //Perform basic operations on numbers in C# | Training module by MICROSOFT
        //UNIT 1: Exercise - Perform addition with implicit data conversion

    }
}