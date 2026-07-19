import { GiChessKnight, GiRunningShoe } from 'react-icons/gi';
import './Interests.css';

// Big, animated interest tiles: a Rubik's cube face that occasionally turns,
// a black/white chess knight on a checkerboard, and a striding running shoe.
export default function Interests() {
  const rubikColors = [
    '#ff3b30', '#ffcc00', '#34c759',
    '#0a84ff', '#ff9500', '#ffffff',
    '#34c759', '#ff3b30', '#0a84ff',
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Rubik's Cube */}
      <div className="interest-tile group">
        <div className="rubik" aria-hidden="true">
          {rubikColors.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
        <span className="interest-label rubiks-text">Rubik's Cube</span>
      </div>

      {/* Chess */}
      <div className="interest-tile group">
        <div className="chess-board" aria-hidden="true">
          <GiChessKnight className="chess-knight" />
        </div>
        <span className="interest-label text-gray-200">Chess</span>
      </div>

      {/* Running */}
      <div className="interest-tile group">
        <div className="run-stage" aria-hidden="true">
          <GiRunningShoe className="run-shoe" />
        </div>
        <span className="interest-label text-cyber-cyan">Running</span>
      </div>
    </div>
  );
}
