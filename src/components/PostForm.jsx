import { useState } from 'react'
import './PostForm.css'

function PostForm({ onAddPost }) {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      onAddPost(content)
      setContent('')
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        placeholder="О чём вы думаете?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      />
      <button
        className="post-submit"
        type="submit"
        disabled={!content.trim()}
      >
        Опубликовать
      </button>
    </form>
  )
}

export default PostForm
