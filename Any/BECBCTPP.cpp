#include<fstream>
#include<iostream>
#include "lib/jsonxx/json.hpp"
#include "lib/ctf.h"
#include "lib/opt.h"
using namespace std;
string GetAllData(char *FileName){
	ifstream JsonIn(FileName); 
	string result((istreambuf_iterator<char>(JsonIn)),istreambuf_iterator<char>());
	return result;
}
int main(int argc,char *argv[]){
	char *InputName="set.json";
	vector<string>str={"--help","-h","--input","-i"};
	vector<LampOpt::CommandRead>Ret=LampOpt::getopt(argc,argv,str);
	for(int i=0;i<Ret.size();++i)
		if(Ret[i].CommandName=="-h")cout<<"---help---\n--help/-h : Get help\n--input/-i : Set input file,default is set.json"; 
		else if(Ret[i].CommandName=="-i")InputName=argv[Ret[i].argvl];
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
	for(int i=1;i<=Chains;++i){
		string Position=to_string(i);
		int Length=(int)MainPackage["Define"][Position]["Length"];
		string FileName=(string)MainPackage["Define"][Position]["Name"];
		string FirstCommandType=(string)MainPackage["Define"][Position]["FirstCommandType"];
		if(i==Chains)ConfigFileOut<<FileName<<".json";
		else ConfigFileOut<<FileName<<".json ";
		vector<string>commands;
		for(int j=0;j<Length;++j)commands.push_back((string)MainPackage["Define"][Position]["Define"][j]);
		auto result=CTBPairing(commands.size());
		jsonxx::json CBPackage=FirstCommandType=="rcb"?RcbPackage:NcbPackage;
		CBPackage["value"]["size"]["value"]["value"][0]=result.second.x;
		CBPackage["value"]["size"]["value"]["value"][1]=result.second.y;
		CBPackage["value"]["size"]["value"]["value"][2]=result.second.z;
		auto CBS=move(result.first);
		for(int j=0;j<CBS.size();++j){
			CBPackage["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][j]=CBS[j].id;
			CBPackage["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][j]=-1;
			jsonxx::json CommandBlock=BlockPackage;
			if(CBS[j].id==-1)continue;
			if(CBS[j].id==0)CommandBlock["value"]["block_entity_data"]["value"]["auto"]["value"]=0;
			CommandBlock["value"]["block_entity_data"]["value"]["Command"]["value"]=commands[CBS[j].command];
			CBPackage["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][to_string(j)]=CommandBlock;
		}
		ofstream JSONFileOut;
		JSONFileOut.open((FileName+".json").c_str());
		JSONFileOut<<CBPackage.dump();
		JSONFileOut.close();
	}
	ConfigFileOut.close();
	system("node BECBCTPP.js");
}
