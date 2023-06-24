'use client';

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Algorithm Visualizer</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Sorting</a>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item" href="/selection_sort">Selection Sort</Link>
                              <Link className="dropdown-item" href="/bubble_sort">Bubble Sort</Link>
                              <Link className="dropdown-item" href="/heap_sort">Heap Sort</Link>
                              <Link className="dropdown-item" href="/quick_sort">Quick Sort</Link>
                              <Link className="dropdown-item" href="/merge_sort">Merge Sort</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Searching</a>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item" href="/">Linear Search</Link>
                              <Link className="dropdown-item" href="/">Binary Search</Link>
                              <Link className="dropdown-item" href="/">Breadth First Search</Link>
                              <Link className="dropdown-item" href="/">Depth First Search</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
