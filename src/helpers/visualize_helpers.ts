import SFX from "@/components/sfx";
import { getSpeedOption } from "./util";

const SLOWEST_SPEED: number = 1000;

/**
 * Calculate delay from the given speed slider
 * @returns delay: number
 */
export function getDelay(): number {
    // Default delay value in 100%
    let delay = 10;

    let speedOpt = getSpeedOption() as number;

    let inputSpeed = 0.99; // To prevent delay being 0
    let slider = document.getElementById("speedSlider") as HTMLInputElement;
    const sliderVal = parseInt(slider.value);
    if (sliderVal != 100) {
        inputSpeed = sliderVal / 100;
    }
    delay = ((1 - inputSpeed) * SLOWEST_SPEED) / speedOpt;

    return delay;
}


/**
 * Implementation of HTML DOM node swapping
 * @param nodeA
 * @param nodeB
 */
export function swap(nodeA: any, nodeB: any) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
    SFX.init().play();
}

/**
 * A function for traversing blocks at the end of the animation
 * @param abortSignal
 * @param length
 * @param array
 */
export async function traverseBlocks(abortSignal: any, length: number, array: any) {
    let delay = length > 200 ? 50/20 : 50;
    let slidingBlocks = getSlidingWindowLength(length);

    let start = 0, end = 0;
    while (start < length || end < length) {
        await timeout(abortSignal, delay);
        if (end < length) {
            array[end].style = "fill: #58D68D;";
            end++;
        }

        if(end > array.length-1 || end >= start + slidingBlocks) {
            array[start].removeAttribute("style");
            start++;
        }
    }
}

function getSlidingWindowLength(length: number) {
    if (length % 2 == 0) return length / 4;
    else return length / 3;
}

/**
 * A timeout function to help demonstrate animation
 * @param abortSignal Signal from the abortController, used for resetting the animation
 * @param delay
 * @returns void
 */
export function timeout(abortSignal: any, delay: number) {
    return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => resolve(), delay);

        // When receive abort signal, clear the timeout
        abortSignal.addEventListener('abort', () => {
            clearTimeout(timeout);
        });
    });
}

/**
 * A timeout function to help demonstrate animation with a callback function
 * @param abortSignal Signal from the abortController, used for resetting the animation
 * @param delay
 * @param callback
 * @returns void
 */
export function timeoutWithCallback(abortSignal: any, delay: number, callback: any) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(callback);
        }, delay);

        // When receive abort signal, clear the timeout
        abortSignal.addEventListener('abort', () => {
            clearTimeout(timeout);
        });
    });
}
