#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int exer1(), exer2(), exer3(), exer5(), exer4(), line();

int main()
{
    // exer1();line();
    exer2();line();
    // exer3();line();
    // exer4();line();
    // exer5();
    return 0;
}

int exer3()
{
    double price;
    int article, number;

    cout << "Enter the article number: ";
    cin >> article;
    cout << "Enter the number of pieces: ";
    cin >> number;
    cout << "Enter the price per piece: ";
    cin >> price;

    cout << "\nARTICLE NUMBER\t\t"
         << "Number of pieces\t"
         << "Price per piece\n";
    cout << fixed << setprecision(2);
    cout << article << "\t\t\t" << number << "\t\t\t$" << price << endl;
    return 0;
}

int exer5()
{
    // A program with resistant mistakes
    char ch;
    string word;

    cin.get(ch);
    cout << "Enter a word containing three characters at most: \n";

    cin.width(4);
    cin >> word;
    ch = word[0]; // Take the first character of the entered word
    cout << "Your input: " << ch << endl;

    return 0;
}

int exer1()
{
    int number = 0;
    cout << "\nEnter a hexadecimal number: "
         << endl;
    cin >> hex >> number; // Input hex-number
    cout << "Your decimal input: " << number << endl;
    // If an invalid input occurred:
    cin.sync();  // Clears the buffer
    cin.clear(); // Reset error flags
    double x1 = 0.0, x2 = 0.0;
    cout << "\nNow enter two floating-point values: "
         << endl;
    cout << "1. number: ";
    cin >> x1; // Read first number
    cout << "2. number: ";
    cin >> x2; // Read second number
    cout << fixed << setprecision(2)
         << "\nThe sum of both numbers: "
         << setw(10) << x1 + x2 << endl;
    cout << "\nThe product of both numbers: "
         << setw(10) << x1 * x2 << endl;
    return 0;
}

int exer4()
{
    char ch;
    int code;

    cout << "Enter a character: ";
    cin >> ch;
    code = ch;
    cout << "Your input: " << ch
        << "\nhas a code: " << code << endl;

    cout << "Code: " << code << endl;
    cout << "octal\t\t"
        << "decimal\t\t"
        << "hex" << endl;

    cout << oct << code << "\t\t" 
        << dec << code << "\t\t" 
        << hex << code << endl;
    return 0;
}

int exer2()
{
//Formulation statements
    float f = 0.123456; // width 15 | left justify 
    float f2 = 23.987; // fixed point number rounded to 2 decimal places  | width 12
    float f3 = 123.456; // as exponential (scientific) w/ 4 decimal spaces. | width 10

    cout << "Part A:" << endl;
    cout << left << setw(15) << f << "|" << endl;

    cout << "Part B:" << endl;
    cout << fixed << setprecision(2) << right << setw(15) << f2 << "|" << endl;

    cout << "Part C:";
    cout << scientific << setprecision(4) << endl;
    cout << "With width 10: |" << setw(10) << f3 << "|" << endl;


    return 0;
}

int line()
{
    cout << string(40, '-') << endl;
    return 0;
}
