/**
 *  Implement general purpose functions
 */

var SLOWEST_SPEED = 1000

// Input delay
export function getDelay() {
    // Default delay value in 100%
    var delay = 10;

    var inputSpeed = 0.99;
    let slider = document.getElementById("speedSlider");
    if (slider.value != 100)
    {
        inputSpeed = slider.value / 100;
    }
    console.log(inputSpeed);
    delay = (1 - inputSpeed) * SLOWEST_SPEED;

    return delay;
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
export function traverseBlocks(length, array)
{
    var slidingBlocks;
    if (length % 2 == 0)
    {
        slidingBlocks = length / 4;
    }
    else
    {
        slidingBlocks = length / 3;
    }

    var start = 0;
    var end = 0;
    while (start < length && end < length)
    {
        setTimeout(() => {
            array[end].style = "fill: #58D68D;";
            if (end < length)
            {
                end++;
            }

            if(end >= start + slidingBlocks)
            {
                array[start].removeAttribute("fill");
                if (start < length)
                {
                    start++;
                }
            }

        }, 100);
    }
}