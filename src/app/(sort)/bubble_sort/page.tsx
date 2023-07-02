import { Metadata } from "next";
import BubbleSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Bubble',
    description: 'A visualization of bubble sort.',
    openGraph: {
        title: 'Bubble Sort',
        description: 'A visualization of bubble sort.',
        type: 'website',
        url: 'https://algovisual.xuankhoatu.com/bubble_sort'
    }
}

export default function BubbleSortPage() {
    return (
        <>
            <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
                <BubbleSortDetail />
            </svg>
            <div className="p-5 text-center fs-5">
                <i>Bubble Sort</i>
            </div>
        </>
    );
}
