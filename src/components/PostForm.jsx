import { useState } from 'react'
import './PostForm.css'

function PostForm({ onAddPost }) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() && author.trim()) {
      onAddPost(content, author)
      setContent('')
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="post-author-input"
        placeholder="Ваш никнейм..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        className="post-textarea"
        placeholder="О чём вы думаете?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
