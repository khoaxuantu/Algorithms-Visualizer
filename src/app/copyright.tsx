export default function Copyright() {
    const year = new Date().getFullYear();
    return (
        <footer className='text-center mt-5 pb-3 copyright'>
            This project is built by {" "}
            <a className='refer-url' href="https://xuankhoatu.com" target='_blank'>Xuan Khoa Tu Nguyen</a> with {" "}
            <a className='refer-url' href="https://nextjs.org/" target='_blank'>Next.js</a> and {" "}
            <a className='refer-url' href="https://getbootstrap.com/" target='_blank'>Bootstrap</a> {" "}
            © {year}.
        </footer>
    );
}
