'use client'

import { Utility } from "@/app/util";
import { BaseSortFactory, SortGraph } from "./canvas/sort_graph";

type AlgoCategory = "sort" | "search"

interface controlProps {
    category: AlgoCategory
}

function ControlBox(props: controlProps): JSX.Element {
    let Control = decideControlBox(props.category);

    return (
        <form id="control" className="control-box border-start col-xl-2 py-3">
            {Control}
        </form>
    );
}

function decideControlBox(category: AlgoCategory) {
    let box;
    switch (category) {
        case "sort":
            box = <SortControlBox />
            break;

        case "search":

            break;
    }

    return box;
}

function SortControlBox() {
    return (
        <>
            <div className="p-2">
                <button id="play" type="button" className="btn btn-success me-1">Play</button>
                <button id="reset" type="button" className="btn btn-danger" disabled>Reset</button>
            </div>
            <div className="p-2">
                <label htmlFor="inputSize">Input Size</label>
                <div className="d-flex flex-row" id="sizeControl">
                    <input className="me-1 w-75" id="inputSize" type="number" name="size" min="1" max="1000" autoComplete="off" defaultValue="50" />
                    <button type="button" className="btn btn-info w-25" id="submitSize">Draw</button>
                </div>
            </div>
            <div className="p-2" id="speedControl">
                <label htmlFor="speedSlider">Speed</label>
                <input type="range" className="form-range" min="0" max="100" step="5" defaultValue="50" id="speedSlider" data-bs-toggle="popover" data-bs-trigger="hover focus" />
                <div className="btn-group w-100" role="group" aria-label="Speed Option">
                    <input type="radio" className="btn-check" name="spd-opt" id="x1" value="1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-light" htmlFor="x1">x1</label>
                    <input type="radio" className="btn-check" name="spd-opt" id="x10" value="10" autoComplete="off" />
                    <label className="btn btn-outline-light" htmlFor="x10">x10</label>
                    <input type="radio" className="btn-check" name="spd-opt" id="x100" value="100" autoComplete="off" />
                    <label className="btn btn-outline-light" htmlFor="x100">x100</label>
                </div>
            </div>
        </>
    )
}


export class SortControl {
    static abortController: null | AbortController = null;
    static maxBlocks = 1000;

    /**
     * Add all needed control handler: reset, draw
     * @param factory - current graph factory
     * @param setGraph - a set state function using for setting graph
     */
    static addHandler(factory: BaseSortFactory, graph: SortGraph, setGraph: any) {
        this.addResetHandler(factory, setGraph);
        this.addDrawHandler(factory, setGraph);
        return this.addStartHandler(graph);
    }

    static addStartHandler(graph: SortGraph) {
        const playBtn = document.getElementById('play') as HTMLElement;
        const handler = () => {
            graph.sort();
        }
        playBtn.addEventListener("click", handler);
        return handler;
    }

    static removeStartHandler(handler: () => void) {
        const playBtn = document.getElementById('play') as HTMLElement;
        playBtn?.removeEventListener("click", handler);
    }

    static addResetHandler(factory: BaseSortFactory, setGraph: any) {
        const resetBtn = document.getElementById('reset') as HTMLElement;
        resetBtn.addEventListener("click", () => {
            this.checkAbortController();
            this.resetGraphColor();
            setGraph(factory.createGraph());
            Utility.enableControl();
        })
    }

    private static resetGraphColor() {
        let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < arr.length; i++) {
            arr[i].removeAttribute("style");
        }
    }

    static addDrawHandler(factory: BaseSortFactory, setGraph: any) {
        const submitSize = document.getElementById("submitSize") as HTMLElement;
        submitSize.addEventListener("click", handler);
        (document.getElementById('control') as HTMLElement).addEventListener("submit", (e) => {
            e.preventDefault();
            handler();
        });

        function handler() {
            const newBlocks = parseInt((document.getElementById("inputSize") as HTMLInputElement).value);
            if (!validateBlocks(newBlocks)) return;
            factory.blocks = newBlocks;
            setGraph(factory.createGraph());
        }

        function validateBlocks(blocks: number) {
            if (blocks > SortControl.maxBlocks) {
                alert(`Value must be less than or equal to ${SortControl.maxBlocks}`);
                return false;
            }
            return true
        }
    }

    private static checkAbortController() {
        if (this.abortController as AbortController) {
            this.abortController?.abort();
            this.abortController = null;
        }
    }
}


export default ControlBox;
