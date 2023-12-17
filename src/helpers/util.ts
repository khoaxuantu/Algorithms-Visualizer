export class Utility {
    private static enableFirstNodes: string[] = [
        "sizeControl", "speedControl", "play", "spd-opt"
    ];
    private static disableFirstNodes: string[] = ['reset'];

    static enableControl() {
        this.enableFirstNodes.forEach(name => {
            new EnableNode(name).changeActiveState();
        })
        this.disableFirstNodes.forEach(name => {
            new DisableNode(name).changeActiveState();
        })
    }

    static disableControl() {
        this.enableFirstNodes.forEach(name => {
            new DisableNode(name).changeActiveState();
        })
        this.disableFirstNodes.forEach(name => {
            new EnableNode(name).changeActiveState();
        })
    }
}


abstract class ActiveStateHandler {
    protected node: HTMLElement;

    constructor(name: string) {
        this.node = document.getElementById(name) as HTMLElement;
    }

    changeActiveState() {}
}


class DisableNode extends ActiveStateHandler {
    constructor(name: string) {
        super(name)
    }

    disableById() {
        let curNode = this.node as HTMLInputElement;
        curNode.disabled = true;
    }

    disableByGroup() {
        let nodeCollection = this.node.children as HTMLCollection;
        let node;
        for (let i = 0; i < nodeCollection.length; i++) {
            node = nodeCollection[i] as HTMLInputElement;
            node.disabled = true;
        }
    }

    override changeActiveState(): void {
        if (this.node.children.length > 0) this.disableByGroup();
        else this.disableById();
    }
}


class EnableNode extends ActiveStateHandler {
    constructor(name: string) {
        super(name);
    }

    endableById() {
        let node = this.node as HTMLInputElement;
        node.disabled = false;
    }

    endableByGroup() {
        let nodeCollection = this.node.children as HTMLCollection;
        let node;
        for (let i = 0; i < nodeCollection.length; i++) {
            node = nodeCollection[i] as HTMLInputElement;
            node.disabled = false;
        }
    }

    override changeActiveState(): void {
        if (this.node.children.length > 0) this.endableByGroup();
        else this.endableById();
    }
}

/**
 * Get speed factor from the option group
 * @returns speed factor option: x1, x10, x100
 */
export function getSpeedOption() {
    let speedOptList = document.getElementsByName('spd-opt');
    for (let i = 0; i < speedOptList.length; i++) {
        const curSpeedOpt = speedOptList[i] as HTMLInputElement;
        if (curSpeedOpt.checked) {
            return parseInt(curSpeedOpt.value);
        }
    }
}
