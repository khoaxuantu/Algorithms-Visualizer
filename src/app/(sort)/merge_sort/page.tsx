import { Metadata } from "next";
import MergeSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Merge'
}

export default function MergeSortPage() {
    return <MergeSortDetail />;
}
