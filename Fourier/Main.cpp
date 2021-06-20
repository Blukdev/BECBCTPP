#include "opt.h"
#include "becbct.h" 
#include<iostream>
#include<vector>
#include<string>
#ifdef __linux__
#include<stdlib>
#endif
#ifdef _WIN64
#include<windows.h>
#endif
using namespace std;
TrigonometricFunction TF[10000];
void init(){
	sete.x=10;
	sete.y=4;
	sete.z=10;
}
void Getdata(int &n,char *filename){
	ifstream datain(filename);
	datain>>n;
	for(int i=0;i<n;++i)datain>>TF[i].omega>>TF[i].alpha>>TF[i].fai;
	datain.close();
}
int main(int argc,char *argv[]){
	init();
	char *inputname="set.txt",*outputname="out.mcstructure";
	vector<string>str={"--help","-h","--input","-i","--output","-o"};
	vector<LampOpt::CommandRead>Ret=LampOpt::getopt(argc,argv,str);
	for(int i=0;i<Ret.size();i++)
		if(Ret[i].CommandName=="-h")cout<<"---help---\n--help/-h : Get help\n--input/-i : Set input file,default is set.txt\n--output/-o : Set output file,default is out.mcstructure"; 
		else if(Ret[i].CommandName=="-i")inputname=argv[Ret[i].argvl];
		else if(Ret[i].CommandName=="-o")outputname=argv[Ret[i].argvl];
	int n,types,cb;
	Getdata(n,inputname);
	types=n*2;
	FourierSeriesBuilder(TF,n);
	InitialPhaseFix(TF,n);
	cb=types/2+1;
	vector<int>block_indices;
	block_indices.push_back(0);
	for(int i=1;i<=types-1;i++)block_indices.push_back(1);
	for(int i=1;i<=types;i++)block_indices.push_back(2);
	block_indices.push_back(3);
	for(int i=1;i<=types-1;i++)block_indices.push_back(1);
	for(int i=1;i<=types;i++)block_indices.push_back(2);
	block_indices.push_back(3);
	for(int i=1;i<=cb-1;i++)block_indices.push_back(1);
	for(int i=1;i<=types-cb;i++)block_indices.push_back(2);
	sizes.x=5,sizes.y=1,sizes.z=types;
	SummonCommandBuilder(cb);
	DefultBuilder(block_indices);
	system(("node Doit.js "+string(outputname)).c_str()); 
    return 0;
}
