import ControlBox from "@/components/control";
import { SortGraph } from "@/components/canvas/sort_graph";
import { Utility } from "../util";

export default function SortLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="row">
            {/* TODO canvas */}
            <div id="simulation" className="container my-3 col-xl-10 border-end"
                style={{ height: "44rem" }}>
                <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                    {children}
                </svg>
            </div>
            <ControlBox category="sort" />
        </div>
    );
}
