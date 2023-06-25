export class Utility {
    private static enableFirstNode: string[] = [
        "sizeControl", "speedControl", "play"
    ];
    private static disableFirstNode: string[] = ['reset'];

    static enableControl() {
        this.enableFirstNode.forEach(name => {
            new EnableNode(name).changeActiveState();
        })
        this.disableFirstNode.forEach(name => {
            new DisableNode(name).changeActiveState();
        })
    }

    static disableControl() {
        this.enableFirstNode.forEach(name => {
            new DisableNode(name).changeActiveState();
        })
        this.disableFirstNode.forEach(name => {
            new EnableNode(name).changeActiveState();
        })
    }
}


abstract class ActiveStateHandler {
    protected node: HTMLInputElement | HTMLCollection;

    constructor(name: string) {
        this.node = document.getElementById(name) as HTMLInputElement | HTMLCollection;
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
        let nodeCollection = this.node as HTMLCollection;
        let node;
        for (let i = 0; i < nodeCollection.length; i++) {
            node = nodeCollection[i] as HTMLInputElement;
            node.disabled = true;
        }
    }

    override changeActiveState(): void {
        if (this.node instanceof HTMLCollection) this.disableByGroup();
        else if (this.node instanceof HTMLInputElement) this.disableById();
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
        let nodeCollection = this.node as HTMLCollection;
        let node;
        for (let i = 0; i < nodeCollection.length; i++) {
            node = nodeCollection[i] as HTMLInputElement;
            node.disabled = false;
        }
    }

    override changeActiveState(): void {
        if (this.node instanceof HTMLCollection) this.endableByGroup();
        else if (this.node instanceof HTMLInputElement) this.endableById();
    }
}
