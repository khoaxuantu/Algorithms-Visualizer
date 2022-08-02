/**
 * Graph production
 */

class graph
{
    constructor (width, height)
    {
        this.w = width;
        this.h = height;
    }
}


// Create a factory for block graph
export class BlockGraphFactory extends graph
{
    constructor (numBlocks, width, height, URInamespace)
    {
        super(width, height);
        this.nb = numBlocks;
        this.ns = URInamespace;
    }

    // Create new graph object
    createGraph()
    {
        return new BlockGraph(this.nb ,this.w, this.h, this.ns);
    }

    // Clear the existing graph
    clearGraph()
    {
        let graph = document.getElementById("graph");
        while(graph.firstChild)
        {
            graph.removeChild(graph.lastChild);
        }
    }
}


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


// Implement the graph product
export class BlockGraph
{
    constructor(numBlocks, width, height, URInamespace)
    {
        this.numBlocks = numBlocks;
        this.width = width;
        this.height = height;
        this.ns = URInamespace;
    }

    // Specify the width of a box
    boxWidth()
    {
        var boxWidth;
        if (this.numBlocks < 5) {
            boxWidth = 100;
        }
        else
        {
            boxWidth = this.width / this.numBlocks;
        }

        return boxWidth;
    }

    // Specify the height of a box
    boxHeight(value)
    {
        var boxHeight;
        boxHeight = (value * this.height) / this.numBlocks;

        return boxHeight;
    }

    draw()
    {
        const field = document.getElementById("graph");
        // Store the horizontal distance which has been taken place
        var consumedWidth = 0;
        // Specify the width of a block
        var boxWidth = this.boxWidth();
        // Generate blocks with appropriate value
        for (let i = 0; i < this.numBlocks; i++) {
            // Get the value of the box randomly
            var value = Math.floor(Math.random() * this.numBlocks) + 1;
            // Specify the height of a block
            var boxHeight = this.boxHeight(value);
            //console.log(boxHeight)

            // Create a block
            const g = document.createElementNS(this.ns, 'g');
            g.setAttribute('transform', "translate(" + consumedWidth.toString() + ")");

            const block = document.createElementNS(this.ns, 'rect');
            block.setAttribute('id', value.toString());
            block.setAttribute('class', 'block');
            block.setAttribute('width', boxWidth.toString());
            block.setAttribute('height', boxHeight.toString());

            consumedWidth += boxWidth;

            g.appendChild(block)
            field.appendChild(g);
        }
    }
}


class NodeGraph
{

}