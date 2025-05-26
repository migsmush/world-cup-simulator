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

const App = () => {
  const [layoutObjs, setLayoutObjs] = useState([
    ...Array(EXPECTED_LAYOUTS).keys(),
  ]);
  const { width } = useWindowDimensions();

  const onLayoutCallback = (
    e: LayoutChangeEvent,
    colId: number,
    blockNum: number,
  ) => {
    console.log("onLayoutCallback fired");
    setLayoutObjs((prevLayoutObjs) => {
      let indexToUpdate;
      indexToUpdate = 2 * colId + blockNum;
      if (colId === 0) indexToUpdate = 1;
      const newLayoutObjs = [...prevLayoutObjs];
      newLayoutObjs[indexToUpdate - 1] = { layout: e.nativeEvent.layout };
      return newLayoutObjs;
    });
  };

  useEffect(() => {
    console.log(layoutObjs);
  }, [layoutObjs]);

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
        {arr.map((i) => (
          <NewBracketEntry
            team1={mockRankingOverview.rankings[0]}
            team2={mockRankingOverview.rankings[0]}
            onLayoutCallback={onLayoutCallback}
            colId={colId}
            blockNum={i}
            key={`${colId}_${i}`}
            windowWidth={windowWidth}
          />
        ))}
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
