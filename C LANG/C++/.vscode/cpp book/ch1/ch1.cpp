//exercise 1

#include <iostream>
using namespace std;

void pause(); void exer2(); void exer3(); void br();

int main()
{
    cout << "Oh what"
        << endl << "a happy day"; 
        pause();

    cout << "Oh yes,"
        << endl << "what a happy day"; 
        pause();

    cout << "----------------" << endl;
    exer2();
    cout << "----------------" << endl;
    exer3();
    return 0;
}

void pause()
{
    cout << "!" << endl;
}


//exercise 2

/* Now you should not forget your glasses*/
// #include <iostream>
// using namespace std;
void exer2()
{
    cout << "If this text"
    << endl << "appears on your display,"
    << endl << "you can pat yourself on the back!" << endl;
}

//exercise 3

void exer3()
{
    cout << "Dear reader, "
        << endl << "have a ";
    br();

    cout << "!" << endl;
}

void br()
{
    cout << "BREAK";
}
