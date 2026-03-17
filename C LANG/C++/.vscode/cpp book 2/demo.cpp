// demo for cpp book 2nd: C++: Beginning C++ Through Game Programming

#include <iostream>
#include <climits>

using namespace std;

int loop();


int main() {
    char bit;
    cout << "Enter a char: ";
    cin >> bit;
    cout << "char" << "\t\tBIT\t\t" << "BYTE" << endl;
    cout << bit << "\t\t" << CHAR_BIT << "\t\t"
         << sizeof(bit)
         << endl;

    cin.clear();
    cin.ignore(1000, '\n');

    string str;
    cout << "Enter a string: ";
    getline(cin, str);
    cout << "string" << "\t\t\tBIT\t\t\t" << "BYTE" << endl;
    cout << left << str << "\t\t\t" << CHAR_BIT * str.size() << "\t\t\t"
         << str.size()
         << endl;
    loop();

    return 0;

}

int loop() {
    char choice;
    bool running = true;
    while(running)
    {
     cout << "Continue? (y/n): ";
     cin >> choice;
     if(choice == 'y' || choice == 'Y')
     {
        main();
     }
     else if(choice == 'n' || choice == 'N')
     {
        running = false;
     }
    }
    return 0;
}

