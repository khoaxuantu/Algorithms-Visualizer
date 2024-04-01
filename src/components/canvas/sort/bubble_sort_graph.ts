import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";

class BubbleSortGraph extends SortGraph {
  public trackingColor: string = "#515A5A";

  constructor(nb: number, w: number, h: number) {
    super(nb, w, h);
  }

  override sort(): void {
    console.log("Visualize bubble sort");
    let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
    let speed = VS.getDelay();

    Utility.disableControl();
    SortControl.abortController = new AbortController();
    this.sortBegin(arr, speed);
  }

  private async sortBegin(arr: HTMLCollectionOf<HTMLElement>, delay: number) {
    let l = arr.length;
    for (let n = 0; n < l; n++) {
      this.setBlockColor(arr[0], this.trackingColor);
      if (n < l - 1) {
        for (let i = 0; i < l - n - 1; i++) {
          // Keep track the running block
          // console.log("Inner " + i.toString() + ": " + (i * delay).toString());
          await VS.timeout((SortControl.abortController as AbortController).signal, delay);
          if (parseInt(arr[i].id) > parseInt(arr[i + 1].id)) {
            VS.swap(arr[i], arr[i + 1]);
          } else {
            this.removeBlockColor(arr[i]);
            this.setBlockColor(arr[i + 1], this.trackingColor);
          }
          // Return default color at the end of the inner iteration
          if (i === l - n - 2) {
            await VS.timeout((SortControl.abortController as AbortController).signal, delay);
            arr[i + 1].removeAttribute("style");
          }
        }
      } else {
        await VS.timeout((SortControl.abortController as AbortController).signal, delay);
        arr[0].removeAttribute("style");
      }
      await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      if (n === l - 1) {
        await VS.traverseBlocks((SortControl.abortController as AbortController).signal, l, arr);
        Utility.enableControl();
        SortControl.abortController = null;
      }
    }
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
