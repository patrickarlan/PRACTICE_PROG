//Fix the program so it correctly reads a full name and prints it with its length.
// quiz chapter 1&4 | numbers 1-3: error fixing
#include <iostream>
#include <string>
#include <iomanip>
#include <cmath>
using namespace std;

void line();
int square(int x);

int main()
{
//problem 1
string name;
cout << "Enter your full name: ";
getline(cin, name);
cout << "Hello " << name << endl;
int len = name.length();
cout << "Your name has " << len << " characters." << endl;

line();

//problem 2
int x;
int square(int x);
cout << "Enter a number: ";
cin >> x;
cout << "Square = " << square(x) << endl;

line();

//problem 3
int a = 5;
int b = 8;
cout << setw(10) << "Number" << setw(10) << "Square" << endl;
cout << "--------------------" << endl;
cout << setw(10) << a << setw(10) << a * a << endl;
cout << setw(10) << b << setw(10) << b * b << endl;
return 0;
}

int square(int x)
{ return x * x; }

void line()
{
    string line(50, '-');
    cout << line << endl;
    return;
}