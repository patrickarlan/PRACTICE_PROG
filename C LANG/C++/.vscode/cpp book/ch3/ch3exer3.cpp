// Exercise 3
// Create a C++ program that defines a string containing the following character
// sequence:
// (I have learned something new again!)
// and displays the length of the string on screen.
// Read two lines of text from the keyboard. Concatenate the strings using " * "
// to separate the two parts of the string. Output the new string on screen.

#include <iostream>
#include <string>

using namespace std;

int main()
{
    string message = "I have learned something new again!";
    cout << message << endl;
    cout << "Length of the String: " << message.length() << endl;

    string line1, line2;
    cout << "Enter the first line of text: ";
    getline(cin, line1);
    cout << "Enter the second line of text: ";
    getline(cin, line2);
    string ccted = line1 + " * " + line2;
    cout << "Concatenated String: " << ccted << endl;
    return 0;

}