import * as VS from "../lib/VisualizationSupport.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
import { disableControl, enableControl } from "../lib/nodectrl.js";


// Namespace URI for createElementNS
var svgns = "http://www.w3.org/2000/svg";

// Get the size of svg
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

/* Declare an abort controller */
var abortController = null;

// Build graph
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

drawNewGraph(30)
// Trigger new graph drawing button
let submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function() {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
});


/**
 * For the visualization:
 *  -   Tracking blocks color: #FFEE58
 *  -   Minimum value block color: #81C784
 */

// Find the minimum value
async function findMin(array, start, end, delay) {
    let min = array[start];
    min.style = "fill: #81C784";
    // Remove the color in the previous block
    if (start > 0)
    {
        array[start-1].removeAttribute("style");
    }
    
    for (let i = start+1; i <= end; i++)
    {
        await VS.timeoutFunc(abortController.signal, delay);
        // Track the running block
        array[i-1].removeAttribute("style");
        array[i].style = "fill: #FFEE58";
        // Ensure the min block still keeps its color
        min.style = "fill: #81C784";
        if (parseInt(array[i].id) < parseInt(min.id))
        {
            min.removeAttribute("style");
            min = array[i];
            min.style = "fill: #81C784";               
        }
        // Swap the minimum value with the first unsorted point
        if (i === end)
        {
            array[end].removeAttribute("style");
            VS.swap(array[start], min);
        }
    }
}

// Implement selection sort
async function selectionSort(arr, delay) {
    let l = arr.length;
    for (let n = 0; n < l; n++)
    {
        await VS.timeoutWithPassInFunc(abortController.signal, delay,
                                       findMin(arr, n, l-1, delay));
        if (n === l - 1)
        {
            // Remove the minimum value block's color when it reaches the last block
            // Enable control in the final move
            setTimeout(() => {
                enableControl();
                abortController = null;
                arr[l-1].removeAttribute("style");
            }, delay);
        }
    }
}

/* Trigger the play button and the reset button */
let button = document.getElementById('play');
const resetBtn = document.getElementById('reset');
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");

    let speed = VS.getDelay();
    console.log("Speed: " + speed);

    // Disable control form
    disableControl();
    abortController = new AbortController();
    selectionSort(arr, speed);
});
// When the reset button hears the click event, if abortController existed, call to its abort method
resetBtn.addEventListener("click", () => {
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
    enableControl();
})