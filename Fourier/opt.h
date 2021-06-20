#pragma once
#include<map>
#include<string>
#include<vector>
#include<cstring>
#include<exception>
namespace LampOpt{
	class Optexception:public std::exception{
		public:
			std::string error;
			Optexception(std::string s){
				error=s;
			}
 			virtual const char* what() const throw(){
				return error.c_str();
			}
	};
	struct CommandRead{
		std::string CommandName; 
		int argvl;
		int argvr;
	};
	std::vector<CommandRead> getopt(int argc,char *argv[],std::vector<std::string>Settings){
		std::map<std::string,CommandRead>Commands;
		std::vector<CommandRead>Ret;
		int SettingsLength=Settings.size();
		if(SettingsLength%2)throw Optexception("Argument setting error");
		CommandRead C;
		for(int i=0;i<SettingsLength;i+=2){
			if(Settings[i]=="none"&&Settings[i+1]=="none")throw Optexception("Argument setting error");
			else if(Settings[i+1]!="none"&&Settings[i+1][0]!='-')throw Optexception("Argument setting error");
			else if(Settings[i]=="none"){
				C.CommandName=Settings[i+1];
				Commands[Settings[i+1]]=C;
			}
			else if(Settings[i+1]=="none"){
				C.CommandName=Settings[i];
				Commands[Settings[i]]=C;
			}
			else{
				C.CommandName=Settings[i+1];
				Commands[Settings[i]]=C;
				Commands[Settings[i+1]]=C;
			}
		}
		for(int i=1;i<argc;i++){
			std::string ThisArgv(argv[i]);
			if(strlen(argv[i])==1&&argv[i][0]=='-')throw Optexception("Unknown argument:-");
			else if(argv[i][0]=='-'&&argv[i][1]!='-'){
				if(Commands.find(ThisArgv)!=Commands.end()){
					CommandRead ThisCommand=Commands[ThisArgv];
					ThisCommand.argvl=i+1;
					int j=i+1;
					for(;j<argc;j++)if(argv[j][0]=='-')break;
					ThisCommand.argvr=j-1;
					i=j-1;
					Ret.push_back(ThisCommand);
					continue;
				}else{
					int r=i+1;
					for(;r<argc;r++)if(argv[r][0]=='-')break;
					for(int j=1;j<strlen(argv[i]);j++){
						std::string prefix("-");
						std::string maincommand;
						maincommand.push_back(argv[i][j]);
						prefix=prefix+=maincommand;
						if(Commands.find(prefix)==Commands.end()){
							throw Optexception("Unknown argument:"+prefix);
							continue;
						}else{
							CommandRead ThisCommand=Commands[prefix];
							ThisCommand.argvl=i+1;
							ThisCommand.argvr=r-1;
							Ret.push_back(ThisCommand);
						}
					}
					i=r-1;
					continue;
				}
			}else if(Commands.find(ThisArgv)!=Commands.end()){
				CommandRead ThisCommand=Commands[ThisArgv];
				ThisCommand.argvl=i+1;
				int j=i+1;
				for(;j<argc;j++)if(argv[j][0]=='-')break;
				ThisCommand.argvr=j-1;
				i=j-1;
				Ret.push_back(ThisCommand);
				continue;
			}else throw Optexception("Unknown argument:"+ThisArgv);
		}
		return Ret;
	}
}
