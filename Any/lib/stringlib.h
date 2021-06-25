#pragma once
#include<string>
#include<vector>
#include<cstring> 
using namespace std; 
void Split(const string& s,vector<string>& tokens,const string& delimiters=" "){
    string::size_type lastPos=s.find_first_not_of(delimiters,0);
    string::size_type pos=s.find_first_of(delimiters,lastPos);
    while(string::npos!=pos||string::npos!=lastPos){
        tokens.push_back(s.substr(lastPos,pos-lastPos));
        lastPos=s.find_first_not_of(delimiters,pos);
        pos=s.find_first_of(delimiters,lastPos);
    }
}
bool includes(string str,char target){
	for(int i=0;i<str.size();i++)
		if(str[i]==target)return true;
	return false; 
}
int Number(char number){
	return int(number-'0');
}
int Number(string number){
	return atoi(number.c_str());
}
