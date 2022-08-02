import { getDelay, swap } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/graph.js";
import { disableNode, enableNode } from "../lib/nodectrl.js";


// Namespace URI for createElementNS
var svgns = "http://www.w3.org/2000/svg";

// Get the size of svg
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

// Build graph
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

drawNewGraph(10)
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

// Find the minimum value
function findMin(array, start, end, delay) {
    let min = array[start];
    for (let i = start+1; i <= end; i++)
    {
        setTimeout(() => {
            array[i].style = "border: 20%"
            if (parseInt(array[i].id) < parseInt(min.id))
            {
                min.removeAttribute("style");
                min = array[i];
                min.style = "fill: #81C784"                
            }
        }, i * delay);
    }

    return min;
}

// Implement selection sort
function selectionSort(arr, delay) {
    let l = arr.length;
    for (let n = 0; n < l; n++)
    {
        // Find the minimum value in a range
        let min = findMin(arr, n, l-1, delay);

        // Swap the minimum value with the first unsorted point
        swap(arr[n], min);  

        if (n === l - 1)
        {
            // Enable control in the final move
            enableControl();
        }
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

    selectionSort(arr, speed);
});