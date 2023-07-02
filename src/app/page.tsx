import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ height: "80vh"}}>
      <div className='myCenter'>
        <h3 id="starting-canvas">
          Please select an algorithm
        </h3>
        <Image
          width={0} height={0}
          src="/thinking.png"
          alt='Emoji icons created by Culmbio - Flaticon (https://www.flaticon.com/free-icon/thinking_7624104?term=thinking%20face&page=1&position=2&page=1&position=2&related_id=7624104&origin=search)'
          sizes='100vw'
          style={{ width: '80%', height: '80%'}} />
      </div>
    </div>
  )
}
