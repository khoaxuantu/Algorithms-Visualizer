import '../css/styles.css';
import NavBar from '@/components/navbar';
import Copyright from './copyright';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main',
  description: `A sorting visualization web application providing selection sort, bubble sort,
  heap sort, quick sort and merge sort.`,
  authors: {
    name: 'Xuan Khoa Tu Nguyen',
    url: 'https://xuankhoatu.com'
  },
  openGraph: {
    title: 'Algorithm Visualizer | Main',
    description: `A sorting visualization web application providing selection sort, bubble sort,
    heap sort, quick sort and merge sort.`,
    url: 'https://algovisual.xuankhoatu.com',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <BootstrapCDN />
      </head>
      <body>
        <NavBar />
        <div className='container-fluid'>
          {children}
        </div>
        <Copyright />
      </body>
    </html>
  )
}

function BootstrapCDN(): JSX.Element {
  return(
    <>
      <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          crossOrigin='anonymous' />
      <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/flatly/bootstrap.min.css"
        integrity="sha256-3LXKhyYmYxt+fGciLxN474K5Ycw5FXqQJDJpW54Q3XQ="
        crossOrigin="anonymous" />
      <script crossOrigin='anonymous'
        src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p' async></script>
    </>
  )
}
