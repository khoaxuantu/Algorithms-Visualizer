'use client'

type AlgoCategory = "sort" | "search"

interface controlProps {
    category: AlgoCategory
}

function ControlBox(props: controlProps): JSX.Element {
    let Control = decideControlBox(props.category);

    return (
        <form id="control" className="control-box border-start col-xl-2 py-3">
            {Control}
        </form>
    );
}

function decideControlBox(category: AlgoCategory) {
    let box;
    switch (category) {
        case "sort":
            box = <SortControlBox />
            break;

        case "search":

            break;
    }

    return box;
}

function SortControlBox() {
    return (
        <>
            <div className="p-2">
                <button id="play" type="button" className="btn btn-success me-1">Play</button>
                <button id="reset" type="button" className="btn btn-danger" disabled>Reset</button>
            </div>
            <div className="p-2">
                <label htmlFor="inputSize">Input Size</label>
                <div className="d-flex flex-row" id="sizeControl">
                    <input className="me-1 w-75" id="inputSize" type="number" name="size" min="1" max="1000" autoComplete="off" defaultValue="50" />
                    <button type="button" className="btn btn-info w-25" id="submitSize">Draw</button>
                </div>
            </div>
            <div className="p-2" id="speedControl">
                <label htmlFor="speedSlider">Speed</label>
                <input type="range" className="form-range" min="0" max="100" step="5" defaultValue="50" id="speedSlider" data-bs-toggle="popover" data-bs-trigger="hover focus" />
                <div className="btn-group w-100" role="group" aria-label="Speed Option">
                    <input type="radio" className="btn-check" name="spd-opt" id="x1" value="1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-light" htmlFor="x1">x1</label>
                    <input type="radio" className="btn-check" name="spd-opt" id="x10" value="10" autoComplete="off" />
                    <label className="btn btn-outline-light" htmlFor="x10">x10</label>
                    <input type="radio" className="btn-check" name="spd-opt" id="x100" value="100" autoComplete="off" />
                    <label className="btn btn-outline-light" htmlFor="x100">x100</label>
                </div>
            </div>
        </>
    )
}

export default ControlBox;
