#pragma once

#include<iostream>
#include<string>
#include<fstream>
#include<vector>

using namespace std;
int CmdCounter;
int TurnToward, ChainToward, TurnHistory, Initialize;

struct CommandBlock {
    int id = -1;
    string command = "";
};

struct s {
    int x, y, z;
};

CommandBlock BlockInfo[64][64][64];

inline void TTFlip() {
    if (TurnToward == 2)TurnHistory = TurnToward, TurnToward = 4;
    else if (TurnToward == 4 && TurnHistory == 2)TurnHistory = TurnToward, TurnToward = 5;
    else if (TurnToward == 4 && TurnHistory == 5)TurnHistory = TurnToward, TurnToward = 2;
    else TurnHistory = TurnToward, TurnToward = 2;
}

inline void CTFlip() {
    if (ChainToward == 1)ChainToward = 3;
    else ChainToward = 1;
}

pair <vector<CommandBlock>, s> CTBPairing(int types, vector <string> &commands) {
    s size, Counter, pos;
    int LinearCounter = 1;
    TurnToward = 2;
    TurnHistory = -2;
    ChainToward = 1;
    Initialize = 0;
    Counter.x = Counter.y = Counter.z = pos.x = pos.y = pos.z = 0;
    CmdCounter = types;

    for (int i = 1; CmdCounter > 0;) {
        Counter.z++;
        if (Initialize == 0) {
            CmdCounter--;
            BlockInfo[pos.x][pos.y][pos.z].id = Initialize;
            BlockInfo[pos.x][pos.y][pos.z].command = commands.at(0);
            Initialize = -2;
            pos.z++;
            continue;
        }
        //绗竴涓懡浠ゆ柟鍧楀垵濮嬪寲
        if (pos.z != 0 && pos.z != 63) {
            BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
            BlockInfo[pos.x][pos.y][pos.z].command = commands.at(LinearCounter);
            LinearCounter++;
            if (ChainToward == 1)pos.z++;
            else pos.z--;
            CmdCounter--;
        }
            //z鏂瑰悜涓婄殑鐩撮摼锛屾湁鍛戒护


            //z灏緓灏撅紝y鎶崌锛屾棤鍛戒护
        else if ((pos.z == 0 && pos.x == 63 && pos.y % 2 == 0) || (pos.z == 63 && pos.x == 0 && pos.y % 2 == 1)) {
            TTFlip();
            BlockInfo[pos.x][pos.y][pos.z].id = TurnToward;
            pos.y++;
            CTFlip();
            BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
            if (ChainToward == 1)pos.z++;
            else pos.z--;
            TTFlip();
            Counter.y++;
        }
            //鎷愯锛屾棤鍛戒护

        else {
            BlockInfo[pos.x][pos.y][pos.z].id = TurnToward;
            if (TurnToward == 2)pos.x++;
            else pos.x--;
            CTFlip();
            BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
            if (ChainToward == 1)pos.z++;
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

    vector <CommandBlock> result;

    for (int y = 0; y < size.y; y++)
        for (int x = 0; x < size.x; x++)
            for (int z = 0; z < size.z; z++)
                result.push_back(BlockInfo[x][y][z]);
    return {result, size};
}
