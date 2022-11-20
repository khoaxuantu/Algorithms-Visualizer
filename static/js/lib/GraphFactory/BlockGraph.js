import { graph } from "../GraphFactory/graph.js";


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


// Implement the graph product
class BlockGraph
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
        // Set array values and shuffling
        let arr = new Array(this.numBlocks)
        for (let i = 0; i < this.numBlocks; i++) {
            arr[i] = i+1;
        }
        const shuffleArr = (arr) => arr.sort(() => Math.random() - 0.5);
        shuffleArr(arr);
        // Generate blocks with appropriate value
        for (let i = 0; i < this.numBlocks; i++) {
            // // Get the value of the box randomly (Archive)
            // var value = Math.floor(Math.random() * this.numBlocks) + 1;

            // Specify the height of a block
            var boxHeight = this.boxHeight(arr[i]);
            //console.log(boxHeight)

            // Create a block
            const g = document.createElementNS(this.ns, 'g');
            g.setAttribute('transform', "translate(" + consumedWidth.toString() + ")");

            const block = document.createElementNS(this.ns, 'rect');
            block.setAttribute('id', arr[i].toString());
            block.setAttribute('class', 'block');
            block.setAttribute('width', boxWidth.toString());
            block.setAttribute('height', boxHeight.toString());

            consumedWidth += boxWidth;

            g.appendChild(block)
            field.appendChild(g);
        }
    }
}