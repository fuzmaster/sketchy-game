export function PauseMenu({ onResume, onRestart, onHome }) {
  return (
    <div className="modal-backdrop">
      <div className="pause-card">
        <h2>Paused</h2>
        <button className="primary-button" onClick={onResume}>
          Resume
        </button>
        <button className="secondary-button" onClick={onRestart}>
          Restart
        </button>
        <button className="secondary-button" onClick={onHome}>
          Home
        </button>
      </div>
    </div>
  )
}
