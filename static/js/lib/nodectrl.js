/**
 * Custom DOM control
 */

// Disable DOM elements
// In elements' specified id
/**
 * @param {String} name - id name
 */
export class disableNode
{
    constructor(name)
    {
        this.name = name;
    }

    disableById()
    {
        let id = document.getElementById(this.name);
        id.disabled = true;
    }

    disableByGroup()
    {
        let id = document.getElementById(this.name).children;
        for (let i = 0; i < id.length; i++)
        {
            id[i].disabled = true;
        }
    }
}

// Enable DOM elements
// In elements' specified id
/**
 * @param {String} name - id name
 */
export class enableNode
{
    constructor(name)
    {
        this.name = name
    }

    endableById()
    {
        let id = document.getElementById(this.name);
        id.disabled = false;
    }

    endableByGroup()
    {
        // console.log("Enable control");
        let id = document.getElementById(this.name).children;
        for (let i = 0; i < id.length; i++)
        {
            id[i].disabled = false;
        }
    }
}

// Disable control
export function disableControl() {
    let sizeControl = new disableNode("sizeControl");
    sizeControl.disableByGroup();

    let speedControl = new disableNode("speedControl");
    speedControl.disableByGroup();

    let playBtn = new disableNode("play");
    playBtn.disableById();
    
    let resetBtn = new enableNode("reset");
    resetBtn.endableById();
}

// Enable control
export function enableControl() {
    let sizeControl = new enableNode("sizeControl");
    sizeControl.endableByGroup();

    let speedControl = new enableNode("speedControl");
    speedControl.endableByGroup();

    let playBtn = new enableNode("play");
    playBtn.endableById();

    let resetBtn = new disableNode("reset");
    resetBtn.disableById();
}