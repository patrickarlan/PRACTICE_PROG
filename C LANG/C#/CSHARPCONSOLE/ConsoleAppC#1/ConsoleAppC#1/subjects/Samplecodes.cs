using System;
using MainProgram;
public static class SampleProgram
{
    const string space = "-------------------------------------";
    public static void Run()
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

        // floating-point & double types & decimal type & scientific notation
        float e = 3.14f;
        double e2 = 3.14;
        decimal e3 = 3.14m;
        double e4 = 1.23e-4; // scientific notation

        //string and char types
        string f = "Alice";
        char f2 = 'A';
        char f3 = '\u0061'; // Unicode escape sequence for 'a'

        //boolean type
        bool g = true;
        bool g2 = false;

        //data in binary
        int h = 0b101010; // "b" binary literal for 42
        int i = 0x2A; // "x" hexadecimal literal for 42

        //Print in category
        Console.WriteLine($"Integer Types: {a}, {a2}, {b}, {b2}, {c}, {c2}, {d}, {d2}");
        Console.WriteLine($"Floating-Point Types: {e}, {e2}, {e3}, {e4}");
        Console.WriteLine($"String and Char Types: {f}, {f2}, {f3}");
        Console.WriteLine($"Boolean Types: {g}, {g2}");
        Console.WriteLine($"Binary and Hexadecimal: {h}, {i}");
        Console.WriteLine(space);

        // - Modify your Variable Shop program to assign a new, different literal value to each of the 14 original
        // variables.Do not declare any additional variables.
        // - Use Console.WriteLine to display the updated contents of each variable.

        a = 100; a2 = 100U;
        b = 987654321012345678L; b2 = 9876543210123456789UL;
        c = -32768; c2 = 0;
        d = 128; d2 = 127;
        e = 2.718f; e2 = 2.718; e3 = 2.718m; e4 = 5.67e-8;
        f = "Bob"; f2 = 'B'; f3 = '\u0062';
        g = false; g2 = true;
        h = 0b111111; i = 0xFF;
        Console.WriteLine($"Updated Integer Types: {a}, {a2}, {b}, {b2}, {c}, {c2}, {d}, {d2}");
        Console.WriteLine($"Updated Floating-Point Types: {e}, {e2}, {e3}, {e4}");
        Console.WriteLine($"Updated String and Char Types: {f}, {f2}, {f3}");
        Console.WriteLine($"Updated Boolean Types: {g}, {g2}");
        Console.WriteLine($"Updated Binary and Hexadecimal: {h}, {i}");
        Console.WriteLine(space);

        //using var for var inference
        var j = 42; // inferred as int
        var k = 3.14; // inferred as double
        var l = "Hello"; // inferred as string
        var t = true; // inferred as bool   
        Console.WriteLine($"Var Inference: {j} (type: {j.GetType()}), {k} (type: {k.GetType()}), {l} (type: {l.GetType()}), {t} (type: {t.GetType()})");
        Console.WriteLine(space);

        //using Convert class and parse method

        Console.WriteLine("Enter a number to convert:");
        string? userInp = Console.ReadLine();
        int userInp2 = Convert.ToInt32(userInp);
        // ↑ ToInt32 instead of ToInt64 because we want to convert to int, not long

        string money = "99.99";
        double moneyDouble = Convert.ToDouble(money);
        Console.WriteLine($"Original money: {money} | Converted Money: {moneyDouble}");

        string isActive = "true";
        bool status = Convert.ToBoolean(isActive);
        Console.WriteLine($"Original Stat: {isActive} | Converted Stat: {status}");
    }
}