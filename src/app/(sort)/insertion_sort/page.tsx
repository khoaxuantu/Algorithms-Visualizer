import { Metadata } from "next"
import InsertionSortDetail from "./detail"

export const metadata: Metadata = {
  title: 'Insertion',
  description: 'A visualization of insertion sort.',
  openGraph: {
    title: 'Insertion sort',
    description: 'A visualization of insertion sort.',
    type: 'website',
    url: 'https://algovisual.xuankhoatu.com/insertion_sort'
  }
}

export default function InsertionSortPage() {
  return (
    <>
      <svg className="" id="graph" width="100%" height="85%" style={{ transform: "rotateX(180deg)" }}>
          <InsertionSortDetail />
      </svg>
      <div className="p-5 text-center fs-5">
          <i>Insertion Sort</i>
      </div>
    </>
  );
}
