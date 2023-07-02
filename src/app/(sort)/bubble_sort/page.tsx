import { Metadata } from "next";
import BubbleSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Bubble'
}

export default function BubbleSortPage() {
    return <BubbleSortDetail />
}
