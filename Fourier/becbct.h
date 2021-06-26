#pragma once
#include<cmath>
#include<cstdio>
#include<string>
#include<fstream>
#include<iomanip>
#include<iostream>
#define roundt(x) round(x*100)/100.0
using namespace std;
struct TrigonometricFunction{
    float alpha,omega,fai;
};
struct sizestruct{
	int x,y,z;
}Mainsize,Initialsize,Summonsize,sete;
string ArmorStandNameBuilder(int Num){
    int High=Num/58;
    int Low=Num%58;
    string Name;
    if(High!=0){
    	Name="";
    	Name+=char(High+65);
	Name+=char(Low+65);
    }
    else Name=char(Low+65);
    return Name;
}
void FourierSeriesBuilder(TrigonometricFunction TriFunc[],int n){
    string name,namep,SelectorA,SelectorB;
    ofstream ofs;
    ofs.open("Main.txt");
    for(register int i=0;i<n;++i){
	name=ArmorStandNameBuilder(i);
	namep=ArmorStandNameBuilder(i+1);
        SelectorA="@e[type=armor_stand,name=\""+name+"\"]";
    	SelectorB="@e[type=armor_stand,name=\""+namep+"\"]";
        ofs<<"execute "<<SelectorA<<" ~~~ tp @s ~~~ ~"<<roundt((-1)*TriFunc[i].omega)<<"~"<<"|+";
    	ofs<<"execute "<<SelectorA<<" ~~~ tp "<<SelectorB<<" ^^^"<<roundt(TriFunc[i].alpha)<<(i==n-1?"":"|+");
    }
    ofs.close();
}
void InitialPhaseFix(TrigonometricFunction TriFunc[],int n){
    string name,Selector;
    ofstream ofs;
    ofs.open("Initial.txt");
    for(register int i=0;i<n;++i){
	name=ArmorStandNameBuilder(i);
        Selector="@e[type=armor_stand,name=\""+name+"\"]";
        ofs<<"execute "<<Selector<<" ~~~ tp @s ~~~ 0 0"<<"|+";
        TriFunc[i].fai-=round(TriFunc[i].fai/2/3.14159265358979)*2*3.14159265358979;
        ofs<<"execute "<<Selector<<" ~~~ tp @s ~~~ ~"<<roundt(((-1)*TriFunc[i].fai*180/3.14159265358979))<<"~"<<(i==n-1?"":"|+");
    }
    ofs.close();
}
void SummonCommandBuilder(int cb){
    ofstream ofs;
    ofs.open("Summon.txt");
    for(int i=1;i<=cb;i++)ofs<<"summon armor_stand "+ArmorStandNameBuilder(i-1)+" "+to_string(sete.x)+" "+to_string(sete.y)+" "+to_string(sete.z)<<(i==cb?"":"|+");
    ofs.close();
}
