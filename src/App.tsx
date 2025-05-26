import {
  View,
  SafeAreaView,
  type LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";
import "./App.css";
import { NewBracketEntry } from "./components/NewBracketEntry";
import { mockRankingOverview } from "./mocks";
import { useEffect, useState } from "react";
import { BracketLines } from "./components/BracketLines";

const TOTAL_TEAMS = 8;
const TOTAL_COLS = Math.log2(TOTAL_TEAMS);
const EXPECTED_LAYOUTS = TOTAL_TEAMS - 1;

const initialTourneyState = [
  {
    team1: null,
    team2: null,
  },
  {
    team1: null,
    team2: null,
  },
  {
    team1: null,
    team2: null,
  },
  {
    team1: mockRankingOverview.rankings[7],
    team2: mockRankingOverview.rankings[6],
  },
  {
    team1: mockRankingOverview.rankings[5],
    team2: mockRankingOverview.rankings[4],
  },
  {
    team1: mockRankingOverview.rankings[3],
    team2: mockRankingOverview.rankings[2],
  },
  {
    team1: mockRankingOverview.rankings[1],
    team2: mockRankingOverview.rankings[0],
  },
];

const App = () => {
  const [layoutObjs, setLayoutObjs] = useState([
    ...Array(EXPECTED_LAYOUTS).keys(),
  ]);
  const [tourneyState, setTourneyState] = useState(initialTourneyState);

  const { width } = useWindowDimensions();

  const onLayoutCallback = (
    e: LayoutChangeEvent,
    colId: number,
    blockNum: number,
  ) => {
    // console.log("onLayoutCallback fired");
    setLayoutObjs((prevLayoutObjs) => {
      let indexToUpdate;
      indexToUpdate = 2 * colId + blockNum;
      if (colId === 0) indexToUpdate = 1;
      const newLayoutObjs = [...prevLayoutObjs];
      newLayoutObjs[indexToUpdate - 1] = { layout: e.nativeEvent.layout };
      return newLayoutObjs;
    });
  };

  const onSimulateMatchSettled = (winningTeam, colId, blockNum) => {
    console.log(colId, "COLID");
    console.log(blockNum, "BLOCKNUM");
    setTourneyState((prevTourneyState) => {
      const settledIndex = 2 * colId + blockNum;
      const indexToUpdate = Math.floor(settledIndex / 2) - 1;
      console.log(settledIndex, "SETTLEDINDEX");
      console.log(indexToUpdate, "INDEXTOUPDATE");
      const curDataForIndex = prevTourneyState[indexToUpdate];
      if (settledIndex % 2 == 1) {
        curDataForIndex.team1 = winningTeam;
      } else {
        curDataForIndex.team2 = winningTeam;
      }
      const newTournayState = [...prevTourneyState];
      newTournayState[indexToUpdate] = curDataForIndex;
      return newTournayState;
    });
  };

  // useEffect(() => {
  //   console.log(layoutObjs);
  // }, [layoutObjs]);

  const renderBracketCol = (nTeams, colNum, windowWidth) => {
    const numTeams = nTeams / Math.pow(2, colNum);
    const numBlocks = numTeams / 2;
    const arr = [...Array(numBlocks).keys()];
    const colId = TOTAL_COLS - (colNum + 1);
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        key={`bracketCol_${colNum}`}
      >
        {arr.map((i) => {
          let indexForTourneyState = 2 * colId + i - 1;
          if (colId === 0) indexForTourneyState = 0;
          // console.log(indexForTourneyState);
          const tourneyData = tourneyState[indexForTourneyState];
          // console.log(tourneyData);
          return (
            <NewBracketEntry
              team1={tourneyData.team1}
              team2={tourneyData.team2}
              onLayoutCallback={onLayoutCallback}
              colId={colId}
              blockNum={i}
              key={`${colId}_${i}`}
              onSimulateMatchSettled={onSimulateMatchSettled}
              windowWidth={windowWidth}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, height: "100%", backgroundColor: "#ffffff" }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {[...Array(TOTAL_COLS).keys()].map((i) => {
            return renderBracketCol(TOTAL_TEAMS, i, width);
          })}
        </View>
      </View>
      {layoutObjs.length === EXPECTED_LAYOUTS && (
        <BracketLines layoutTree={layoutObjs} />
      )}
    </SafeAreaView>
  );
};

export default App;
