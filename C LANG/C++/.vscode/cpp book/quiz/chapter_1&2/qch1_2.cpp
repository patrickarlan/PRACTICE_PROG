#include <iostream>
using namespace std;

int prog1(); int prog2(); int prog3(); int prog4(); int prog5();
void space();

int main()
{
    prog3();space();
    return 0;
}

void space()
{
    cout << "---------------------------------------------" << endl;
    return;
}

int prog1()
{

    const int age = 20; /// made int into a const because it gives garbage value
    double height = 5.8;
    char grade = 'A';

    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Grade: " << grade << endl;
    return 0;
}

int prog2()
{
    const double pi = 3.141593;
    double radius = 1.5;
    double area = pi * radius * radius;

    cout << "PI: " << pi << endl;
    cout << "Radius: " << radius << endl;
    cout << "PI * RADIUS * RADIUS " << endl;
    cout << "Area of a circle: " << area << endl;
    return 0;
}

int prog3()
{
    std::string str = "Hello";

    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    cout << "Size of char: " << sizeof(char) << " bytes" << endl;
    cout << "Size of Hello " << sizeof("Hello") << " bytes" << endl;
    std::cout << "String Length = " << str.length() << " characters" << std::endl;
    return 0;
}

int prog4()
{
    int a = 0;
    int b = 5;
    cout << "before assigning a: " << a << endl;
    a = 10;
    cout << "new value of a: " << a << endl;
    cout << "Value of b: " << b << endl;
    cout << "Sum of a + b: " << a + b << endl;
    return 0;
}

int prog5()
{
    int num1, num2;
    num1 = 10;
    num2 = 20;

    int sum = num1 + num2;
    cout << "The sum of " << num1 << " and " << num2 << " is: " << sum << endl;
    return 0;
}