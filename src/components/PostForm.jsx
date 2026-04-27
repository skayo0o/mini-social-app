import { useState, useRef } from 'react'
import './PostForm.css'

function PostForm({ onAddPost, isTyping, setIsTyping, onCasinoKeyword, checkCasino, currentUser }) {
  const [content, setContent] = useState('')
  const typingTimeoutRef = useRef(null)

  const handleContentChange = (e) => {
    const value = e.target.value
    setContent(value)
    
    // Проверка на ключевые слова казино
    if (checkCasino(value)) {
      onCasinoKeyword()
    }
    
    if (value.length > 0 && currentUser) {
      setIsTyping(true)
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() && currentUser) {
      onAddPost(content)
      setContent('')
      setIsTyping(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        placeholder="О чём вы думаете?"
        value={content}
        onChange={handleContentChange}
        rows="3"
        disabled={!currentUser}
      />
      {!currentUser && <p className="form-hint">Задайте имя пользователя на вкладке Настройки</p>}
      <button
        className="post-submit"
        type="submit"
        disabled={!content.trim() || !currentUser}
      >
        Опубликовать
      </button>
    </form>
  )
}

export default PostForm
