import { getDelay } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
import { enableControl, disableControl } from "../lib/nodectrl.js";

/* Namespace URI for createElementNS */
var svgns = "http://www.w3.org/2000/svg";

/* Get the size of SVG */
const canvas = document.getElementById("graph");
const svgWidth = parseInt(canvas.clientWidth);
const svgHigh = parseInt(canvas.clientHeight) * 0.85;

/* Declare delay for animation */
var DELAY;

/* Build graph */
let new_graph;
function drawNewGraph(size) {
    new_graph = new BlockGraphFactory(size, svgWidth, svgHigh, svgns);
    let buildGraph = new_graph.createGraph();

    buildGraph.draw();
}

// Initial drawing
drawNewGraph(50)

/* Trigger new graph drawing button */
const submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function () {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
})

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
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, DELAY)
        );
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
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, DELAY)
        );
        arr[start].removeAttribute("style");
        arr[mid].removeAttribute("style");
        arr[end].removeAttribute("style");
    }
    if (start === 0 && end === arr.length - 1)
    {
        enableControl();
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

/* Trigger the play button */
const button = document.getElementById("play");
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");
    DELAY = getDelay();
    // Disable control form
    disableControl();
    mergeSort(arr, 0, arr.length - 1);
})