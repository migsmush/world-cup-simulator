import { View, Text, Button, type LayoutChangeEvent } from "react-native";
import type { RankingData } from "../types/types";
import { useEffect, useRef, useState } from "react";

type NewBracketEntryProps = {
  team1: RankingData;
  team2: RankingData;
  onLayoutCallback: (
    e: LayoutChangeEvent,
    colId: number,
    blockNum: number,
  ) => void;
  colId: number;
  blockNum: number;
  onSimulateMatchSettled: (
    winningTeam: RankingData,
    colId: number,
    blockNum: number,
  ) => void;
  windowWidth: number;
};

const NewBracketEntry = ({
  team1,
  team2,
  onLayoutCallback,
  colId,
  blockNum,
  onSimulateMatchSettled,
  windowWidth,
}: NewBracketEntryProps) => {
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current?.measure?.((x, y, width, height, pageX, pageY) => {
      onLayoutCallback(
        {
          nativeEvent: {
            layout: {
              x: pageX,
              y: pageY,
              width,
              height,
              left: pageX,
              top: pageY,
            },
          },
        },
        colId,
        blockNum,
      );
    });
  }, [windowWidth]);
  const simulateMatch = (odds1: number, odds2: number) => {
    // console.log(odds1);
    const fullTime = 90;
    let i = 0;
    let team1Score = 0;
    let team2Score = 0;
    while (i < fullTime) {
      let curRoundTeam1 = 0;
      let curRoundTeam2 = 0;
      const randomNumber1 = Math.random() * 100;
      const randomNumber2 = Math.random() * 100;
      if (odds1 >= randomNumber1) {
        curRoundTeam1 += 1;
      }
      if (odds2 >= randomNumber2) {
        curRoundTeam2 += 1;
      }
      if (curRoundTeam1 > curRoundTeam2) {
        team1Score += 1;
      }
      if (curRoundTeam2 > curRoundTeam1) {
        team2Score += 1;
      }
      i += 10;
    }
    // console.log(odds2);
    // console.log("TEAM 1 SCORE: ", team1Score);
    // console.log("TEAM 2 SCORE: ", team2Score);
    if (team1Score >= team2Score) {
      onSimulateMatchSettled(team1, colId, blockNum);
    } else {
      onSimulateMatchSettled(team2, colId, blockNum);
    }
  };

  const onPressSimulate = () => {
    const total = team1.rankingItem.totalPoints + team2.rankingItem.totalPoints;
    const percent1 = (team1.rankingItem.totalPoints / total) * 100;
    const percent2 = (team2.rankingItem.totalPoints / total) * 100;
    simulateMatch(percent1, percent2);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    onLayoutCallback(e, colId, blockNum);
  };

  return (
    <View
      ref={viewRef}
      onLayout={onLayout}
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#ff0000",
        padding: 10,
        width: 200,
      }}
    >
      <Text>{team1?.rankingItem?.name}</Text>
      <Text>{team2?.rankingItem?.name}</Text>
      <Button
        onPress={onPressSimulate}
        color="#ff0000"
        title="simulate match"
      />
    </View>
  );
};

export { NewBracketEntry };
