import { Dispatch, SetStateAction } from "react";
import * as VS from '@/app/visualize_helpers';
import { SortControl } from "../control";
import { Utility } from "@/app/util";

/**
 * Implements of factory method for graph
 */


/**
 * A base class for sort-category graph
 *
 * @param numBlocks
 * @param width The canvas's client width
 * @param height The canvas's client height
 */
export abstract class SortGraph {
    protected numBlocks: number;
    protected width: number;
    protected height: number;

    constructor(numBlocks: number, width: number, height: number) {
        this.numBlocks = numBlocks;
        this.width = width;
        this.height = height;
    }

    sort(): void {}

    draw(): JSX.Element | null | undefined {
        // Store the horizontal distance which has been taken place
        let consumedWidth = 0;
        // Specify the width of a block
        let boxWidth = this.boxWidth();

        let arr = this.createBlockList();

        return (
            <>
                {arr.map((num, index) => {
                    let curWidth = consumedWidth;
                    consumedWidth += boxWidth;
                    return <Block key={index}
                                id={num.toString()}
                                consumedWidth={curWidth.toString()}
                                boxWidth={boxWidth}
                                boxHeight={this.boxHeight(num)} />
                })}
            </>
        );
    }

    // Specify the width of a box
    protected boxWidth() {
        var boxWidth;
        if (this.numBlocks < 5) {
            boxWidth = 100;
        }
        else {
            boxWidth = this.width / this.numBlocks;
        }

        return boxWidth;
    }

    // Specify the height of a box
    protected boxHeight(value: number) {
        var boxHeight;
        boxHeight = (value * this.height) / this.numBlocks;

        return boxHeight;
    }

    // Set array values and shuffling method
    createBlockList(): number[] {
        let arr = new Array(this.numBlocks)
        for (let i = 0; i < this.numBlocks; i++) {
            arr[i] = i+1;
        }
        arr = arr.sort(() => Math.random() - 0.5);
        return arr;
    }

    set blocks(numBlocks: number) {
        this.numBlocks = numBlocks;
    }

    get blocks() {
        return this.numBlocks;
    }
}


class SelectionSortGraph extends SortGraph {
    constructor(nb: number, w: number, h: number) {
        super(nb, w, h);
    }

    /**
     * For the visualization:
     *  -   Tracking blocks color: #FFEE58
     *  -   Minimum value block color: #81C784
     */

    override sort(): void {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        let speed = VS.getDelay();
        Utility.disableControl();
        SortControl.abortController = new AbortController();
        this.sortBegin(arr, speed);
    }

    private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay: number) {
        let l = arr.length;
        for (let n = 0; n < l; n++) {
            await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                        this.findMin(arr, n, l-1, delay));
            if (n === l - 1) {
                // Remove the minimum value block's color when it reaches the last block
                // Enable control in the final move
                arr[l-1].removeAttribute("style");
                await VS.traverseBlocks((SortControl.abortController as AbortController).signal, l, arr);
                Utility.enableControl();
                SortControl.abortController = null;
            }
        }
    }

    private async findMin(array: HTMLCollectionOf<HTMLElement>, start: number, end: number, delay: number) {
        let min = array[start];
        min.setAttribute("style", "fill: #81C784");
        // Remove the color in the previous block
        if (start > 0) {
            array[start-1].removeAttribute("style");
        }

        for (let i = start+1; i <= end; i++) {
            await VS.timeout((SortControl.abortController as AbortController).signal, delay);
            // Track the running block
            array[i-1].removeAttribute("style");
            array[i].setAttribute("style", "fill: #FFEE58");
            // Ensure the min block still keeps its color
            min.setAttribute("style", "fill: #81C784");
            if (parseInt(array[i].id) < parseInt(min.id)) {
                min.removeAttribute("style");
                min = array[i];
                min.setAttribute("style", "fill: #81C784");
            }
            // Swap the minimum value with the first unsorted point
            if (i === end) {
                array[end].removeAttribute("style");
                VS.swap(array[start], min);
            }
        }
    }
}


class BubbleSortGraph extends SortGraph {
    constructor(nb: number, w: number, h: number) {
        super(nb, w, h);
    }

