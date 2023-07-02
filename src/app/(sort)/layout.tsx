import ControlBox from "@/components/control";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s Sort',
        default: 'Sort'
    }
}

export default function SortLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div className="row">
            {/* TODO canvas */}
            <div id="simulation" className="container my-3 col-xl-10 border-end"
                style={{ height: "44rem" }}>
                {children}
            </div>
            <ControlBox category="sort" />
        </div>
    );
}
