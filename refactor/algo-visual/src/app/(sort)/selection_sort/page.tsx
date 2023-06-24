'use client'

import { SelectionSortFactory, getGraphSize } from "@/components/canvas/sort_graph";
import { useEffect, useState } from "react";

export default function SelectionSortPage() {
    // Because the document is undefined due to server side rendering,
    // An useState and an useEffect hook is needed to get the size
    // of the graph
    let [ [svgWidth, svgHeight], setSvgSize ] = useState([0, 0]);
    let graph;

    useEffect(() => {
        getGraphSize(setSvgSize);
    }, [])

    if (svgHeight > 0) {
        const size = document.getElementById("inputSize") as HTMLInputElement;
        const factory = new SelectionSortFactory(parseInt(size.value), svgWidth, svgHeight);
        graph = factory.createGraph();
    }

    return (
        <>
            {graph !== undefined ? (
                graph.draw()
            ) : undefined}
        </>
    );
}
