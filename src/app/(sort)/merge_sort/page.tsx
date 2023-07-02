import { Metadata } from "next";
import MergeSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Merge',
    description: 'A visualization of merge sort',
    openGraph: {
        title: 'Merge Sort',
        description: 'A visualization of merge sort.',
        type: 'website',
        url: 'https://algovisual.xuankhoatu.com/merge_sort'
    }
}

export default function MergeSortPage() {
    return (
        <>
            <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                <MergeSortDetail />
            </svg>
            <div className="p-5 text-center fs-5">
                <i>Merge Sort</i>
            </div>
        </>
    );
}
