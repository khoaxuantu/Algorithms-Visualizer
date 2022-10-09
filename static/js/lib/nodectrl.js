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
}

// Enable control
export function enableControl() {
    let sizeControl = new enableNode("sizeControl");
    sizeControl.endableByGroup();

    let speedControl = new enableNode("speedControl");
    speedControl.endableByGroup();
}