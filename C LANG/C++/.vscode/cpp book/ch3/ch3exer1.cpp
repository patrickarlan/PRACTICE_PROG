// Exercise 1
// Create a program to calculate the square roots of the numbers
// 4 12.25 0.0121
// and output them as shown opposite.Then read a number from the keyboard and
// output the square root of this number.
// To calculate the square root, use the function sqrt(), which is defined by the
// following prototype in the math.h (or cmath ) header file:
// double sqrt( double x);
#include <iostream>
#include <cmath>

using namespace std;

int main()
{
    double sqrt1 = sqrt(4), sqrt2 = sqrt(12.25), sqrt3 = sqrt(0.0121);

    cout << " Number\t\tSquare Root" << endl;
    cout << " 4\t\t" << sqrt1 << endl;
    cout << " 12.25\t\t" << sqrt2 << endl;
    cout << " 0.0121\t\t" << sqrt3 << endl;

    cout << " Enter a number: ";
    double num;
    cin >> num;
    double sqrtNum = sqrt(num);
    cout << " The square root of " << num << " is " << sqrtNum << endl;
    return 0;
}