import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";
import SFX from "@/components/sfx";

class MergeSortGraph extends SortGraph {
  private DELAY: number = 0;
  public midBlockColor: string = "#72A1EF";
  public startBlockColor: string = "#81C784";
  public endBlockColor: string = "#FFEE58";
  public mergeBlockColor: string = "#515A5A";

  constructor(nb: number, w: number, h: number) {
    super(nb, w, h);
  }

  /**
   * For visualization
   *  -   Mid block: #72A1EF
   *  -   Start block: #81C784
   *  -   End block: #FFEE58
   *  -   Merge block: #515A5A
   */
  override sort(): void {
    console.log("Visualize merge sort");
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
      this.setBlockColor(arr[start], this.startBlockColor);
      this.setBlockColor(arr[end], this.endBlockColor);
      // Init start, end, mid var
      let mid = Math.floor(start + (end - start) / 2);
      this.setBlockColor(arr[mid], this.midBlockColor);
      // Perform merge sort in 2 halves
      await this.sortBegin(arr, start, mid);
      await this.sortBegin(arr, mid + 1, end);
      // Call merge
      await VS.timeout((SortControl.abortController as AbortController).signal, this.DELAY);
      await this.merge(arr, start, mid, end);
      this.removeBlockColor(arr[start]);
      this.removeBlockColor(arr[mid]);
      this.removeBlockColor(arr[end]);
    }
    if (start === 0 && end === arr.length - 1) {
      await VS.traverseBlocks(
        (SortControl.abortController as AbortController).signal,
        arr.length,
        arr
      );
      Utility.enableControl();
      SortControl.abortController = null;
    }
  }

  private async merge(
    arr: HTMLCollectionOf<HTMLElement>,
    left: number,
    mid: number,
    right: number
  ) {
    // Init a copy of arr: only object {height, id}
    let arrCopy = new Array(arr.length);
    let rect;
    for (let i = 0; i < arr.length; i++) {
      rect = arr[i].getBoundingClientRect();
      arrCopy[i] = { height: rect.height.toString(), id: arr[i].id };
    }
    // Traverse the copyArr, i: 1st half element, j: second one
    // If first half is out of scope
    // Else if second half is out of scope
    // Else if copyArr[i] > copyArr[j], assign copyArr[j] to arr
    // Else assign copyArr[i] to arr
    let i = left,
      j = mid + 1;
    for (let k = left; k <= right; k++) {
      this.setBlockColor(arr[k], this.mergeBlockColor);
      if (i > mid) {
        // arr[k] = arrCopy[j];
        this.modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id);
        j++;
      } else if (j > right) {
        // arr[k] = arrCopy[i];
        this.modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id);
        i++;
      } else if (parseInt(arrCopy[i].id) > parseInt(arrCopy[j].id)) {
        // arr[k] = arrCopy[j];
        this.modifyBlock(arr[k], arrCopy[j].height, arrCopy[j].id);
        j++;
      } else {
        // arr[k] = arrCopy[i];
        this.modifyBlock(arr[k], arrCopy[i].height, arrCopy[i].id);
        i++;
      }
      await VS.timeout((SortControl.abortController as AbortController).signal, this.DELAY);
      this.removeBlockColor(arr[k]);
    }
  }

  private modifyBlock(block: HTMLElement, updatedHeight: string, updatedId: string) {
    SFX.init().play();
    block.setAttribute("height", updatedHeight);
    block.setAttribute("id", updatedId);
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
