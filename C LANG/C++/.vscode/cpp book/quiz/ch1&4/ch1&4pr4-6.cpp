//for quiz chapter 1&4 | numbers 4-6: program writing


#include <iostream>
#include <string>
#include <iomanip>
#include <cstdlib>
#include <ctime>

using namespace std;

double circleArea(double rad);
void line(), generateRandom();

int main()
{

    //problem 4
    double rad;
    double area;

    cout << "Enter the radius of the circle: ";
    cin >> rad;
    area = circleArea(rad);

    cout << fixed << setprecision(2) << "The Area is: " << area << endl;
    line();
    
    //problem 5
    int age;
    string name;
    float ht;

    cout << "Enter your name: ";
    cin.ignore(); // Clear the input buffer
    getline(cin, name);
    cout << "Enter your age: ";
    cin >> age;
    cout << "Enter your height: ";
    cin >> ht;

    cout << "User Profile" << endl;
    string line2(25, '-');
    cout << line2 << endl;
    cout <<left << setw(10) << "Name: " << name << endl;
    cout <<left << setw(10) << "Age: " << age << endl;
    cout <<left << setw(10) << "Height: " << ht << endl;

    line();
    //problem 6 = Create a random number generator program that runs until the user exits using while loop
    bool loop = true;
    int seed;
    cout << "Enter a seed value: ";
    cin >> seed;
    srand(time(0) + seed);

    while(loop)
    {
        generateRandom();

        char choice;
        cout << "Generate again? (y/n): ";
        cin >> choice;

        if(choice == 'n')
            loop = false;
    }

    cout << "Thank you!";
    return 0;
}

void generateRandom()
{
    int n1 = rand() % 100;
    int n2 = rand() % 100;
    int n3 = rand() % 100;

    cout << "Random numbers: "
         << n1 << " "
         << n2 << " "
         << n3 << endl;
}

double circleArea(double rad)
{
    const double pi = 3.14159;
    return pi * rad * rad;
}

void line()
{
    string line(50, '-');
    cout << line << endl;
    return;
}