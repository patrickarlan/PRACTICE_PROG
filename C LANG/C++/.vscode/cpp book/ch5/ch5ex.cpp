#include <iostream>
#include <iomanip>
using namespace std;

int testing(), unaryops(), compound();

int main()
{
    // double x, y;
    // cout << "Enter two float val: ";
    // cin >> x >> y;
    // cout << "The average of the two numbers is: "
    //      << (x + y) / 2 << endl;
    // testing();
    // unaryops();
    compound();
    return 0;
}

int testing()
{
    double w, z;
    cout << "Enter two decimal/whole values: ";

    cin.clear();
    cin.ignore();

    cin >> w >> z;
    cout << "The numbers " << w << " and " << z << " have an output of: " << endl;
    cout << "mul = " << w * z << endl;
    cout << "div = " << w / z << " remainder = " << static_cast<int>(w) % static_cast<int>(z) << endl;
    cout << "add = " << w + z << endl;
    cout << "sub = " << w - z << endl;
    return 0;
}

int unaryops()
{
    int i(2), j(8);
    cout << i++ << endl;
    cout << i << endl;
    cout << j-- << endl;
    cout << --j << endl;
    return 0;
}

int compound()
{
    float x, y;
    cout << "\n Please enter a starting value: ";
    cin >> x;
    cout << "\n Please enter the increment value: ";
    cin >> y;
    x += y;
    cout << "\n And now multiplication! ";
    cout << "\n Please enter a factor: ";
    cin >> y;
    x *= y;
    cout << "\n Finally division.";
    cout << "\n Please supply a divisor: ";
    cin >> y;
    x /= y;
    cout << "\n And this is "
         << "your current lucky number: "

         // without digits after
         // the decimal point:

         << fixed << setprecision(0)
         << x << endl;
    return 0;
}