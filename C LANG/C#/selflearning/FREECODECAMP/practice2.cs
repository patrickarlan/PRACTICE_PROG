using System;

class Practice2
{
    public static void Run(String[] args)
    {
        // CONDITONAL OPERATOR
        // DISPLAY THE RESULT OF A COIN FLIP
        string? user;
        do
        {
            Random random = new Random();
            int flip = random.Next(0, 2);
            string HEAD = "HEAD", TAILS = "TAILS";
            Console.WriteLine($"The coin is: {(flip == 1 ? HEAD : TAILS)}");
            Console.Write("Do you want to try again? Y | N: ");
            user = Console.ReadLine();
        } while (user?.ToUpper() == "Y");

        Console.WriteLine("-----------------------");

        // Business Rules
        string permission = "Admin | Manager";

        Console.WriteLine("What is your role? Admin || Manager: ");
        string? user2 = Console.ReadLine();
        if (user2 != null && (user2.ToUpper() == "ADMIN" || user2.ToUpper() == "MANAGER"))
            permission = user2;
        else
        {
            Console.WriteLine("You do not have sufficient privileges.");
            return;
        }

        Console.WriteLine("What is your level? 0 to 60: ");
        int level = int.Parse(Console.ReadLine() ?? "0");

        //start of the main loop
        if (permission.Contains("Admin") && level > 55)
            Console.WriteLine("Welcome, Super Admin user.");
        else if (permission.Contains("Admin") && level >= 55)
            Console.WriteLine("Welcome, Admin user.");
        else if (permission.Contains("Manager") && level > 20)
            Console.WriteLine("Contact an Admin for access");
        else if (permission.Contains("Manager") && level < 20)
            Console.WriteLine("You do not have sufficient privileges.");

    }
}