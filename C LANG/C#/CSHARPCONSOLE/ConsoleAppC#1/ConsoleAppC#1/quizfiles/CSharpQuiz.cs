using MainProgram;

public static class CSharpQuiz
{
    public static void Run()
    {
        int sum = Add();
        Console.WriteLine($"Sum: {sum}");

        static int Add()
        {
            Console.WriteLine("Enter first number:");
            int a = int.Parse(Console.ReadLine()!);
            Console.WriteLine("Enter second number:");
            int b = int.Parse(Console.ReadLine()!);
            return a + b;
        }
    }
}