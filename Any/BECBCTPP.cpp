#include<iostream>
#include<cstdio>
#include<fstream>
#include "lib/jsonxx/json.hpp"
#include "lib/ctf.h"
#include "lib/opt.h"
#include "lib/stringlib.h"
using namespace std;
string GetAllData(char *FileName){
	ifstream JsonIn(FileName); 
	string result((istreambuf_iterator<char>(JsonIn)),istreambuf_iterator<char>());
	return result;
}
int main(int argc,char *argv[]){
	char *InputName="set.json",*OutPutName="Out";
	vector<string>str={"--help","-h","--input","-i","--output","-o"};
	vector<LampOpt::CommandRead>Ret=LampOpt::getopt(argc,argv,str);
	for(int i=0;i<Ret.size();i++)
		if(Ret[i].CommandName=="-h")cout<<"---help---\n--help/-h : Get help\n--input/-i : Set input file,default is set.txt\n--output/-o : Set output file,default is out.mcstructure"; 
		else if(Ret[i].CommandName=="-i")InputName=argv[Ret[i].argvl];
		else if(Ret[i].CommandName=="-o")OutPutName=argv[Ret[i].argvl];
	string JSONContent=GetAllData(InputName);
	string RcbContent=GetAllData("./jsonlib/Rcb.json");
	string NcbContent=GetAllData("./jsonlib/Ncb.json");
	string BlockContent=GetAllData("./jsonlib/Block.json");
	jsonxx::json MainPackage=jsonxx::json::parse(JSONContent);
	jsonxx::json RcbPackage=jsonxx::json::parse(RcbContent);
	jsonxx::json NcbPackage=jsonxx::json::parse(NcbContent);
	jsonxx::json BlockPackage=jsonxx::json::parse(BlockContent);
	int Chains=(int)MainPackage["Chains"];
	ofstream ConfigFileOut;
	ConfigFileOut.open("Config.txt");
	for(int i=1;i<=Chains;i++){
		string Position=to_string(i);
		int Lenth=(int)MainPackage["Define"][Position]["Lenth"];
		string FileName=(string)MainPackage["Define"][Position]["Name"];
		string FirstCommandType=(string)MainPackage["Define"][Position]["FirstCommandType"];
		if(i==Chains)ConfigFileOut<<FileName<<".json";
		else ConfigFileOut<<FileName<<".json ";
		Node BI=SummonBI(Lenth);
		jsonxx::json CBPackage=FirstCommandType=="rcb"?RcbPackage:NcbPackage;
		CBPackage["value"]["size"]["value"]["value"][0]=BI.size.x;
		CBPackage["value"]["size"]["value"]["value"][1]=BI.size.y;
		CBPackage["value"]["size"]["value"]["value"][2]=BI.size.z;
		vector<string>SplitResult;
		Split(BI.BI,SplitResult);
		for(int j=0;j<SplitResult.size();j++){
			if(includes(SplitResult[j],'a'))CBPackage["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][j]=Number(SplitResult[j][0]);
			else CBPackage["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][j]=Number(SplitResult[j]);
			CBPackage["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][j]=-1;
		}
		int NowCommand=0;
		for(int j=0;j<SplitResult.size();j++){
			if(SplitResult[j]=="-1"||(!includes(SplitResult[j],'a')))continue;
			jsonxx::json CommandBlock=BlockPackage;
			if(SplitResult[j]=="0a")CommandBlock["value"]["block_entity_data"]["value"]["auto"]["value"]=0;
			string ThisCommand=(string)MainPackage["Define"][Position]["Define"][NowCommand]["Command"];
			string BlockPosition=to_string(j);
			CommandBlock["value"]["block_entity_data"]["value"]["Command"]["value"]=ThisCommand;
			bool NeedCondition=(bool)MainPackage["Define"][Position]["Define"][NowCommand]["Condition"];
			if(NeedCondition==true)CommandBlock["value"]["block_entity_data"]["value"]["conditionMet"]["value"]=1;
			CBPackage["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][BlockPosition]=CommandBlock;
			NowCommand++;
		}
		ofstream JSONFileOut;
		JSONFileOut.open((FileName+".json").c_str());
		JSONFileOut<<CBPackage.dump();
		JSONFileOut.close();
	}
	ConfigFileOut.close();
	system("node BECBCTPP.js");
}
