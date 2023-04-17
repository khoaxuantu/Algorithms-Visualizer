import { getDelay, timeoutFunc, traverseBlocks } from "../lib/VisualizationSupport.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
import { enableControl, disableControl } from "../lib/nodectrl.js";

/* Namespace URI for createElementNS */
var svgns = "http://www.w3.org/2000/svg";

/* Get the size of SVG */
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

/* Declare an abort controller */
var abortController = null;

/* Declare delay for animation */
var DELAY;

/* Build graph */
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

/* Implement Merge Sort */
/**
 * For visualization
 *  -   Mid block: #72A1EF
 *  -   Start block: #81C784
 *  -   End block: #FFEE58
 */
async function mergeSort(arr, start, end) {
    if (start < end)
    {
        await timeoutFunc(abortController.signal, DELAY);
        arr[start].style = "fill: #81C784; ";
        arr[end].style = "fill: #FFEE58; ";
        // Init start, end, mid var
        let mid = Math.floor((start + end) / 2);
        arr[mid].style = "fill: #72A1EF; ";
        // Perform merge sort in 2 halves
        await mergeSort(arr, start, mid);
        await mergeSort(arr, mid + 1, end)
        // Call merge 
        await merge(arr, start, mid, end)
        await timeoutFunc(abortController.signal, DELAY);
        arr[start].removeAttribute("style");
        arr[mid].removeAttribute("style");
        arr[end].removeAttribute("style");
    }
    if (start === 0 && end === arr.length - 1)
    {
        await traverseBlocks(abortController.signal, arr.length, arr);
        enableControl();
        abortController = null;
    }
}

async function merge(arr, left, mid, right) {
    // Init a copy of arr: only object {height, id}
    let arrCopy = new Array(arr.length);
    let rect;
    for (let i = 0; i < arr.length; i++)
    {
        rect = arr[i].getBoundingClientRect();
        arrCopy[i] = {height: rect.height.toString(), id: arr[i].id};
    }
    // Traverse the copyArr, i: 1st half element, j: second one
    // If first half is out of scope
    // Else if second half is out of scope
    // Else if copyArr[i] > copyArr[j], assign copyArr[j] to arr
    // Else assign copyArr[i] to arr
    let i = left, j = mid+1;
    for (let k = left; k <= right; k++)
    {
        if (i > mid) 
        {
            // arr[k] = arrCopy[j];
            modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id)
            j++;
        }
        else if (j > right) 
        {
            // arr[k] = arrCopy[i];
            modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id)
            i++;
        }
        else if (parseInt(arrCopy[i].id) > parseInt(arrCopy[j].id))
        {
            // arr[k] = arrCopy[j];
            modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id)
            j++;
        }
        else
        {
            // arr[k] = arrCopy[i];
            modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id)
            i++;
        }
    }
}

function modifyBlock(block, updatedHeight, updatedId) {
    block.setAttribute("height", updatedHeight);
    block.setAttribute("id", updatedId);
}

// Initial drawing
document.addEventListener("DOMContentLoaded", () => {
    drawNewGraph(document.getElementById("inputSize").value);
    
    /* Trigger new graph drawing button */
    const submitSize = document.getElementById("submitSize");
    submitSize.addEventListener("click", function () {
        new_graph.clearGraph();
        drawNewGraph(document.getElementById("inputSize").value);
    })
    
    document.getElementById('control').addEventListener("submit", (event) => {
        new_graph.clearGraph();
        drawNewGraph(document.getElementById("inputSize").value);
        event.preventDefault();
    })
    
    
    /* Trigger the play button and the reset button */
    const button = document.getElementById("play");
    const resetBtn = document.getElementById('reset');
    button.addEventListener("click", function() {
        let arr = document.getElementsByClassName("block");
        DELAY = getDelay();
        // Disable control form
        disableControl();
        abortController = new AbortController();
        mergeSort(arr, 0, arr.length - 1);
    })
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
})