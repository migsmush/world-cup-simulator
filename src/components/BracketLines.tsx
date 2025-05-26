import { useWindowDimensions } from "react-native";
import Svg, { Line } from "react-native-svg";

const BracketLines = ({ layoutTree }) => {
  const { width: w, height: h } = useWindowDimensions();

  const setupLines = (i: number) => {
    const rootLayout = layoutTree[i].layout;
    if (!rootLayout) return;
    const leftChildIndex = i * 2 + 1;
    const rightChildIndex = i * 2 + 2;
    if (leftChildIndex >= layoutTree.length) return;
    if (rightChildIndex >= layoutTree.length) return;
    const leftLayout = layoutTree[leftChildIndex].layout;
    const rightLayout = layoutTree[rightChildIndex].layout;

    const rootEntryX = rootLayout.left;
    const rootEntryY = rootLayout.y + rootLayout.height / 2;

    const child1EntryY = leftLayout.y + leftLayout.height / 2;
    const child2EntryY = rightLayout.y + rightLayout.height / 2;

    const childRightSideX = leftLayout.left + leftLayout.width;
    const midX = (rootEntryX - childRightSideX) / 2;
    const splitX = childRightSideX + midX;

    // console.log("leftLayout:", leftLayout);
    // console.log("rightLayout:", rightLayout);

    // console.log("rootEntryX:", rootEntryX);
    // console.log("rootEntryY:", rootEntryY);

    // console.log("child1EntryY (left):", child1EntryY);
    // console.log("child2EntryY (right):", child2EntryY);

    // console.log("childRightSideX (leftLayout.x + width):", childRightSideX);
    // console.log("midX ((rootLayout.x - childRightSideX) / 2):", midX);
    // console.log("splitX (childRightSideX - midX):", splitX);

    return (
      <>
        <Line
          x1={childRightSideX}
          y1={child1EntryY}
          x2={splitX}
          y2={child1EntryY}
          stroke="black"
          strokeWidth="2"
        />
        <Line
          x1={childRightSideX}
          y1={child2EntryY}
          x2={splitX}
          y2={child2EntryY}
          stroke="black"
          strokeWidth="2"
        />
        <Line
          x1={splitX}
          y1={child1EntryY}
          x2={splitX}
          y2={child2EntryY}
          stroke="black"
          strokeWidth="2"
        />
        <Line
          x1={splitX}
          y1={rootEntryY}
          x2={rootEntryX}
          y2={rootEntryY}
          stroke="black"
          strokeWidth="2"
        />
      </>
    );
  };

  return (
    <Svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: w,
        height: h,
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {[...Array(layoutTree.length).keys()].map((i) => {
        return setupLines(i);
      })}
    </Svg>
  );
};

export { BracketLines };
