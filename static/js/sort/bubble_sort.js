import * as VS from "../lib/VisualizationSupport.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
import { enableControl, disableControl } from "../lib/nodectrl.js";


// Namespace URI for createElementNS
var svgns = "http://www.w3.org/2000/svg";

// Get the size of svg
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

// Declare an abort controller
var abortController = null;

// Build graph
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

// Draw when starting
drawNewGraph(50);
// Trigger new graph drawing button
let submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function() {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
});


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
                await VS.timeoutFunc(abortController.signal, delay);
                if (parseInt(arr[i].id) > parseInt(arr[i + 1].id))
                {
                    VS.swap(arr[i], arr[i+1]);
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
            await VS.timeoutFunc(abortController.signal, delay);
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
            await VS.traverseBlocks(l, arr);
            abortController = null;
        }
    }
}


// Trigger the play button
let button = document.getElementById('play');
let stopBtn = document.getElementById('reset');
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");

    let speed = VS.getDelay();

    // Disable control form
    disableControl();
    abortController = new AbortController();
    bubbleSort(arr, speed);
});

// When the reset button hears the click event, if abortController existed, call to its abort method
stopBtn.addEventListener("click", () => {
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
    enableControl();
})