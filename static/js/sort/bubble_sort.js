import { swap, getDelay, traverseBlocks } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/graph.js";
import { disableNode, enableNode } from "../lib/nodectrl.js";


// Namespace URI for createElementNS
var svgns = "http://www.w3.org/2000/svg";

// Get the size of svg
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;
console.log(svgWidth)
console.log(svgHigh)

// Build graph
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

// Draw when starting
drawNewGraph(100);
// Trigger new graph drawing button
let submitSize = document.getElementById("submitSize");
console.log(submitSize);
submitSize.addEventListener("click", function() {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
});

// Disable control
function disableControl() {
    let sizeControl = new disableNode("sizeControl");
    sizeControl.disableByGroup();

    let speedControl = new disableNode("speedControl");
    speedControl.disableByGroup();
}

// Enable control
function enableControl() {
    let sizeControl = new enableNode("sizeControl");
    sizeControl.endableByGroup();

    let speedControl = new enableNode("speedControl");
    speedControl.endableByGroup();
}

// Return the timeout factor of the outer loop
function getSteps(n, max) {
    return ((2*max - n) * n) / 2;
}

// Implement bubble sort
function bubbleSort(arr, delay) {
    let l = arr.length;
    for (let n = 0; n < l; n++)
    {
        setTimeout(() => {
            // console.log("Outer " + n.toString() + ": " + (getSteps(n, l-1) * delay).toString());
            arr[0].style = "fill: #515A5A;";
            if (n < l - 1)
            {
                for (let i = 0; i < l - n - 1; i++)
                {
                    setTimeout(() => {
                        // Keep track the running block
                        // console.log("Inner " + i.toString() + ": " + (i * delay).toString());
                        if (parseInt(arr[i].id) > parseInt(arr[i + 1].id))
                        {
                            swap(arr[i], arr[i+1]);
                        }
                        else
                        {
                            arr[i].removeAttribute("style");
                            arr[i+1].style = "fill: #515A5A;";
                        }

                    }, (i+1) * delay);
                }
            }
            if (n === l - 1)
            {
                enableControl();
                // traverseBlocks(l, arr);
            }
        }, (getSteps(n, l-1)+n) * delay);
    }
}


// Trigger the play button
let button = document.getElementById('play');
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");

    let speed = getDelay();
    console.log("Speed: " + speed);

    // Disable control form
    disableControl();

    bubbleSort(arr, speed);
});