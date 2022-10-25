import { graph } from "../GraphFactory/graph.js";


// Create a factory for node graph
export class NodeGraphFactory extends graph
{
    constructor(width, height, URInamespace)
    {
        super(width, height);
        this.ns = URInamespace;
    }

    createGraph()
    {
        return new NodeGraph(this.w, this.h, this.ns);
    }
}


class NodeGraph
{

}