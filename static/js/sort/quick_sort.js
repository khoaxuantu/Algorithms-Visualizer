import { swap, getDelay } from "../lib/cust_func_lib.js";
import { BlockGraphFactory } from "../lib/GraphFactory/BlockGraph.js";
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
drawNewGraph(50)

/* Trigger new graph drawing button */
const submitSize = document.getElementById("submitSize");
submitSize.addEventListener("click", function () {
    new_graph.clearGraph();
    drawNewGraph(document.getElementById("inputSize").value);
})

/* Implement Quick Sort */
/**
 * For visualization
 *  -   pivot block: #72A1EF
 *  -   jth block (partition): #81C784
 *  -   ith block (partition): #FFEE58
 */
async function partition(delay, arr, low, high) {
    arr[high].style = "fill: #72A1EF; ";
    let i = low-1;
    for (let j = low; j < high; j++)
    {
        arr[j].style = "fill: #81C784; ";
        if (parseInt(arr[j].id) < parseInt(arr[high].id))
        {
            if (i >= 0) arr[i].removeAttribute("style");
            i++;
            if (i != j) arr[i].style = "fill: #FFEE58; ";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve(swap(arr[i], arr[j]));
                    arr[i].style = "fill: #FFEE58; ";
                    arr[j].style = "fill: #81C784; ";
                }, delay)
            );
        }
        else
        {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
        }
        arr[j].removeAttribute("style");
    }
    if (i >= 0) arr[i].removeAttribute("style");
    arr[i+1].style = "fill: #72A1EF; ";
    // Swap the high (pivot) with i+1
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve(swap(arr[i+1], arr[high]));
        }, delay)
    );
    arr[i+1].removeAttribute("style");
    arr[high].removeAttribute("style");
    return i+1;
}

async function quickSort(delay, arr, low, high) {
    // Take pivot as high
    // Until low >= high
    if (low < high)
    {
        // Call to partition func
        let pi = 
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(partition(delay, arr, low, high));
            }, delay)
        );
        // Call recursive func with high = pi-1
        await new Promise((resolve) => {
            resolve(quickSort(delay, arr, low, pi - 1));
        })
        
        // Call recursive func with low = pi+1
        await new Promise((resolve) => {
            resolve(quickSort(delay, arr, pi + 1, high));
        })
    }
    if (low === 0 && high === arr.length-1)
    {
        enableControl();
    }
}

/* Trigger the play button */
const button = document.getElementById("play");
button.addEventListener("click", function() {
    let arr = document.getElementsByClassName("block");

    let speed = getDelay();

    // Disable control form
    disableControl();
    quickSort(speed, arr, 0, arr.length-1);
})