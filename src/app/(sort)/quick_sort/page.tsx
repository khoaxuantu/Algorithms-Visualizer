import { Metadata } from "next";
import QuickSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Quick'
}

export default function QuickSortPage() {
    return (
        <>
            <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                <QuickSortDetail />
            </svg>
            <div className="p-5 text-center fs-5">
                <i>Quick Sort</i>
            </div>
        </>
    );
}
