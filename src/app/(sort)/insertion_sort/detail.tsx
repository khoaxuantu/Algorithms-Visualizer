'use client'

import { useEffect, useState } from "react";
import { InsertionSortFactory, SortGraph, getGraphSize } from "@/components/canvas/sort_graph";
import { HandlerGroup, SortControl } from "@/components/control";


export default function InsertionSortDetail() {
  // Because the document is undefined due to server side rendering,
  // An useState and an useEffect hook is needed to get the size
  // of the graph
  let [ [svgWidth, svgHeight], setSvgSize ] = useState([0, 0]);
  let [graph, setGraph] = useState<SortGraph | undefined>();

  useEffect(() => {
    const size = document.getElementById("inputSize") as HTMLInputElement;
    let handlerSnapshot: HandlerGroup;
    if (size !== null && svgWidth > 0) {
      const factory = new InsertionSortFactory(parseInt(size.value), svgWidth, svgHeight);
      const createdGraph = factory.createGraph();
      handlerSnapshot = SortControl.addHandler(factory, createdGraph, setGraph);
      setGraph(createdGraph);
    }
    getGraphSize(setSvgSize);

    return () => {
      SortControl.removeHandler(handlerSnapshot);
    }
  }, [svgWidth, svgHeight])

  console.log("🚀 ~ file: detail.tsx:14 ~ InsertionSortDetail ~ graph:", graph)

  return (
    <>
      {graph !== undefined && graph.draw()}
    </>
  );
}
