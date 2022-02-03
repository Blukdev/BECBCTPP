import fs=require("fs");
import process=require("process");
import {writeUncompressed} from 'prismarine-nbt';
var Config:string=fs.readFileSync("Config.txt").toString();
var FileNames:Array<string>=Config.split(" ");
var FileNamesLenth=FileNames.length;
for(let i:number=0;i<FileNamesLenth;i++){
    var Content:string=fs.readFileSync(FileNames[i]).toString();
    var JSONContent:any=JSON.parse(Content);
    const ContentoutBuffer:any=fs.createWriteStream(FileNames[i].replace(".json","")+".mcstructure");
    const ContentnewBuf:any=writeUncompressed(JSONContent,"little");
    ContentoutBuffer.write(ContentnewBuf);
    ContentoutBuffer.end(()=>process.stdout.write(`${FileNames[i].replace(".json","")} Created successfully${i==FileNamesLenth-1?"":"\n"}`));
}
