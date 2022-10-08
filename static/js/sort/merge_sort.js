import { swap, getDelay } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/graph.js";
import { enableControl, disableControl } from "../lib/nodectrl.js";

/* Namespace URI for createElementNS */
var svgns = "http://www.w3.org/2000/svg";

/* Get the size of SVG */
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

/* Build graph */
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

// Initial drawing
drawNewGraph(10)

/* Trigger new graph drawing button */
const submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function () {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
})

/* Implement Merge Sort */
/**
 * For visualization
 *  -   
 */
function mergeSort(delay, arr) {

}

/* Trigger the play button */
const button = document.getElementById("play");
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");

    let speed = getDelay();

    // Disable control form
    // disableControl();
    mergeSort(speed, arr);
})