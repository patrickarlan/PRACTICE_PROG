# Lesson 01: Exercise 2 - Space Mission Briefing

In this exercise, you will act as a Mission Controller. You need to format a "Mission Briefing" that will be sent to astronauts. 

## The Task
Create a new method (e.g., `Practice03`) and display a mission briefing that looks exactly like this in the terminal:

```text
MISSION: MARS EXPLORATION
-------------------------
Commander:	"A. Shepard"
Crew Size:	3
Distance:	225,000,000 km
Status:		Ready for Launch [True]

Notes:
  * Check the \source\logs directory.
  * Avoid the 'Red Zone' area.
  * Unicode Signal: 🚀 (Use: \U0001F680)
```

## Requirements:
1.  **Variables**: 
    *   A `string` for the Mission Name.
    *   A `string` for the Commander (must include the double quotes in the output).
    *   An `int` for Crew Size.
    *   A `double` or `long` for Distance.
    *   A `bool` for Status.
2.  **Formatting**:
    *   Use **Tabs (`\t`)** to align the labels (Commander, Crew Size, etc.).
    *   Use a **Verbatim String (`@`)** or **Escape Sequence** for the directory path `\source\logs`.
    *   Use **String Interpolation (`$`)** to insert your variables into the output.
    *   Use **Unicode** for the Rocket emoji.

---

## Bug Hunter 2.0
Can you spot the errors in this snippet?

```csharp
var mission = "Luna";
char crew = 2;
double fuel = 100,5;
Console.WriteLine(@"Path: C:\missions\" + {mission});
```

> [!TIP]
> Remember the difference between `char` and `int`, and how to combine `@` with `{}`!

---

---

## Part 3: The Coffee Shop POS
Now that you can format text, let's do some math! You are building a system for a small cafe.

**The Task:**
Create a new method (e.g., `Practice04`) that calculates and prints a customer's receipt.

**Data to use:**
*   **Item**: "Chocolate Muffin"
*   **Quantity**: 3
*   **Price**: 3.50 (Use `decimal`)
*   **Tax Rate**: 0.10 (Representing 10%)

**Desired Output:**
```text
CAFE RECEIPT
------------
Item:     Chocolate Muffin
Quantity: 3
Price:    ₱3.50

Subtotal: ₱10.50
Tax:      ₱1.05
Total:    ₱11.55
```

**Requirements:**
1.  Use the `decimal` type for all money values (remember the `m` suffix!).
2.  Use **String Interpolation** and the **`:C`** format specifier for all money outputs.
3.  Calculate the `Subtotal` (Quantity * Price) and the `Tax` (Subtotal * TaxRate) inside your code.

---

## Bug Hunter 3.0
Can you find the math error here?

```csharp
int apples = 5;
int oranges = 2;
double result = apples / oranges; 

Console.WriteLine(result); // Why does this print 2 instead of 2.5?
```

> [!TIP]
> This is a classic C# "gotcha" called **Integer Division**. 

---

**Have fun with the math! Let me know if you want a hint on how to fix that Bug Hunter 3.0 problem.**
