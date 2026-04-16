using MainProgram;


public static class CSharpMath
{
    public static void Run()
    {
        Area(); recall();

        static void Area()
        {
            Console.WriteLine("Calculate the area of a rectangle");
            //FORMULA
            int divisor = 2;

            //in this part: the user input is string, then it is checked if it can be
            // parsed into a double. IF IT CAN BE PARSED, USED THE VALUE, else, use 0 as stated in ": 0"
            double rectBase = Console.ReadLine()
                                is string input &&
                                double.TryParse(input, out rectBase) ? rectBase : 0;
            double rectHeight = Console.ReadLine()
                                is string input2 &&
                                double.TryParse(input2, out rectHeight) ? rectHeight : 0;

            var area = rectBase * rectHeight / divisor;
            Console.WriteLine($"Formula: Area = ({rectBase} x {rectHeight}) / 2");
            Console.WriteLine($"The area of the rectangle is: {area}");
        }

        Console.WriteLine("Try Again? (Y/N)");
        var choice = Console.ReadLine();
        if (choice == "Y" || choice == "y") Area();
        else Console.WriteLine("Thank You!");

        static void recall()
        {
            //return to program.cs
            Program.Main(null);
        }
    }
}