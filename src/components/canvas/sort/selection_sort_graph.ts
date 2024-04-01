import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";

class SelectionSortGraph extends SortGraph {
  public minValColor = "#81C784";
  public trackingColor = "#FFEE58";

  constructor(nb: number, w: number, h: number) {
    super(nb, w, h);
  }

  /**
   * For the visualization:
   *  -   Tracking blocks color: #FFEE58
   *  -   Minimum value block color: #81C784
   */
  override sort(): void {
    console.log("Visualize selection sort");
    let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
    let speed = VS.getDelay();
    Utility.disableControl();
    SortControl.abortController = new AbortController();
    this.sortBegin(arr, speed);
  }

  private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay: number) {
    let l = arr.length;
    for (let n = 0; n < l; n++) {
      await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.findMin(arr, n, l - 1, delay)
      );
      if (n === l - 1) {
        // Remove the minimum value block's color when it reaches the last block
        // Enable control in the final move
        this.removeBlockColor(arr[l - 1]);
        await VS.traverseBlocks((SortControl.abortController as AbortController).signal, l, arr);
        Utility.enableControl();
        SortControl.abortController = null;
      }
    }
  }

  private async findMin(
    array: HTMLCollectionOf<HTMLElement>,
    start: number,
    end: number,
    delay: number
  ) {
    let min = array[start];
    this.setBlockColor(min, this.minValColor);
    // Remove the color in the previous block
    if (start > 0) {
      this.removeBlockColor(array[start - 1]);
    }

    for (let i = start + 1; i <= end; i++) {
      await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      // Track the running block
      this.removeBlockColor(array[i - 1]);
      this.setBlockColor(array[i], this.trackingColor);
      // Ensure the min block still keeps its color
      this.setBlockColor(min, this.minValColor);
      if (parseInt(array[i].id) < parseInt(min.id)) {
        this.removeBlockColor(min);
        min = array[i];
        this.setBlockColor(min, this.minValColor);
      }
      // Swap the minimum value with the first unsorted point
      if (i === end) {
        this.removeBlockColor(array[end]);
        VS.swap(array[start], min);
      }
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
