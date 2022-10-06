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
drawNewGraph(30)

/* Trigger new graph drawing button */
const submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function () {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
})

/* Implement heap sort */
/**
 * For visualization
 *  -   Tracking block color:
 *  -   Largest per heapify block color:
 *  -   Current index per heapify block color: 
 */
async function heapify(arr, heapSize, curIndex, delay) {
    // Take the curIndex (root) as largestIndex
    let largestIndex = curIndex;
    // Take left and right node indices
    let leftIndex = curIndex*2 + 1;
    let rightIndex = curIndex*2 + 2;
    // If leftTree is larger than the root
        // Update largestIndex
    if (leftIndex < heapSize && parseInt(arr[leftIndex].id) > parseInt(arr[largestIndex].id))
    {
        largestIndex = leftIndex;
    }
    // If rightTree is larger than the root
        // Update largestIndex
    if (rightIndex < heapSize && parseInt(arr[rightIndex].id) > parseInt(arr[largestIndex].id))
    {
        largestIndex = rightIndex
    }
    // Delay for {delay} ms
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
    );
    // If the largestIndex is not a root
        // Swap with root
        // Call recurively to the affected subtree
    if (curIndex != largestIndex)
    {
        await new Promise((resolve) =>
        setTimeout(() => {
                swap(arr[curIndex], arr[largestIndex]);
                resolve(heapify(arr, heapSize, largestIndex, delay));
            }, delay)
        );
    }
}

async function heapSort(arr, delay) {
    // Build heap
    for (let i = arr.length/2 - 1; i >= 0; i--) {
        // Each call to heapify need to be delay {delay}ms
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(heapify(arr, arr.length, i, delay));
            }, delay)
        );
    }
    // Start from the last index 
    // Call heapify func
    // Until index = 0
    let l = arr.length - 1;
    while (l > 0)
    {
        // Each call to heapify need to be delay {delay}ms
        await new Promise((resolve) =>
            setTimeout(() => {
                swap(arr[0], arr[l]);
                resolve(heapify(arr, l, 0, delay));
            }, delay)
        );
        l--;
    }
}

/* Trigger the play button */
const button = document.getElementById("play");
button.addEventListener("click", function () {
    let arr = document.getElementsByClassName("block");

    let speed = getDelay();

    // Disable control form
    // disableControl();
    heapSort(arr, speed);
})