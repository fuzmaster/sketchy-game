export function TutorialOverlay({ mode, onDone }) {
  return (
    <div className="modal-backdrop">
      <div className="tutorial-card">
        <h2>Quick Taste Test</h2>
        <ol>
          <li>Read the claim.</li>
          <li>Swipe right if it’s {mode.labels.right}.</li>
          <li>Swipe left if it’s {mode.labels.left}.</li>
        </ol>
        <button className="primary-button" onClick={onDone}>
          Got it
        </button>
      </div>
    </div>
  )
}
