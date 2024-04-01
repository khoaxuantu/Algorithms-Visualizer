import { Dispatch, SetStateAction } from "react";

interface BlockProps {
  consumedWidth: string;
  id: string;
  boxWidth: number;
  boxHeight: number;
}

function Block(props: BlockProps) {
  return (
    <g transform={`translate(${props.consumedWidth})`}>
      <rect id={props.id} className="block" width={props.boxWidth} height={props.boxHeight}></rect>
    </g>
  );
}

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

  static getGraphSize(setSvgSize: Dispatch<SetStateAction<[number, number]>>) {
    let canvas = document.getElementById("graph") as HTMLElement;
    setSvgSize([canvas.clientWidth, canvas.clientHeight * 0.85])
  }

  constructor(numBlocks: number, width: number, height: number) {
    this.numBlocks = numBlocks;
    this.width = width;
    this.height = height;
  }

  set blocks(numBlocks: number) {
    this.numBlocks = numBlocks;
  }

  get blocks() {
    return this.numBlocks;
  }

  sort(): void {
    throw Error("🚀 ~ file: sort_graph.tsx:38 ~ SortGraph ~ sort: Please override the sort method");
  }

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
          return (
            <Block
              key={index}
              id={num.toString()}
              consumedWidth={curWidth.toString()}
              boxWidth={boxWidth}
              boxHeight={this.boxHeight(num)}
            />
          );
        })}
      </>
    );
  }

  // Set array values and shuffling method
  createBlockList(): number[] {
    let arr = new Array(this.numBlocks);
    for (let i = 0; i < this.numBlocks; i++) {
      arr[i] = i + 1;
    }
    arr = arr.sort(() => Math.random() - 0.5);
    return arr;
  }

  protected setBlockColor(block: HTMLElement, color: string) {
    block.setAttribute("style", `fill: ${color} `);
  }

  protected removeBlockColor(block: HTMLElement) {
    block.removeAttribute("style");
  }

  // Specify the width of a box
  protected boxWidth() {
    var boxWidth;
    if (this.numBlocks < 5) {
      boxWidth = 100;
    } else {
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
