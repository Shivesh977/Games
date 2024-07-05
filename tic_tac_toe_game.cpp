#include<bits/stdc++.h>
using namespace std;
void push(vector<vector<char>>&v){
    for(int i=0;i<3;i++){
        vector<char>c;
        for(int j=0;j<3;j++){
            char ch=' ';
            c.push_back(ch);
        }
        v.push_back(c);
    }
}
void display(vector<vector<char>>&v){
for(int i=0;i<3;i++){
    for(int j=0;j<3;j++){
        cout<<"  "<<v[i][j]<<"   ";
        if(j<2)cout<<"|";
    }
    cout<<endl;
    for(int a=0;a<11;a++) if(i<2)cout<<"--";
    cout<<endl;
}
}
bool check(vector<vector<char>>&v,char ch){
    bool a=false;
    bool b=false;
    bool c=false;
    bool d=false;
    bool e=false;
    bool f=false;
    bool g=false;
    bool h=false;
    if (v[0][0]==ch){
        if(v[0][0]==v[0][1] && v[0][1]==v[0][2]) a=true;
    }
    if (v[1][0]==ch){
        if(v[1][0]==v[1][1] && v[1][1]==v[1][2]) b=true;
    }
      if  (v[2][0]==ch){
        if(v[2][0]==v[2][1] && v[2][1]==v[2][2]) c=true;
    }
      if (v[0][0]==ch){
        if(v[0][0]==v[1][0] && v[1][0]==v[2][0]) d=true;
    }
      if (v[0][1]==ch){
        if(v[0][1]==v[1][1] && v[1][1]==v[2][1]) e=true;
    }
     if (v[0][2]==ch){
        if(v[0][2]==v[1][2] && v[1][2]==v[2][2]) f=true;
    }
    if(v[0][0]==ch)if(v[0][0]==v[1][1] && v[1][1]==v[2][2]) g=true;
    if(v[0][2]==ch)if(v[0][2]==v[1][1] && v[1][1]==v[2][0]) h=true;
    if(a||b||c||d||e||f||g||h) return true;
    else return false;
}
void demo(){
    for(int i=0;i<3;i++){
    for(int j=0;j<3;j++){
        cout<<"  "<<i<<" "<<j<<"   ";
        if(j<2)cout<<"|";
    }
    cout<<endl;
    for(int a=0;a<11;a++) if(i<2)cout<<"--";
    cout<<endl;
}
}
int main(){
    cout<<"\n"<<"\n";
    vector<vector<char>>v;
    push(v);
    string a;
    cout<<"Enter your name player 1 : ";
    getline(cin,a);
    string b;
    cout<<"Enter your name player 2 :  ";
    getline(cin,b);
    cout<<"\n The coordinates are as follows \n\n";
    demo();
    cout<<"\n";
    cout<<"\nLETS START THE GAME \n\n";
    display(v);
    int c=0;
    while(c<9){
        cout<<a<<" play your move,enter the coordinates where u want to draw 'X' : ";
        int d;
        cin>>d;
        int e;
        cin>>e;
        v[d][e]='X';
        display(v);
        if(c>3) if(check(v,'X')) break; 
        c++;
        if(c<9){cout<<b<<" play your move,enter the coordinates where u want to draw 'O' : ";
        int f;
        cin>>f;
        int g;
        cin>>g;
        v[f][g]='O';
        display(v);
        if(c>3) if(check(v,'O')) break; 
        }
        c++;
    }
bool m=check(v,'X');
bool n=check(v,'O');
if(m) cout<<a<<" Won the match ";
else if(n)  cout<<b<<" Won the match ";
else cout<<"OOPS neither "<<a<<" nor "<<b<<" won the match "<<" it was a draw match \n";
}