    override sort(): void {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        let speed = VS.getDelay();

        Utility.disableControl();
        SortControl.abortController = new AbortController();
        this.sortBegin(arr, speed);
    }

    private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay:number) {
        let l = arr.length;
        for (let n = 0; n < l; n++) {
            arr[0].setAttribute("style", "fill: #515A5A;");
            if (n < l - 1) {
                for (let i = 0; i < l - n - 1; i++) {
                    // Keep track the running block
                    // console.log("Inner " + i.toString() + ": " + (i * delay).toString());
                    await VS.timeout((SortControl.abortController as AbortController).signal, delay);
                    if (parseInt(arr[i].id) > parseInt(arr[i + 1].id)) {
                        VS.swap(arr[i], arr[i+1]);
                    } else {
                        arr[i].removeAttribute("style");
                        arr[i+1].setAttribute("style", "fill: #515A5A;");
                    }
                    // Return default color at the end of the inner iteration
                    if (i === l - n - 2) {
                        await new Promise<void>((resolve) =>
                            setTimeout(() => resolve(), delay)
                        );
                        arr[i+1].removeAttribute("style");
                    }
                }
            } else {
                await VS.timeout((SortControl.abortController as AbortController).signal, delay);
                arr[0].removeAttribute("style");
            }
            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), delay)
            );
            if (n === l - 1) {
                Utility.enableControl();
                await VS.traverseBlocks((SortControl.abortController as AbortController).signal, l, arr);
                SortControl.abortController = null;
            }
        }
    }
}


class HeapSortGraph extends SortGraph {
    constructor(nb: number, w: number, h: number) {
        super(nb, w, h);
    }

    /**
     * For visualization
     *  -   Tracking block color: #72A1EF
     *  -   Largest per heapify block color: #81C784
     *  -   Current index per heapify block color: #FFEE58
    */
    override sort(): void {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        let speed = VS.getDelay();

        // Disable control form and enable the reset button
        Utility.disableControl();
        SortControl.abortController = new AbortController();
        this.sortBegin(arr, speed);
    }

    private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay:number) {
        // Modify the array to maxHeap-like structure
        for (let i = arr.length/2 - 1; i >= 0; i--) {
            // arr[0].setAttribute("style", "fill: #72A1EF;";)
            // Each call to heapify need to be delay {delay}ms
            await new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve(this.heapify(arr, arr.length, i, delay));
                }, delay);
                (SortControl.abortController as AbortController).signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                });
            });
        }
        // Start from the last index
        // Call heapify func until index = 0
        let l = arr.length - 1;
        while (l > 0) {
            arr[0].setAttribute("style", "fill: #72A1EF;");
            // Each call to heapify need to be delay {delay}ms, maintain the maxHeap-like structure
            await new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    VS.swap(arr[0], arr[l]);
                    resolve(this.heapify(arr, l, 0, delay));
                }, delay);
                (SortControl.abortController as AbortController).signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                });
            });
            arr[l].removeAttribute("style");
            l--;
        }
        await VS.traverseBlocks((SortControl.abortController as AbortController).signal, arr.length, arr);
        // Enable control after all steps are finished
        Utility.enableControl();
        SortControl.abortController = null;
    }

    private async heapify(arr: HTMLCollectionOf<HTMLElement>, heapSize: number,
                          curIndex: number, delay: number) {
        // Take the curIndex (root) as largestIndex
        let largestIndex = curIndex;
        arr[largestIndex].setAttribute("style", "fill: #FFEE58;");
        // Take left and right node indices
        let leftIndex = curIndex*2 + 1;
        let rightIndex = curIndex*2 + 2;
        // If leftTree is larger than the root
        // Update largestIndex
        if (leftIndex < heapSize && parseInt(arr[leftIndex].id) > parseInt(arr[largestIndex].id)) {
            largestIndex = leftIndex;
        }
        // If rightTree is larger than the root
        // Update largestIndex
        if (rightIndex < heapSize && parseInt(arr[rightIndex].id) > parseInt(arr[largestIndex].id)) {
            largestIndex = rightIndex;
        }
        // Delay for {delay} ms
        await VS.timeout((SortControl.abortController as AbortController).signal, delay);
        arr[largestIndex].setAttribute("style", "fill: #81C784;");
        // If the largestIndex is not a root
        // Swap with root
        // Call recurively to the affected subtree
        if (curIndex != largestIndex) {
            await VS.timeout((SortControl.abortController as AbortController).signal, delay);
            VS.swap(arr[curIndex], arr[largestIndex]);

            await VS.timeout((SortControl.abortController as AbortController).signal, delay);
            // Remove color
            arr[curIndex].removeAttribute("style");
            arr[largestIndex].removeAttribute("style");
            await new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve(this.heapify(arr, heapSize, largestIndex, delay));
                }, delay);
                (SortControl.abortController as AbortController).signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                });
            });
        }
        // Remove color
        else {
            arr[curIndex].removeAttribute("style");
            arr[largestIndex].removeAttribute("style");
        }
    }
}


