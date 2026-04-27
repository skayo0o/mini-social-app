import './CasinoKitty.css'

function CasinoKitty() {
  return (
    <div className="casino-kitty-overlay">
      <div className="casino-kitty-container">
        <video autoPlay muted className="casino-kitty-video" src="/videos/cat-gambling.mp4"></video>
      </div>
    </div>
  )
}

export default CasinoKitty
