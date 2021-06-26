import fs=require("fs");
import process=require("process");
import {writeUncompressed} from 'prismarine-nbt';
var Filename:string=process.argv.splice(2)[0];
var Main:any={"type":"compound","name":"","value":{"format_version":{"type":"int","value":1},"size":{"type":"list","value":{"type":"int","value":[1,1,4]}},"structure":{"type":"compound","value":{"block_indices":{"type":"list","value":{"type":"list","value":[{"type":"int","value":[]},{"type":"int","value":[]}]}},"entities":{"type":"list","value":{"type":"end","value":[]}},"palette":{"type":"compound","value":{"default":{"type":"compound","value":{"block_palette":{"type":"list","value":{"type":"compound","value":[{"name":{"type":"string","value":"minecraft:repeating_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":2}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":1}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":4}}},"version":{"type":"int","value":17879555}}]}},"block_position_data":{"type":"compound","value":{}}}}}}}},"structure_world_origin":{"type":"list","value":{"type":"int","value":[0,4,0]}}}};
var Mainfile:string=fs.readFileSync("MainDefult.txt").toString();
var MainCommand:string=fs.readFileSync("Main.txt").toString();
var MainCommands:Array<string>=MainCommand.split("|+");
var MainCommandtop:number=0;
var Mainspl:Array<string>=Mainfile.split("|");
var MainBlockindice:string=Mainspl[0];
var Mainsize:string=Mainspl[1];
var Mainsizes:Array<string>=Mainsize.split(" ");
var MainBlockindices:Array<string>=MainBlockindice.split(" ");
var Maintypes:number=MainBlockindices.length;
for(var i:number=0;i<3;i++)Main["value"]["size"]["value"]["value"][i]=Number(Mainsizes[i]);
for (var i:number=0;i<Maintypes;i++){
    if(MainBlockindices[i].includes("a"))Main["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(MainBlockindices[i][0]);
    else Main["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(MainBlockindices[i]);
    Main["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][i]=-1;
}
for(var i:number=0;i<Maintypes;i++){
    if(MainBlockindices[i]=="-1"||(!MainBlockindices[i].includes("a")))continue;
    var bd:any={
        "type":"compound",
        "value":{
            "block_entity_data":{
                "type":"compound",
                "value":{
                    "Command":{
                        "type":"string",
                        "value":MainCommands[MainCommandtop++]
                    },
                    "CustomName":{
                        "type":"string",
                        "value":""
                    },
                    "ExecuteOnFirstTick":{
                        "type":"byte",
                        "value":0
                    },
                    "LPCommandMode":{
                        "type":"int",
                        "value":0
                    },
                    "LPCondionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LPRedstoneMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LastExecution":{
                        "type":"long",
                        "value":[0, 0]
                    },
                    "LastOutput":{
                        "type":"string",
                        "value":""
                    },
                    "LastOutputParams":{
                        "type":"list",
                        "value":{
                            "type":"end",
                            "value":[]
                        }
                    },
                    "SuccessCount":{
                        "type":"int",
                        "value":0
                    },
                    "TickDelay":{
                        "type":"int",
                        "value":0
                    },
                    "TrackOutput":{
                        "type":"byte",
                        "value":1
                    },
                    "Version":{
                        "type":"int",
                        "value":15
                    },
                    "auto":{
                        "type":"byte",
                        "value":1
                    },
                    "conditionMet":{
                        "type":"byte",
                        "value":0
                    },
                    "conditionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "id":{
                        "type":"string",
                        "value":"CommandBlock"
                    },
                    "isMovable":{
                        "type":"byte",
                        "value":1
                    },
                    "powered":{
                        "type":"byte",
                        "value":0
                    },
                    "x":{
                        "type":"int",
                        "value":2
                    },
                    "y":{
                        "type":"int",
                        "value":4
                    },
                    "z":{
                        "type":"int",
                        "value":2
                    }
                }
            }
        }
    };
    Main["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i]=bd;
}
const MainoutBuffer:any=fs.createWriteStream(Filename+"Main.mcstructure");
const MainnewBuf:any=writeUncompressed(Main,"little");
MainoutBuffer.write(MainnewBuf);
MainoutBuffer.end(()=>process.stdout.write("Main Created successfully\n"));
var Initial:any={"type":"compound","name":"","value":{"format_version":{"type":"int","value":1},"size":{"type":"list","value":{"type":"int","value":[1,1,4]}},"structure":{"type":"compound","value":{"block_indices":{"type":"list","value":{"type":"list","value":[{"type":"int","value":[]},{"type":"int","value":[]}]}},"entities":{"type":"list","value":{"type":"end","value":[]}},"palette":{"type":"compound","value":{"default":{"type":"compound","value":{"block_palette":{"type":"list","value":{"type":"compound","value":[{"name":{"type":"string","value":"minecraft:command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":2}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":1}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":4}}},"version":{"type":"int","value":17879555}}]}},"block_position_data":{"type":"compound","value":{}}}}}}}},"structure_world_origin":{"type":"list","value":{"type":"int","value":[0,4,0]}}}};
var Initialfile:string=fs.readFileSync("InitialDefult.txt").toString();
var InitialCommand:string=fs.readFileSync("Initial.txt").toString();
var InitialCommands:Array<string>=InitialCommand.split("|+");
var InitialCommandtop:number=0;
var Initialspl:Array<string>=Initialfile.split("|");
var InitialBlockindice:string=Initialspl[0];
var Initialsize:string=Initialspl[1];
var Initialsizes:Array<string>=Initialsize.split(" ");
var InitialBlockindices:Array<string>=InitialBlockindice.split(" ");
var Initialtypes:number=InitialBlockindices.length;
for(var i:number=0;i<3;i++)Initial["value"]["size"]["value"]["value"][i]=Number(Initialsizes[i]);
for (var i:number=0;i<Initialtypes;i++){
    if(InitialBlockindices[i].includes("a"))Initial["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(InitialBlockindices[i][0]);
    else Initial["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(InitialBlockindices[i]);
    Initial["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][i]=-1;
}
for(var i:number=0;i<Initialtypes;i++){
    if(InitialBlockindices[i]=="-1"||(!InitialBlockindices[i].includes("a")))continue;
    var bd:any={
        "type":"compound",
        "value":{
            "block_entity_data":{
                "type":"compound",
                "value":{
                    "Command":{
                        "type":"string",
                        "value":InitialCommands[InitialCommandtop++]
                    },
                    "CustomName":{
                        "type":"string",
                        "value":""
                    },
                    "ExecuteOnFirstTick":{
                        "type":"byte",
                        "value":0
                    },
                    "LPCommandMode":{
                        "type":"int",
                        "value":0
                    },
                    "LPCondionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LPRedstoneMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LastExecution":{
                        "type":"long",
                        "value":[0, 0]
                    },
                    "LastOutput":{
                        "type":"string",
                        "value":""
                    },
                    "LastOutputParams":{
                        "type":"list",
                        "value":{
                            "type":"end",
                            "value":[]
                        }
                    },
                    "SuccessCount":{
                        "type":"int",
                        "value":0
                    },
                    "TickDelay":{
                        "type":"int",
                        "value":0
                    },
                    "TrackOutput":{
                        "type":"byte",
                        "value":1
                    },
                    "Version":{
                        "type":"int",
                        "value":15
                    },
                    "auto":{
                        "type":"byte",
                        "value":1
                    },
                    "conditionMet":{
                        "type":"byte",
                        "value":0
                    },
                    "conditionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "id":{
                        "type":"string",
                        "value":"CommandBlock"
                    },
                    "isMovable":{
                        "type":"byte",
                        "value":1
                    },
                    "powered":{
                        "type":"byte",
                        "value":0
                    },
                    "x":{
                        "type":"int",
                        "value":2
                    },
                    "y":{
                        "type":"int",
                        "value":4
                    },
                    "z":{
                        "type":"int",
                        "value":2
                    }
                }
            }
        }
    };
    Initial["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i]=bd;
}
const InitialoutBuffer:any=fs.createWriteStream(Filename+"Initial.mcstructure");
const InitialnewBuf:any=writeUncompressed(Initial,"little");
InitialoutBuffer.write(InitialnewBuf);
InitialoutBuffer.end(()=>process.stdout.write("Initial Created successfully\n"));
var Summon:any={"type":"compound","name":"","value":{"format_version":{"type":"int","value":1},"size":{"type":"list","value":{"type":"int","value":[1,1,4]}},"structure":{"type":"compound","value":{"block_indices":{"type":"list","value":{"type":"list","value":[{"type":"int","value":[]},{"type":"int","value":[]}]}},"entities":{"type":"list","value":{"type":"end","value":[]}},"palette":{"type":"compound","value":{"default":{"type":"compound","value":{"block_palette":{"type":"list","value":{"type":"compound","value":[{"name":{"type":"string","value":"minecraft:command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":3}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":2}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":1}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":4}}},"version":{"type":"int","value":17879555}}]}},"block_position_data":{"type":"compound","value":{}}}}}}}},"structure_world_origin":{"type":"list","value":{"type":"int","value":[0,4,0]}}}};
var Summonfile:string=fs.readFileSync("SummonDefult.txt").toString();
var SummonCommand:string=fs.readFileSync("Summon.txt").toString();
var SummonCommands:Array<string>=SummonCommand.split("|+");
var SummonCommandtop:number=0;
var Summonspl:Array<string>=Summonfile.split("|");
var SummonBlockindice:string=Summonspl[0];
var Summonsize:string=Summonspl[1];
var Summonsizes:Array<string>=Summonsize.split(" ");
var SummonBlockindices:Array<string>=SummonBlockindice.split(" ");
var Summontypes:number=SummonBlockindices.length;
for(var i:number=0;i<3;i++)Summon["value"]["size"]["value"]["value"][i]=Number(Summonsizes[i]);
for (var i:number=0;i<Summontypes;i++){
    if(SummonBlockindices[i].includes("a"))Summon["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(SummonBlockindices[i][0]);
    else Summon["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(SummonBlockindices[i]);
    Summon["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][i]=-1;
}
for(var i:number=0;i<Summontypes;i++){
    if(SummonBlockindices[i]=="-1"||(!SummonBlockindices[i].includes("a")))continue;
    var bd:any={
        "type":"compound",
        "value":{
            "block_entity_data":{
                "type":"compound",
                "value":{
                    "Command":{
                        "type":"string",
                        "value":SummonCommands[SummonCommandtop++]
                    },
                    "CustomName":{
                        "type":"string",
                        "value":""
                    },
                    "ExecuteOnFirstTick":{
                        "type":"byte",
                        "value":0
                    },
                    "LPCommandMode":{
                        "type":"int",
                        "value":0
                    },
                    "LPCondionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LPRedstoneMode":{
                        "type":"byte",
                        "value":0
                    },
                    "LastExecution":{
                        "type":"long",
                        "value":[0, 0]
                    },
                    "LastOutput":{
                        "type":"string",
                        "value":""
                    },
                    "LastOutputParams":{
                        "type":"list",
                        "value":{
                            "type":"end",
                            "value":[]
                        }
                    },
                    "SuccessCount":{
                        "type":"int",
                        "value":0
                    },
                    "TickDelay":{
                        "type":"int",
                        "value":0
                    },
                    "TrackOutput":{
                        "type":"byte",
                        "value":1
                    },
                    "Version":{
                        "type":"int",
                        "value":15
                    },
                    "auto":{
                        "type":"byte",
                        "value":1
                    },
                    "conditionMet":{
                        "type":"byte",
                        "value":0
                    },
                    "conditionalMode":{
                        "type":"byte",
                        "value":0
                    },
                    "id":{
                        "type":"string",
                        "value":"CommandBlock"
                    },
                    "isMovable":{
                        "type":"byte",
                        "value":1
                    },
                    "powered":{
                        "type":"byte",
                        "value":0
                    },
                    "x":{
                        "type":"int",
                        "value":2
                    },
                    "y":{
                        "type":"int",
                        "value":4
                    },
                    "z":{
                        "type":"int",
                        "value":2
                    }
                }
            }
        }
    };
    Summon["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i]=bd;
}
const SummonoutBuffer:any=fs.createWriteStream(Filename+"Summon.mcstructure");
const SummonnewBuf:any=writeUncompressed(Summon,"little");
SummonoutBuffer.write(SummonnewBuf);
SummonoutBuffer.end(()=>process.stdout.write("Summon Created successfully"));