class MergeSortGraph extends SortGraph {
    private DELAY: number = 0;

    constructor(nb: number, w: number, h: number) {
        super(nb, w, h);
    }

    /**
     * For visualization
     *  -   Mid block: #72A1EF
     *  -   Start block: #81C784
     *  -   End block: #FFEE58
     */
    override sort(): void {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        this.DELAY = VS.getDelay();
        // Disable control form
        Utility.disableControl();
        SortControl.abortController = new AbortController();
        this.sortBegin(arr, 0, arr.length - 1);
    }

    private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, start: number, end: number) {
        if (start < end) {
            await VS.timeout((SortControl.abortController as AbortController).signal, this.DELAY);
            arr[start].setAttribute("style", "fill: #81C784; ");
            arr[end].setAttribute("style", "fill: #FFEE58; ");
            // Init start, end, mid var
            let mid = Math.floor(start + (end - start) / 2);
            arr[mid].setAttribute("style", "fill: #72A1EF; ");
            // Perform merge sort in 2 halves
            await this.sortBegin(arr, start, mid);
            await this.sortBegin(arr, mid + 1, end)
            // Call merge
            await this.merge(arr, start, mid, end)
            await VS.timeout((SortControl.abortController as AbortController).signal, this.DELAY);
            arr[start].removeAttribute("style");
            arr[mid].removeAttribute("style");
            arr[end].removeAttribute("style");
        }
        if (start === 0 && end === arr.length - 1) {
            await VS.traverseBlocks((SortControl.abortController as AbortController).signal,
                arr.length, arr);
            Utility.enableControl();
            SortControl.abortController = null;
        }
    }

    private async merge(arr: HTMLCollectionOf<HTMLElement>,
                        left: number, mid: number, right: number) {
        // Init a copy of arr: only object {height, id}
        let arrCopy = new Array(arr.length);
        let rect;
        for (let i = 0; i < arr.length; i++) {
            rect = arr[i].getBoundingClientRect();
            arrCopy[i] = {height: rect.height.toString(), id: arr[i].id};
        }
        // Traverse the copyArr, i: 1st half element, j: second one
        // If first half is out of scope
        // Else if second half is out of scope
        // Else if copyArr[i] > copyArr[j], assign copyArr[j] to arr
        // Else assign copyArr[i] to arr
        let i = left, j = mid+1;
        for (let k = left; k <= right; k++) {
            if (i > mid) {
                // arr[k] = arrCopy[j];
                this.modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id)
                j++;
            } else if (j > right) {
                // arr[k] = arrCopy[i];
                this.modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id)
                i++;
            } else if (parseInt(arrCopy[i].id) > parseInt(arrCopy[j].id)) {
                // arr[k] = arrCopy[j];
                this.modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id)
                j++;
            } else {
                // arr[k] = arrCopy[i];
                this.modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id)
                i++;
            }
        }
    }

    private modifyBlock(block: HTMLElement, updatedHeight: string, updatedId: string) {
        block.setAttribute("height", updatedHeight);
        block.setAttribute("id", updatedId);
    }
}


class QuickSortGraph extends SortGraph {
    constructor(nb: number, w: number, h: number) {
        super(nb, w, h);
    }

    /**
     * For visualization
     *  -   pivot block: #72A1EF
     *  -   jth block (partition): #81C784
     *  -   ith block (partition): #FFEE58
     */
    override sort(): void {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        let speed = VS.getDelay();
        // Disable control form
        Utility.disableControl();
        SortControl.abortController = new AbortController();
        this.sortBegin(speed, arr, 0, arr.length-1);
    }

