import './TypingIndicator.css'

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <img src="/images/typing.gif" alt="typing" className="typing-gif" />
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default TypingIndicator
