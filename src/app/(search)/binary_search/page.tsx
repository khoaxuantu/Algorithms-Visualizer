import Image from "next/image";

export default function BinarySearchPage() {
    return (
        <div className='myCenter'>
        <h3 id="starting-canvas">
            Searching parts in development
        </h3>
        <Image
            width={0} height={0} className="m-4"
            src="/settings.png"
            alt='Gear icons created by Gregor Cresnar - Flaticon (https://www.flaticon.com/free-icon/settings_563541?term=gear&page=1&position=3&page=1&position=3&related_id=563541&origin=tag)'
            sizes='100vw'
            style={{ width: '80%', height: '80%'}} />
        </div>
    );
}
