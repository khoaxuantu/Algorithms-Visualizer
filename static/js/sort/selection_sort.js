import { getDelay, swap } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/graph.js";
import { disableControl, enableControl } from "../lib/nodectrl.js";


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

drawNewGraph(5)
// Trigger new graph drawing button
let submitSize = document.getElementById("submitSize");
console.log(submitSize);
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
function findMin(array, start, end, delay) {
    let min = array[start];
    min.style = "fill: #81C784";
    // Remove the color in the previous block
    if (start > 0)
    {
        array[start-1].removeAttribute("style");
    }
    
    for (let i = start+1; i <= end; i++)
    {
        setTimeout(() => {
            // console.log("Inner " + i.toString() + ": " + ((i-start)*delay).toString());
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
                swap(array[start], min);  
            }
        }, (i-start) * delay);
    }
}

// Return the timeout factor of the outer loop
function getSteps(n, max) {
    return ((2*max - n) * n) / 2;
}

// Implement selection sort
function selectionSort(arr, delay) {
    let l = arr.length;
    for (let n = 0; n < l; n++)
    {
        setTimeout(() => {
            // console.log("Outer " + n.toString() + ": " + ((getSteps(n, l-1)+n) * delay).toString());
            // Remove the track color in the last box whenever 
            arr[l-1].removeAttribute("style");
            // Find the minimum value in a range
            setTimeout(() => {
                findMin(arr, n, l-1, delay);
            }, delay);
            
            if (n === l - 1)
            {
                // Remove the minimum value block's color when it reaches the last block
                // Enable control in the final move
                setTimeout(() => {
                    enableControl();
                    arr[l-1].removeAttribute("style");
                }, 2*delay);
            }
        }, ((getSteps(n, l-1)+n) * delay)+((n+1)*delay));
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