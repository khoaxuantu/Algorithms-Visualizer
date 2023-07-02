import { Metadata } from "next";
import QuickSortDetail from "./detail";

export const metadata: Metadata = {
    title: 'Quick'
}

export default function QuickSortPage() {
    return <QuickSortDetail />;
}
