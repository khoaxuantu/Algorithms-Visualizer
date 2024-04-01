import { Utility } from "@/helpers/util";
import { BaseSortFactory, SortGraph } from "./sort_graph";
import { SortControl } from "@/components/control";
import * as VS from "@/helpers/visualize_helpers";

class InsertionSortGraph extends SortGraph {
  public curBlockColor: string;
  public prevBlockColor: string;

  constructor(nb: number, w: number, h: number) {
    super(nb, w, h);
    this.curBlockColor = "#81C784";
    this.prevBlockColor = "#FFEE58";
  }

  override sort(): void {
    console.log("Visualize insertion sort");
    let arr = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLElement>;
    let speed = VS.getDelay();
    Utility.disableControl();
    SortControl.abortController = new AbortController();
    this.sortBegin(speed, arr);
  }

  private async sortBegin(delay: number, arr: HTMLCollectionOf<HTMLElement>) {
    for (let i = 1; i < arr.length; i++) {
      await VS.timeout((SortControl.abortController as AbortController).signal, delay);

      let tmpIdx = i;
      this.setBlockColor(arr[i], this.curBlockColor);
      while (tmpIdx > 0 && parseInt(arr[tmpIdx].id) < parseInt(arr[tmpIdx - 1].id)) {
        this.setBlockColor(arr[tmpIdx - 1], this.prevBlockColor);
        await VS.timeout((SortControl.abortController as AbortController).signal, delay);

        VS.swap(arr[tmpIdx], arr[tmpIdx - 1]);

        await VS.timeout((SortControl.abortController as AbortController).signal, delay);
        this.removeBlockColor(arr[tmpIdx]);
        tmpIdx--;
      }
      await VS.timeout((SortControl.abortController as AbortController).signal, delay);
      this.removeBlockColor(arr[tmpIdx]);

      if (i === arr.length - 1) {
        await VS.traverseBlocks(
          (SortControl.abortController as AbortController).signal,
          arr.length,
          arr
        );
        Utility.enableControl();
        SortControl.abortController = null;
      }
    }
  }
}

export class InsertionSortFactory extends BaseSortFactory {
  constructor(numBlocks: number, width: number, height: number) {
    super(numBlocks, width, height);
  }

  override createGraph(): SortGraph {
    return new InsertionSortGraph(this.numBlocks, this.width, this.height);
  }
}
