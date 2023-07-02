import { Metadata } from "next";
import HeapSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Heap'
}

export default function HeapSortPage() {
    return <HeapSortDetail />
}
