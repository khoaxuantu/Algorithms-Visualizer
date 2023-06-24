import { Dispatch, SetStateAction } from "react";


abstract class SortGraph {
    protected numBlocks: number;
    protected width: number;
    protected height: number;
    URINamespace: string = "http://www.w3.org/2000/svg";

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
    protected createBlockList(): number[] {
        let arr = new Array(this.numBlocks)
        for (let i = 0; i < this.numBlocks; i++) {
            arr[i] = i+1;
        }
        arr = arr.sort(() => Math.random() - 0.5);
        return arr;
    }
}


abstract class BaseSortFactory {
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
}


export class SelectionSortFactory extends BaseSortFactory {
    constructor(numBlocks: number, width: number, height: number) {
        super(numBlocks, width, height);
    }

    override createGraph(): SortGraph {
        return new SelectionSortGraph(this.numBlocks, this.width, this.height);
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
                                id={(index+1).toString()}
                                consumedWidth={curWidth.toString()}
                                boxWidth={boxWidth}
                                boxHeight={this.boxHeight(num)} />
                })}
            </>
        );
    }

    override sort(): void {

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

// This function helps to collect the overall size of the graph
// ([width, height])
export function getGraphSize(setSvgSize: Dispatch<SetStateAction<[number, number]>>) {
    let canvas = document.getElementById("graph") as HTMLElement;
    setSvgSize([canvas.clientWidth, canvas.clientHeight * 0.85])
}
