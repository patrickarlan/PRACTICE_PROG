//Main program file for ConsoleAppC#1

using System;

namespace MainProgram
{
    public static class Program
    {
        public static void Main(string[]? args)
        {
            Console.WriteLine("Choose folder: 1. Subjects 2. quizfiles 3. samplecodes 0. Exit");
            var choice = Console.ReadLine();
            if (choice == "1") CSharpDataTypes.Run();
            else if (choice == "2") CSharpQuiz.Run();
            else if (choice == "3") SampleProgram.Run();
            else if (choice == "0") return;
        }
    }
}