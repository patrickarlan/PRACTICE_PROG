#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> names = {"Alice", "Bob", "Charlie", "Diana"};

    cout << "Names in the list:" << endl;
    for (const auto& name : names) {
        cout << name << endl;
    }

    return 0;
}
