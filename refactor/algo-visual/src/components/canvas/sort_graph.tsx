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
        return null;
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

    override draw(): JSX.Element | null | undefined {
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
