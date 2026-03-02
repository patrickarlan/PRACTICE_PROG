// Exercise 2
// The program on the opposite page contains several errors! Correct the errors
// and ensure that the program can be executed.

// A program containing errors!
#include <iostream>
#include <string>
#include <cstdlib>

using namespace std;

int main()
{
    string message = "Learn from your mistakes!";
    cout << message << endl;
    int len = message.length();
    cout << "Length of the string: " << len << endl;
    // And a random number in addition:
    int a, b;
    srand(12);
    a = rand();
    b = a + rand() % 100; // Generate a random number between 0 and 99
    cout << "\nRandom number: " << b << endl;
    return 0;
}