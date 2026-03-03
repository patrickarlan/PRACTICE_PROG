#include <iostream>
#include <cstring>
#include <cstdlib>

using namespace std;

int exer1(), exer2(), exer3(), line();

int main()
{
    exer1();
    line();
    exer2();
    line();
    exer3();
    return 0;
}

int exer1()
{
    char getGrade(int score);
    {
        int score;
        cout << "Enter your score: ";
        cin >> score;

        if (score >= 90)
            return 'A';
        else if (score >= 80)
            return 'B';
        else if (score >= 70)
            return 'C';
        else if (score >= 60)
            return 'D';
        else
            return 'F';

        char grade = getGrade(score);
        cout << "Your grade is: " << grade << endl;

        return 0;
    }
}

int exer2()
{

    string name, last;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Enter your last name: ";
    cin >> last;

    string full = name + " " + last;
    cout << "Your full name is: " << full << endl;
    return 0;
}

int exer3()
{
    unsigned int seed;
    int n1;

    cout << "Enter a seed value: ";
    cin >> seed;
    srand(time(0) + seed);

    n1 = rand() % 50;
    cout << "Random number: " << n1 << endl;
    return 0;
}

int line()
{
    cout << string(40, '-') << endl;
    return 0;
}