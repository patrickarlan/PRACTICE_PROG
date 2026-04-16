//Main program file for ConsoleAppC#1

using System;

namespace MainProgram
{
    public static class Program
    {
        public static void Main(string[]? args)
        {
            Console.WriteLine("Choose folder: \n 1. Subjects \n 2. quizfiles \n 3. samplecodes \n 4. Math \n 0. Exit");
            var choice = Console.ReadLine();
            if (choice == "1") CSharpDataTypes.Run();
            else if (choice == "2") CSharpQuiz.Run();
            else if (choice == "3") SampleProgram.Run();
            else if (choice == "4") CSharpMath.Run();
            else if (choice == "0") return;
        }
    }
}