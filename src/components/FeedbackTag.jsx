import { useMemo } from 'react'
import { FaceGlyph } from './icons.jsx'

const CORRECT_TAGS = ['Nice catch!', 'Sharp eye!', 'Nice one!']

/**
 * The overlay shown after a decision or timeout.
 * `fb` = { type: 'correct' | 'wrong' | 'slow', answer, why }
 */
export function FeedbackTag({ fb }) {
  const label = useMemo(() => {
    if (fb.type === 'correct') return CORRECT_TAGS[Math.floor(Math.random() * CORRECT_TAGS.length)]
    if (fb.type === 'slow') return 'Too slow!'
    return fb.answer === 'sketchy' ? 'Oof, that was sketchy.' : 'Oof, that one was fine.'
  }, [fb])

  return (
    <div className="fb-wrap">
      <div className={`fb-tag ${fb.type}`}>
        <span className="g">
          <FaceGlyph kind={fb.type} size={30} />
        </span>
        {label}
      </div>
      <div className="fb-why">
        {fb.type === 'slow' ? (
          'No points — here comes the next one!'
        ) : (
          <>
            It was{' '}
            <span className={`ans ${fb.answer}`}>{fb.answer === 'sketchy' ? 'SKETCHY' : 'LEGIT'}</span>. {fb.why}
          </>
        )}
      </div>
    </div>
  )
}
