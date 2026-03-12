// PART 5 — Short Coding

// 1️⃣ Write a line of code that prints the number 25 in a field width of 6.

// 2️⃣ Write a statement that prints a floating number with 3 decimal places.

// 3️⃣ Write code that reads a full sentence from the user into a string variable called text.

#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main()
{
    // 1️⃣
    cout  << "\n"
        <<setw(6) << 25 << endl;

    // 2️⃣
    double n = 3.145;
    cout << "This is PI: " << fixed << setprecision(3) << n << endl;

    // 3️⃣
    string text;
    cout << "Enter a full sentence: ";
    getline(cin, text); // Read a full line of input into the string variable 'text'
    cout << "You entered: " << text << endl;
    return 0;
}