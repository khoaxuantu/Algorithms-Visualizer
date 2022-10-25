import { swap, getDelay, traverseBlocks } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
import { enableControl, disableControl } from "../lib/nodectrl.js";


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

// Draw when starting
drawNewGraph(100);
// Trigger new graph drawing button
let submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function() {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
});

// Return the timeout factor of the outer loop
function getSteps(n, max) {
    return ((2*max - n) * n) / 2;
}

// Implement bubble sort
async function bubbleSort(arr, delay) {
    let l = arr.length;
    for (let n = 0; n < l; n++)
    {
        arr[0].style = "fill: #515A5A;";
        if (n < l - 1)
        {
            for (let i = 0; i < l - n - 1; i++)
            {
                // Keep track the running block
                // console.log("Inner " + i.toString() + ": " + (i * delay).toString());
                await new Promise((resolve) => 
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                if (parseInt(arr[i].id) > parseInt(arr[i + 1].id))
                {
                    swap(arr[i], arr[i+1]);
                }
                else
                {
                    arr[i].removeAttribute("style");
                    arr[i+1].style = "fill: #515A5A;";
                }
                // Return default color at the end of the inner iteration
                if (i === l - n - 2)
                {
                    await new Promise((resolve) => 
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );
                    arr[i+1].removeAttribute("style");
                }
            }
        }
        else 
        {
            await new Promise((resolve) => 
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            arr[0].removeAttribute("style");
        }
        await new Promise((resolve) => 
            setTimeout(() => {
                resolve();
            }, delay)
        );
        if (n === l - 1)
        {
            enableControl();
            // traverseBlocks(l, arr);
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

    bubbleSort(arr, speed);
});