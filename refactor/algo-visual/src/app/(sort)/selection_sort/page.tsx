'use client'

import { SelectionSortFactory, SortGraph, getGraphSize } from "@/components/canvas/sort_graph";
import { useEffect, useState } from "react";
import { SortControl } from "@/components/control";


export default function SelectionSortPage() {
    // Because the document is undefined due to server side rendering,
    // An useState and an useEffect hook is needed to get the size
    // of the graph
    let [ [svgWidth, svgHeight], setSvgSize ] = useState([0, 0]);
    let [graph, setGraph] = useState<SortGraph | undefined>();;

    useEffect(() => {
        const size = document.getElementById("inputSize") as HTMLInputElement;
        if (size !== null && svgWidth > 0) {
            const factory = new SelectionSortFactory(parseInt(size.value), svgWidth, svgHeight);
            const createdGraph = factory.createGraph();
            SortControl.addHandler(factory, setGraph);
            setGraph(createdGraph);
        }
        getGraphSize(setSvgSize);
    }, [svgWidth, svgHeight]);

    console.log(graph)

    return (
        <>
            {graph !== undefined && graph.draw()}
        </>
    );
}