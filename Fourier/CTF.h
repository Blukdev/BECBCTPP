#pragma once
#include<iostream>
#include<string>
#include<fstream>
using namespace std;
int CmdCounter;
string TurnToward, ChainToward, TurnHistory, Initialize;
struct s {
    int x, y, z;
};
string BlockInfo[64][64][64];
void TTFlip() {
    if (TurnToward == "2")TurnHistory = TurnToward, TurnToward = "4";
    else if (TurnToward == "4" && TurnHistory == "2")TurnHistory = TurnToward, TurnToward = "5";
    else if (TurnToward == "4" && TurnHistory == "5")TurnHistory = TurnToward, TurnToward = "2";
    else TurnHistory = TurnToward, TurnToward = "2";
}
void CTFlip() {
    if (ChainToward == "1")ChainToward = "3";
    else ChainToward = "1";
}
void SummonBI(int types,char *outputname){
    for (int x = 0; x < 64; x++)
        for (int y = 0; y < 64; y++)
            for (int z = 0; z < 64; z++)
                BlockInfo[x][y][z] = " -1";
    s size, Counter, pos;
    TurnToward = "2";
    TurnHistory = "null";
    ChainToward = "1";
    Initialize = "0a";
    Counter.x = Counter.y = Counter.z = pos.x = pos.y = pos.z = 0;
    CmdCounter=types;
    for (int i = 1; CmdCounter > 0;) {
        Counter.z++;
        if (Initialize == "0a") {
            CmdCounter--;
            BlockInfo[pos.x][pos.y][pos.z] = Initialize;
            Initialize = "Completed";
            pos.z++;
            continue;
        }
        if (pos.z != 0 && pos.z != 63) {
            BlockInfo[pos.x][pos.y][pos.z] = " " + ChainToward + "a";
            if (ChainToward == "1")pos.z++;
            else pos.z--;
            CmdCounter--;
        } else if ((pos.z == 0 && pos.x == 63 && pos.y % 2 == 0) || (pos.z == 63 && pos.x == 0 && pos.y % 2 == 1)) {
            TTFlip();
            BlockInfo[pos.x][pos.y][pos.z] = " " + TurnToward;
            pos.y++;
            CTFlip();
            BlockInfo[pos.x][pos.y][pos.z] = " " + ChainToward;
            if (ChainToward == "1")pos.z++;
            else pos.z--;
            TTFlip();
            Counter.y++;
        } else {
            BlockInfo[pos.x][pos.y][pos.z] = " " + TurnToward;
            if (TurnToward == "2")pos.x++;
            else pos.x--;
            CTFlip();
            BlockInfo[pos.x][pos.y][pos.z] = " " + ChainToward;
            if (ChainToward == "1")pos.z++;
            else pos.z--;
            Counter.x++;
        }
    }
    if (Counter.y != 0) {
        size.x = size.z = 64;
        size.y = Counter.y + 1;
    } else if (Counter.x != 0) {
        size.y = 1;
        size.x = Counter.x + 1;
        size.z = 64;
    } else {
        size.y = size.x = 1;
        size.z = Counter.z;
    }
    ofstream ofs;
    ofs.open(outputname);
    for (int x = 0; x < size.x; x++)
        for (int y = 0; y < size.y; y++)
            for (int z = 0; z < size.z; z++)
                ofs << BlockInfo[x][y][z];
    ofs << "|" << size.x << " " << size.y << " " << size.z;
    ofs.close();
}
