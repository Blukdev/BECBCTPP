#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
var adm_zip_1 = __importDefault(require("adm-zip"));
var AddonsName = process.argv[2];
var AddonsDescription = process.argv[3];
var AddonsVersion = process.argv[4];
var AddonsVersions = [];
var AddonsVersionSplit = AddonsVersion.split(".");
for (var i = 0; i < 3; i++)
    AddonsVersions[i] = Number(AddonsVersionSplit[i]);
var Files = fs_1["default"].readdirSync('./');
var Structures = [], StructuresCounter = 0;
for (var i = 0; i < Files.length; i++)
    if (Files[i].includes(".mcstructure"))
        Structures[StructuresCounter++] = Files[i];
function init() {
    fs_1["default"].mkdirSync(AddonsName);
    fs_1["default"].mkdirSync("./" + AddonsName + "/structures");
    var Manifest = {
        "format_version": 2,
        "header": {
            "description": AddonsDescription,
            "name": AddonsName,
            "uuid": uuid_1.v4(),
            "version": [0, 0, 1],
            "min_engine_version": AddonsVersions
        },
        "modules": [
            {
                "description": "",
                "type": "data",
                "uuid": uuid_1.v4(),
                "version": [0, 0, 1]
            }
        ]
    };
    fs_1["default"].writeFileSync("./" + AddonsName + "/manifest.json", JSON.stringify(Manifest));
    for (var i = 0; i < Structures.length; i++)
        fs_1["default"].copyFileSync("./" + Structures[i], "./" + AddonsName + "/structures/" + Structures[i]);
}
init();
var zip = new adm_zip_1["default"]();
zip.addLocalFolder(AddonsName);
zip.writeZip(AddonsName + ".mcpack");
