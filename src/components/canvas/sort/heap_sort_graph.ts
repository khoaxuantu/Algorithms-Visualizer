import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";

class HeapSortGraph extends SortGraph {
  public trackingColor: string = "#72A1EF";
  public largestPerHeapifyColor: string = "#81C784";
  public indexPerHeapifyColor: string = "#FFEE58";

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
    console.log("Visualize heap sort");
    let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
    let speed = VS.getDelay();

    // Disable control form and enable the reset button
    Utility.disableControl();
    SortControl.abortController = new AbortController();
    this.sortBegin(arr, speed);
  }

  private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay: number) {
    // Modify the array to maxHeap-like structure
    for (let i = arr.length / 2 - 1; i >= 0; i--) {
      // arr[0].setAttribute("style", "fill: #72A1EF;";)
      // Each call to heapify need to be delay {delay}ms
      await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.heapify(arr, arr.length, i, delay)
      );
    }
    // Start from the last index
    // Call heapify func until index = 0
    let l = arr.length - 1;
    while (l > 0) {
      this.setBlockColor(arr[0], this.trackingColor);
      // Each call to heapify need to be delay {delay}ms, maintain the maxHeap-like structure
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          VS.swap(arr[0], arr[l]);
          resolve(this.heapify(arr, l, 0, delay));
        }, delay);
        (SortControl.abortController as AbortController).signal.addEventListener("abort", () => {
          clearTimeout(timeout);
        });
      });
      this.removeBlockColor(arr[l]);
      l--;
    }
    await VS.traverseBlocks(
      (SortControl.abortController as AbortController).signal,
      arr.length,
      arr
    );
    // Enable control after all steps are finished
    Utility.enableControl();
    SortControl.abortController = null;
  }

  private async heapify(
    arr: HTMLCollectionOf<HTMLElement>,
    heapSize: number,
    curIndex: number,
    delay: number
  ) {
    // Take the curIndex (root) as largestIndex
    let largestIndex = curIndex;
    this.setBlockColor(arr[largestIndex], this.indexPerHeapifyColor);
    // Take left and right node indices
    let leftIndex = curIndex * 2 + 1;
    let rightIndex = curIndex * 2 + 2;
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
    this.setBlockColor(arr[largestIndex], this.largestPerHeapifyColor);
    // If the largestIndex is not a root
    // Swap with root
    // Call recurively to the affected subtree
    if (curIndex != largestIndex) {
      await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      VS.swap(arr[curIndex], arr[largestIndex]);

      await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      // Remove color
      this.removeBlockColor(arr[curIndex]);
      this.removeBlockColor(arr[largestIndex]);
      await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.heapify(arr, heapSize, largestIndex, delay)
      );
    }
    // Remove color
    else {
      this.removeBlockColor(arr[curIndex]);
      this.removeBlockColor(arr[largestIndex]);
    }
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
