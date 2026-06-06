using System;

class Practice
{
    public static void Run(string[] args)
    {

        Random random = new Random();
        int monster = 100, player = 100;

        Console.WriteLine("Welcome to the battle!");
        System.Threading.Thread.Sleep(1000);
        Console.WriteLine($"Player HP: {player}, Monster HP: {monster}");
        System.Threading.Thread.Sleep(1000);
        Console.WriteLine("Input A to attack!");
        System.Threading.Thread.Sleep(1000);
        Console.WriteLine("Rolling to see who goes first...");
        System.Threading.Thread.Sleep(1000);

        //RANDOM TURN
        bool turn = random.Next(0, 2) == 0; // true for player, false for monster
        Console.WriteLine($"Turn: {(turn ? "Player" : "Monster")}");
        System.Threading.Thread.Sleep(1000);

        do
        {
            if (turn)
            {
                Console.WriteLine("\nYour Turn! Press A to attack | Press L to roll random heal (1-100 HP)");
                string? input = Console.ReadLine();

                if (input?.ToUpper() != "A" && input?.ToUpper() != "L")
                {
                    Console.WriteLine("Invalid input! Please press A to attack or L to heal.");
                    continue;
                }

                if (input?.ToUpper() == "L")
                {
                    int heal = random.Next(1, 101);
                    Console.WriteLine($"Player heals for {heal} HP!");
                    player += heal;
                    System.Threading.Thread.Sleep(1000);
                    Console.WriteLine($"Player HP: {player}");
                    System.Threading.Thread.Sleep(3000);
                }
                else
                {
                    int attack = random.Next(1, 51);
                    Console.WriteLine($"Player rolls {attack} damage!");
                    monster -= attack;
                    System.Threading.Thread.Sleep(1000);
                    Console.WriteLine($"Monster HP: {monster}");
                    System.Threading.Thread.Sleep(3000);
                }
            }
            else
            {
                Console.WriteLine("\nMonster's Turn!");
                System.Threading.Thread.Sleep(3000);
                bool monsterHeals = random.Next(0, 2) == 0;

                if (monsterHeals)
                {
                    int heal = random.Next(1, 101);
                    Console.WriteLine($"Monster heals for {heal} HP!");
                    monster += heal;
                    System.Threading.Thread.Sleep(1000);
                    Console.WriteLine($"Monster HP: {monster}");
                    System.Threading.Thread.Sleep(3000);
                }
                else
                {
                    int attack = random.Next(1, 51);
                    Console.WriteLine($"Monster rolls {attack} damage!");
                    player -= attack;
                    System.Threading.Thread.Sleep(1000);
                    Console.WriteLine($"Player HP: {player}");
                    System.Threading.Thread.Sleep(3000);
                }

                System.Threading.Thread.Sleep(1000);
            }

            if (player <= 0)
            {
                Console.WriteLine("\nYou have been defeated! Game Over.");
                break;
            }
            else if (monster <= 0)
            {
                Console.WriteLine("\nCongratulations! You defeated the monster!");
                break;
            }

            turn = !turn;
        } while (player > 0 && monster > 0);
    }
}