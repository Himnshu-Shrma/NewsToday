#include <iostream>

using namespace std;


int main() {
    // Complete the code.
    int a,b;
    cin>>a;
    cin>>b;
    for(int i=a;i>=b;i++){
        if(i<9){
        switch (i) {
          case 1:        
          cout<<"one";
          case 2:        
          cout<<"Two";
          case 3:        
          cout<<"Three";
          case 4:        
          cout<<"four";
          case 5:        
          cout<<"five";
          case 6:        
          cout<<"six";
          case 7:        
          cout<<"seven";
          case 8:        
          cout<<"eight";
         
        }
    }
        else{
        if(i%2==0){
            cout<<"even";
        }
        else{
            cout<<"odd";
        }
    }
    }
    return 0;
}

