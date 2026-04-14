
class Program
{
    const string space = "-------------------------------------";
    static void Main(string[] args)
    {

        //Program priority
        typeSystem();
        return;

        // Simple C# console application that prints out some information about the author.

        Console.WriteLine("My Name is Patrick");
        Console.WriteLine("I am 22 years old");
        Console.WriteLine("An Aspiring Software Engineer");

        Console.WriteLine(space);

        // Variables and Expressions + Readline
        string? name2;
        string name;
        name = "Patrick";
        Console.WriteLine("Hi " + name + ". Welcome aboard!");
        Console.WriteLine("What is your name?");
        Console.Write("My name is: "); name2 = Console.ReadLine();
        Console.WriteLine("Hello " + name2 + ", nice to meet you!");

        Console.WriteLine(space);

        // Challenge #5
        string? player;
        string state1 = "Who is the bread for?";

        Console.WriteLine("Bread is ready.");
        Console.WriteLine(state1);
        player = Console.ReadLine();
        Console.WriteLine($"Noted: {player} got bread.");

        Console.WriteLine(space);
    }

    static void Challenge6()
    {
        //Challemge #6: The Thing Namer 3000

        // The commented code below needs to be fixed.
        //Console.WriteLine("What kind of thing are we talking about?");
        //string a = Console.ReadLine();
        //Console.WriteLine("How would you describe it? Big? Azure? Tattered?");
        //string b = Console.ReadLine();
        //string c = "of Doom";
        //string d = "3000";
        //Console.WriteLine("The " + b + " " + a + " of " + c + " " + d + "!");

        string c = "of Doom", d = "3000";
        Console.WriteLine("What kind of thing are we talking about?");
        // string a stores first user's input
        string? a = Console.ReadLine();
        Console.WriteLine("How would you describe it? Big? Azure? Tattered?");
        // string b stores second user's input between BIG, AZURE, TATTERED
        string? b = Console.ReadLine();
        Console.WriteLine($"The {b} {a} {d} {c}!");
        Console.WriteLine(space);
    }

    // we use static void to define a method that does not return a value 
    // and can be called without creating an instance of the class.
    static void Variables()
    {
        string? username = Console.ReadLine(), faveColor = Console.ReadLine();
        // ↑ Above is declaring two variables and assigning them values from user input
        Console.WriteLine($"Hi {username}! Your favorite color is {faveColor}.");
        // ↑ Above is responding to the user with a message that includes their name and favorite color

        //Integer variables
        int score = Console.Read() - '0';
        // the '0' → the character input to an integer value, 
        // the "-" → to convert the character to an integer by subtracting the ASCII value of '0' from the input character
        Console.WriteLine($"Your score is: {score}");
    }


    //THE C# TYPE SYSTEM: built-in types or primitive types. 
    static void typeSystem()
    {
        // integer types
        int a = 42;
        uint a2 = 42U;

        long b = 1234567890123456789L;
        ulong b2 = 12345678901234567890UL;

        short c = 32767;
        ushort c2 = 65535;

        byte d = 255;
        sbyte d2 = -127;

        // note: unsigned types (uint, ulong, ushort, byte) 
        // can only represent non-negative values, 
        // while signed types (int, long, short, sbyte) can represent both negative and positive values.





    }

}