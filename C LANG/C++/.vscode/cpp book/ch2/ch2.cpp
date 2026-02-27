#include <iostream>
#include <climits>

using namespace std;

void space();
int exer2();
int call();

int gVar1;
int gVar2 = 2;
const double pi = 3.141593;

int main()
{

     call();
     // sample program for intergral types
     cout << "Range of types int and unsigned int: "
          << endl
          << endl;
     cout << "Type           Minimum            Maximum" << endl
          << "---------------------------------------------" << endl;

     cout << "int           " << INT_MIN << "     "
          << INT_MAX << endl;
     cout << "unsigned int " << "      0          "
          << UINT_MAX << endl;
     space();
     // sample program for intergral types
     cout << "Value of 0xFF = " << 0xFF << " decimal"
          << endl;

     cout << "Value of 27 = " << hex << 27 << " hexadecimal" << endl;
     space();

     // sample program for use of variables
     char ch('A');
     cout << "Global variable gVar1 = " << gVar1 << endl;
     cout << "Global variable gVar2 = " << gVar2 << endl;
     cout << "Character in ch: " << ch << endl;

     int sum, number = 3;
     sum = number + 5;
     cout << "Value of Sum = " << sum << endl;
     space();

     // sampe program of const and volatile
     double area, circuit, radius = 1.5;

     area = pi * radius * radius;
     circuit = 2 * pi * radius;

     cout << "\nTo Evaluate a Circle\n"
          << endl;
     cout << "Radius = " << radius << endl;
     cout << "Circumference = " << circuit << endl;
     cout << "Area = " << area << endl;
     space();

     return 0;
}

int call()
{
     exer2();
     exit(0);
}

// spacing between diff programs
void space()
{
     cout << "---------------------------------------------" << endl;
     return;
}

// exercise for chapter 2
int exer2()
{

     // exer1
     cout << "Size of types int, short, long, double and float: "
          << endl
          << endl;
     cout << sizeof(char) << " bytes" << endl;
     cout << sizeof(int) << " bytes" << endl;
     cout << sizeof(short) << " bytes" << endl;
     cout << sizeof(long) << " bytes" << endl;
     cout << sizeof(double) << " bytes" << endl;
     cout << sizeof(float) << " bytes" << endl;
     cout << sizeof(bool) << " bytes" << endl;
     cout << sizeof(long double) << " bytes" << endl;
     space();

     // exer2
     cout << "I" << endl;
     cout << "      " << "RUSH" << endl;
     cout << "            " << "\\TO\\" << endl;
     cout << "      " << "AND" << endl;
     cout << "//FRO//";

     // corrected version of exer2
     cout << "\n\n\t I"          // Instead of tabs
             "\n\n\t\t \"RUSH\"" // you can send the
             "\n\n\t\t\t \\TO\\" // suited number
             "\n\n\t\t AND"      // of blanks to
             "\n\n\t /FRO/"
          << endl; // the output.
     space();

     // exer3 answers:
     // int a(2.5);       // 2.5 is not an integer value
     // const long large; // Without initialization
     // char z(500);      // The value 500 is too large

     // // to fit in a byte

     // int big = 40000; // Attention! On 16-bit systems
     // // int values are <= 32767
     // double he 's(1.2E+5); // The character ' is not
     //     // allowed in names
     //     float val = 12345.12345; // The accuracy of float
     //                              // is only 6 digits

     // exer4
     float x = 123.456;
     float y = 76.543;
     cout << "x = " << x << endl;
     cout << "y = " << y << endl;

     cout << "x + y = " << x + y << endl;
     cout << "x - y = " << x - y << endl;

     return 0;
}