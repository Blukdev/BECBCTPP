#!/usr/bin/env node
import fs from "fs";
import path from "path";
import {v4 as uuidv4} from 'uuid';
import adm_zip from "adm-zip";
var AddonsName:string=process.argv[2];
var AddonsDescription:string=process.argv[3];
var AddonsVersion:string=process.argv[4];
var AddonsVersions:Array<number>=[];
var AddonsVersionSplit:Array<string>=AddonsVersion.split(".");
for(let i:number=0;i<3;i++)AddonsVersions[i]=Number(AddonsVersionSplit[i]);
var Files:Array<string>=fs.readdirSync('./');
var Structures:Array<string>=[],StructuresCounter=0;
for(let i:number=0;i<Files.length;i++)
    if(Files[i].includes(".mcstructure"))
        Structures[StructuresCounter++]=Files[i];
function init(){
    fs.mkdirSync(AddonsName);
    fs.mkdirSync(`./${AddonsName}/structures`);
    var Manifest:any={
        "format_version": 2,
        "header": {
            "description": AddonsDescription,
            "name": AddonsName,
            "uuid": uuidv4(),
            "version": [0,0,1],
            "min_engine_version": AddonsVersions
        },
        "modules": [
            {
                "description": "",
                "type": "data",
                "uuid": uuidv4(),
                "version": [0,0,1]
            }
        ]
    };
    fs.writeFileSync(`./${AddonsName}/manifest.json`,JSON.stringify(Manifest));
    for(let i:number=0;i<Structures.length;i++)fs.copyFileSync(`./${Structures[i]}`,`./${AddonsName}/structures/${Structures[i]}`);
}
init();
var zip:any=new adm_zip();
zip.addLocalFolder(AddonsName);  
zip.writeZip(`${AddonsName}.mcpack`); 