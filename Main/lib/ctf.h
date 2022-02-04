#pragma once

#include<string>
#include<fstream>
#include<vector>

using namespace std;
int CmdCounter;
int TurnToward = 2, ChainToward = 1, TurnHistory = -2, Initialize = 0;

struct CommandBlock {
	int id = -1;
	int command = -1;
};

struct s {
	int x = 0, y = 0, z = 0;
};

inline void init() {
	TurnToward = 2;
	ChainToward = 1;
	TurnHistory = -2;
	Initialize = 0;
}

inline void TTFlip() {
	if (TurnToward == 2)TurnHistory = TurnToward, TurnToward = 4;
	else if (TurnToward == 4 && TurnHistory == 2)TurnHistory = TurnToward, TurnToward = 5;
	else if (TurnToward == 4 && TurnHistory == 5)TurnHistory = TurnToward, TurnToward = 2;
	else TurnHistory = TurnToward, TurnToward = 4;
}

inline void CTFlip() {
	if (ChainToward == 1)ChainToward = 3;
	else ChainToward = 1;
}

CommandBlock BlockInfo[64][64][64];

pair <vector<CommandBlock>, s> CTBPairing(int CmdCounter) {
	for (int x = 0; x < 64; x++)
		for (int y = 0; y < 64; y++)
			for (int z = 0; z < 64; z++) {
				BlockInfo[x][y][z].id = -1;
				BlockInfo[x][y][z].command = -1;
			}
	s size, Counter, pos;
	init();
	int LinearCounter = 1;
	while (CmdCounter) {
		Counter.z++;
		if (Initialize == 0) {
			CmdCounter--;
			BlockInfo[pos.x][pos.y][pos.z].id = Initialize;
			BlockInfo[pos.x][pos.y][pos.z].command = 0;
			Initialize = -2;
			pos.z++;
			continue;
		}

		if (pos.z != 0 && pos.z != 63) {
			BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
			BlockInfo[pos.x][pos.y][pos.z].command = LinearCounter;
			LinearCounter++;
			pos.z = (ChainToward == 1) ? pos.z + 1 : pos.z - 1;
			CmdCounter--;
		}

		else if ((pos.z == 0 && pos.x == 63 && pos.y % 2 == 0) || (pos.z == 0 && pos.x == 0 && pos.y % 2 == 1)) {
			TTFlip();
			BlockInfo[pos.x][pos.y][pos.z].id = TurnToward;
			pos.y++;
			CTFlip();
			BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
			pos.z = (ChainToward == 1) ? pos.z + 1 : pos.z - 1;
			TTFlip();
			Counter.y++;
		}

		else {
			BlockInfo[pos.x][pos.y][pos.z].id = TurnToward;
			pos.x = (TurnToward == 2) ? pos.x + 1 : pos.x - 1;
			CTFlip();
			BlockInfo[pos.x][pos.y][pos.z].id = ChainToward;
			pos.z = (ChainToward == 1) ? pos.z + 1 : pos.z - 1;
			Counter.x++;
		}
	}

	if (Counter.y != 0) {
		size.x = size.z = 64;
		size.y = Counter.y + 1;
	}

	else if (Counter.x != 0) {
		size.y = 1;
		size.x = Counter.x + 1;
		size.z = 64;
	}

	else {
		size.y = size.x = 1;
		size.z = Counter.z;
	}

	vector <CommandBlock> result;

	for (int x = 0; x < size.x; x++)
		for (int y = 0; y < size.y; y++)
			for (int z = 0; z < size.z; z++)
				result.push_back(BlockInfo[x][y][z]);
	return {result, size};
}
