/**
 *  Implement general purpose functions
 */

var SLOWEST_SPEED = 1000

// Input delay
export function getDelay() {
    // Default delay value in 100%
    var delay = 10;
    var speedOpt = getSpeedOption();
    var inputSpeed = 0.99;
    let slider = document.getElementById("speedSlider");
    if (slider.value != 100)
    {
        inputSpeed = slider.value / 100;
    }
    delay = ((1 - inputSpeed) * SLOWEST_SPEED) / speedOpt;

    return delay;
}

// Input speed option
function getSpeedOption() {
    var speedOpt = document.getElementsByName('spd-opt');
    for (let i = 0; i < speedOpt.length; i++) 
    {
        if (speedOpt[i].checked) {
            return parseInt(speedOpt[i].value);
        } 
    }
}

// Element swaping implementation
export function swap(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
}

// Traverse all the blocks after sorting completion
export async function traverseBlocks(length, array)
{
    let delay = 50;
    if (length > 200) {
        delay /= 20;
    }
    var slidingBlocks;
    if (length % 2 == 0)
    {
        slidingBlocks = parseInt(length / 4);
    }
    else
    {
        slidingBlocks = parseInt(length / 3);
    }

    var start = 0;
    var end = 0;
    while (start < length || end < length)
    {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        if (end < length)
        {
            array[end].style = "fill: #58D68D;";
            end++;
        }
        
        if(end > array.length-1 || end >= start + slidingBlocks)
        {
            array[start].removeAttribute("style");
            start++;
        }
    }
}

// A timeout function to help demonstrate animation
// - abortSignal: Signal from the abortController, used for reseting the animation
export function timeoutFunc(abortSignal, delay) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve();
        }, delay);
        
        // When receive abort signal, clear the timeout
        abortSignal.addEventListener('abort', () => {
            clearTimeout(timeout);
        });
    });
}
// A timeout function to help demonstrate animation with a pass-in function
export function timeoutWithPassInFunc(abortSignal, delay, passInFunc) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(passInFunc);
        }, delay);
        
        // When receive abort signal, clear the timeout
        abortSignal.addEventListener('abort', () => {
            clearTimeout(timeout);
        });
    });
}