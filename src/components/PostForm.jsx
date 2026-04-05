import { useState, useRef } from 'react'
import './PostForm.css'

function PostForm({ onAddPost, isTyping, setIsTyping, onCasinoKeyword, checkCasino }) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const typingTimeoutRef = useRef(null)

  const handleContentChange = (e) => {
    const value = e.target.value
    setContent(value)
    
    // Проверка на ключевые слова казино
    if (checkCasino(value)) {
      onCasinoKeyword()
    }
    
    if (value.length > 0 || author.length > 0) {
      setIsTyping(true)
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
  }

  const handleAuthorChange = (e) => {
    const value = e.target.value
    setAuthor(value)
    
    if (value.length > 0 || content.length > 0) {
      setIsTyping(true)
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() && author.trim()) {
      onAddPost(content, author)
      setContent('')
      setIsTyping(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="post-author-input"
        placeholder="Ваш никнейм..."
        value={author}
        onChange={handleAuthorChange}
      />
      <textarea
        className="post-textarea"
        placeholder="О чём вы думаете?"
        value={content}
        onChange={handleContentChange}
        rows="3"
        disabled={!author}
      />
      {!author && <p className="form-hint">Введите никнейм, чтобы писать посты</p>}
      <button
        className="post-submit"
        type="submit"
        disabled={!content.trim() || !author}
      >
        Опубликовать
      </button>
    </form>
  )
}

export default PostForm
