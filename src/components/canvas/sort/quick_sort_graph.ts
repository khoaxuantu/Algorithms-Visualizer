import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";

class QuickSortGraph extends SortGraph {
  public pivotBlockColor: string = "#72A1EF";
  public jthBlockColor: string = "#81C784";
  public ithBlockColor: string = "#FFEE58";

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
    console.log("Visualize quick sort");
    let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
    let speed = VS.getDelay();
    // Disable control form
    Utility.disableControl();
    SortControl.abortController = new AbortController();
    this.sortBegin(speed, arr, 0, arr.length - 1);
  }

  private async sortBegin(
    delay: number,
    arr: HTMLCollectionOf<HTMLElement>,
    low: number,
    high: number
  ) {
    // Take pivot as high
    // Until low >= high
    if (low < high) {
      // Call to partition func
      let pi: any = await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.partition(delay, arr, low, high)
      );
      // Call recursive func with high = pi-1
      await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.sortBegin(delay, arr, low, pi - 1)
      );
      // Call recursive func with low = pi+1
      await VS.timeoutWithCallback(
        (SortControl.abortController as AbortController).signal,
        delay,
        this.sortBegin(delay, arr, pi + 1, high)
      );
    }
    if (low === 0 && high === arr.length - 1) {
      await VS.traverseBlocks(
        (SortControl.abortController as AbortController).signal,
        arr.length,
        arr
      );
      Utility.enableControl();
      SortControl.abortController = null;
    }
  }

  private async partition(
    delay: number,
    arr: HTMLCollectionOf<HTMLElement>,
    low: number,
    high: number
  ) {
    this.setBlockColor(arr[high], this.pivotBlockColor);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      this.setBlockColor(arr[j], this.jthBlockColor);
      if (parseInt(arr[j].id) < parseInt(arr[high].id)) {
        if (i >= 0) this.removeBlockColor(arr[i]);
        i++;
        if (i != j) this.setBlockColor(arr[i], this.ithBlockColor);
        await VS.timeoutWithCallback(
          (SortControl.abortController as AbortController).signal,
          delay,
          VS.swap(arr[i], arr[j])
        );
        this.setBlockColor(arr[i], this.ithBlockColor);
        this.setBlockColor(arr[j], this.jthBlockColor);
      } else {
        await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      }
      this.removeBlockColor(arr[j]);
    }
    if (i >= 0) this.removeBlockColor(arr[i]);
    this.setBlockColor(arr[i + 1], this.pivotBlockColor);
    // Swap the high (pivot) with i+1
    await VS.timeoutWithCallback(
      (SortControl.abortController as AbortController).signal,
      delay,
      VS.swap(arr[i + 1], arr[high])
    );
    this.removeBlockColor(arr[i + 1]);
    this.removeBlockColor(arr[high]);
    return i + 1;
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