    private async sortBegin(delay: number, arr: HTMLCollectionOf<HTMLElement>,
                            low: number, high: number) {
        // Take pivot as high
        // Until low >= high
        if (low < high) {
            // Call to partition func
            let pi: any =
                await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                            this.partition(delay, arr, low, high))
            // Call recursive func with high = pi-1
            await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                        this.sortBegin(delay, arr, low, pi - 1))
            // Call recursive func with low = pi+1
            await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                        this.sortBegin(delay, arr, pi + 1, high));
        }
        if (low === 0 && high === arr.length-1) {
            await VS.traverseBlocks((SortControl.abortController as AbortController).signal, arr.length, arr);
            Utility.enableControl();
            SortControl.abortController = null;
        }
    }

    private async partition(delay: number, arr: HTMLCollectionOf<HTMLElement>,
                            low: number, high: number) {
        arr[high].setAttribute("style", "fill: #72A1EF; ");
        let i = low-1;
        for (let j = low; j < high; j++) {
            arr[j].setAttribute("style", "fill: #81C784; ");
            if (parseInt(arr[j].id) < parseInt(arr[high].id)) {
                if (i >= 0) arr[i].removeAttribute("style");
                i++;
                if (i != j) arr[i].setAttribute("style", "fill: #FFEE58; ");
                await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                            VS.swap(arr[i], arr[j]));
                arr[i].setAttribute("style", "fill: #FFEE58; ");
                arr[j].setAttribute("style", "fill: #81C784; ");
            } else {
                await VS.timeout((SortControl.abortController as AbortController).signal, delay);
            }
            arr[j].removeAttribute("style");
        }
        if (i >= 0) arr[i].removeAttribute("style");
        arr[i+1].setAttribute("style", "fill: #72A1EF; ");
        // Swap the high (pivot) with i+1
        await VS.timeoutWithCallback((SortControl.abortController as AbortController).signal, delay,
                                    VS.swap(arr[i+1], arr[high]))
        arr[i+1].removeAttribute("style");
        arr[high].removeAttribute("style");
        return i+1;
    }
}


interface BlockProps {
    consumedWidth: string,
    id: string,
    boxWidth: number,
    boxHeight: number
}

function Block(props : BlockProps) {
    return (
        <g transform={`translate(${props.consumedWidth})`}>
            <rect id={props.id} className="block"
                width={props.boxWidth}
                height={props.boxHeight}></rect>
        </g>
    );
}


/**
 * A base class for sort-category base factory
 *
 * @method createGraph() return SortGraph product
*/
export abstract class BaseSortFactory {
    protected numBlocks: number;
    protected width: number;
    protected height: number;

    constructor(numBlocks: number, width: number, height: number) {
        this.numBlocks = numBlocks;
        this.width = width;
        this.height = height;
    }

    createGraph(): SortGraph | null {
        return null;
    }

    clear(): void {
        let graph = document.getElementById("graph") as HTMLElement;
        while(graph.firstChild) {
            graph.removeChild(graph.lastChild as ChildNode);
        }
    }

    set blocks(numBlocks: number) {
        this.numBlocks = numBlocks;
    }

    get blocks() {
        return this.numBlocks;
    }
}


export class SelectionSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new SelectionSortGraph(this.numBlocks, this.width, this.height);
    }
}


export class BubbleSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new BubbleSortGraph(this.numBlocks, this.width, this.height);
    }
}


export class HeapSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new HeapSortGraph(this.numBlocks, this.width, this.height);
    }
}


export class MergeSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new MergeSortGraph(this.numBlocks, this.width, this.height);
    }
}


export class QuickSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new QuickSortGraph(this.numBlocks, this.width, this.height);
    }
}


/**
 * Other helper functions
 */

/**
 * This function helps to collect the overall size of the graph
 * ([width, height])
 * @param setSvgSize set state function using for set the canvas size
 */
export function getGraphSize(setSvgSize: Dispatch<SetStateAction<[number, number]>>) {
    let canvas = document.getElementById("graph") as HTMLElement;
    setSvgSize([canvas.clientWidth, canvas.clientHeight * 0.85])
}
