import './LanyardCard.css';

// A CSS-based hanging ID badge that swings on a lanyard strap. Uses the
// no-background headshot. Swings gently by default; nudges on hover.
export default function LanyardCard() {
  return (
    <div className="lanyard" aria-hidden="false">
      {/* Strap */}
      <div className="lanyard__strap">
        <span className="lanyard__strap-text">HADI • DEV • HADI • DEV • HADI • DEV</span>
      </div>
      {/* Clip */}
      <div className="lanyard__clip" />
      {/* Card */}
      <div className="lanyard__card cursor-target">
        <div className="lanyard__card-glow" />
        <div className="lanyard__hole" />
        <div className="lanyard__photo-wrap">
          <img src="/images/hadi-nobg.png" alt="Hadi Abdulla" className="lanyard__photo" loading="lazy" />
        </div>
        <div className="lanyard__info">
          <div className="lanyard__name">HADI ABDULLA</div>
          <div className="lanyard__role">Software Engineer</div>
          <div className="lanyard__barcode" />
          <div className="lanyard__id">ID · MMU-CS-2024</div>
        </div>
      </div>
    </div>
  );
}
