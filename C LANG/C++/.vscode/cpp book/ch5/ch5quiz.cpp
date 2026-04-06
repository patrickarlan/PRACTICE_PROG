// Exercise 1
// What values do the following arithmetic expressions have?
// a. 3/10
// b. 11%4
// c. 15/2.0
// d. 3 + 4 % 5
// e. 3 * 7 % 4
// f. 7 % 4 * 3

// Exercise 2
// a. How are operands and operators in the following expression associated?
// x = –4 * i++ – 6 % 4;
// Insert parentheses to form equivalent expressions.
// b. What value will be assigned in part a to the variable x if the variable i has a
// value of –2?

// Exercise 3
// The int variable x contains the number 7. Calculate the value of the following
// logical expressions:
// a. x < 10 && x >= –1 == 7 < 10 && 7 >= -1 = true && true = true
// b. !x && x >= 3 == x is 7 and true since non-zero but !x is false; && 8 is greater than 3,
// so true but since x is 7, 7 >= 3 is true = false
// c. x++ == 8 || x == 7 = 7 becomes 8 so true || since x is 8 therefore  8 = 7 is false.
// but since the first part is true then the whole expression is true.

// Exercise 4
// What screen output does the program on the opposite page generate?
// = Result of (7 || (y = 0)): true
// Value of y: 5

//  res = true, a = 1, b = 0, c = 0
//  res = true, a = 1, b = 1, c = 0

// Exercise 4 program
// Evaluating operands in logical expressions.

#include <iostream>
using namespace std;

int ex1(), ex2(), ex3();

int main()
{
    cout << boolalpha; // Outputs boolean values
    // as true or false

    bool res = false;
    int y = 5;
    res = 7 || (y = 0);
    cout << "Result of (7 || (y = 0)): " << res
         << endl;
    cout << "Value of y: " << y << endl;
    int a, b, c;
    a = b = c = 0;
    res = ++a || (++b && ++c);
    cout << '\n'
         << " res = " << res
         << ", a = " << a
         << ", b = " << b
         << ", c = " << c << endl;
    a = b = c = 0;
    res = (++a && ++b) || ++c;

    cout << " res = " << res
         << ", a = " << a
         << ", b = " << b
         << ", c = " << c << endl;
    return 0;
}

int ex1()
{
    cout << "a. 3/10 = " << 3 / 10 << endl;
    cout << "b. 11%4 = " << 11 % 4 << endl;
    cout << "c. 15/2.0 = " << 15 / 2.0 << endl;
    cout << "d. 3 + 4 % 5 = " << 3 + 4 % 5 << endl;
    cout << "e. 3 * 7 % 4 = " << 3 * 7 % 4 << endl;
    cout << "f. 7 % 4 * 3 = " << 7 % 4 * 3 << endl;
    return 0;
}

int ex2()
{
    // part b
    int i = -2;
    int x = -4 * i++ - 6 % 4;
    cout << "The value of x is: " << x << endl;
    return 0;
}

int ex3()
{
    // part c
    int x = 7;
    bool res = x++ == 8 || x == 7;
    cout << "Result of (x++ == 8 || x == 7): " << res << endl;
    cout << "Value of x: " << x << endl;
    return 0;
}
