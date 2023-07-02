import { Metadata } from "next";
import HeapSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Heap',
    description: 'A visualization of heap sort.',
    openGraph: {
        title: 'Heap Sort',
        description: 'A visualization of heap sort',
        type: 'website',
        url: 'https://algovisual.xuankhoatu.com/heap_sort'
    }
}

export default function HeapSortPage() {
    return (
        <>
            <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                <HeapSortDetail />
            </svg>
            <div className="p-5 text-center fs-5">
                <i>Heap Sort</i>
            </div>
        </>
    );
}
