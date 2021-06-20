import fs=require("fs");
import process=require("process");
import {writeUncompressed} from 'prismarine-nbt';
var old:any={"type":"compound","name":"","value":{"format_version":{"type":"int","value":1},"size":{"type":"list","value":{"type":"int","value":[]}},"structure":{"type":"compound","value":{"block_indices":{"type":"list","value":{"type":"list","value":[{"type":"int","value":[]},{"type":"int","value":[]}]}},"entities":{"type":"list","value":{"type":"end","value":[]}},"palette":{"type":"compound","value":{"default":{"type":"compound","value":{"block_palette":{"type":"list","value":{"type":"compound","value":[{"name":{"type":"string","value":"minecraft:repeating_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:chain_command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:air"},"states":{"type":"compound","value":{}},"version":{"type":"int","value":17879555}},{"name":{"type":"string","value":"minecraft:command_block"},"states":{"type":"compound","value":{"conditional_bit":{"type":"byte","value":0},"facing_direction":{"type":"int","value":5}}},"version":{"type":"int","value":17879555}}]}},"block_position_data":{"type":"compound","value":{}}}}}}}},"structure_world_origin":{"type":"list","value":{"type":"int","value":[0,4,0]}}}};
var defultdata:string=fs.readFileSync("defult.txt").toString();
var maindata:string=fs.readFileSync("in.txt").toString();
var initialdata:string=fs.readFileSync("initial.txt").toString();
var summondata:string=fs.readFileSync("summons.txt").toString();
var mainspl:Array<string>=maindata.split("|+");
var initialdataspl:Array<string>=initialdata.split("|+");
var summondspl:Array<string>=summondata.split("|+");
var defultspl:Array<string>=defultdata.split("|");
var xindices:Array<string>=defultspl[0].split(" ");
var sizes:Array<string>=defultspl[1].split(" ");
var xindicesCount:number=xindices.length;
for(var i:number=0;i<3;i++)old["value"]["size"]["value"]["value"][i]=Number(sizes[i]);
for(var i:number=0;i<xindicesCount;i++){
    old["value"]["structure"]["value"]["block_indices"]["value"]["value"][0]["value"][i]=Number(xindices[i]);
    old["value"]["structure"]["value"]["block_indices"]["value"]["value"][1]["value"][i]=-1;
}
var flag:number=0,tsize:number=mainspl.length,summonlenth:number=summondspl.length;
for(var i:number=0;i<xindicesCount;i++){
    if(xindices[i]=="1"||xindices[i]=="2")continue;
    else if(xindices[i]=="0"){
        for(var j:number=0;j<tsize;j++){
            var bd:any={
                "type":"compound",
                "value":{
                    "block_entity_data":{
                        "type":"compound",
                        "value":{
                            "Command":{
                                "type":"string",
                                "value":mainspl[j]
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
                                "value":0
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
            old["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i++]=bd;
        }
    }
    else if(xindices[i]=="3"&&flag==0){
        for(var j:number=0;j<tsize;j++){
            var bd:any={
                "type":"compound",
                "value":{
                    "block_entity_data":{
                        "type":"compound",
                        "value":{
                            "Command":{
                                "type":"string",
                                "value":initialdataspl[j]
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
                                "value":0
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
            old["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i++]=bd;
        }
        flag=1;
    }
    else if(xindices[i]=="3"){
        for(var j:number=0;j<summonlenth;j++){
            var bd:any={
                "type":"compound",
                "value":{
                    "block_entity_data":{
                        "type":"compound",
                        "value":{
                            "Command":{
                                "type":"string",
                                "value":summondspl[j]
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
                                "value":0
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
            old["value"]["structure"]["value"]["palette"]["value"]["default"]["value"]["block_position_data"]["value"][i++]=bd;
        }
    }
}
var Filename:string=process.argv.splice(2)[0];
const outBuffer:any=fs.createWriteStream(Filename);
const newBuf:any=writeUncompressed(old,"little");
outBuffer.write(newBuf);
outBuffer.end(()=>process.stdout.write("Created successfully"));