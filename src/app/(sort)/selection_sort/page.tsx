import SelectionSortDetail from "./detail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Selection",
    description: 'A visualization of selection sort.',
    openGraph: {
        title: 'Selection Sort',
        description: 'A visualization of selection sort.',
        type: 'website',
        url: 'https://algovisual.xuankhoatu.com/selection_sort'
    }
}

export default function SelectionSortPage() {
    return (
        <>
            <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                <SelectionSortDetail />
            </svg>
            <div className="p-5 text-center fs-5">
                <i>Selection Sort</i>
            </div>
        </>
    );
}
