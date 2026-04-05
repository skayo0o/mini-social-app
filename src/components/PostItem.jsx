import { useState } from 'react'
import './PostItem.css'

function PostItem({ post, onDelete, onLike, onEdit, currentUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(post.content)
  
  const isAuthor = post.author === currentUser
  const isLiked = post.likedBy.includes(currentUser)
  const likesCount = post.likedBy.length

  const handleLike = () => {
    if (currentUser) {
      onLike(post.id)
    }
  }

  const handleEditStart = () => {
    if (isAuthor) {
      setIsEditing(true)
    }
  }

  const handleEditSave = () => {
    if (editedContent.trim()) {
      onEdit(post.id, editedContent, post.author)
      setIsEditing(false)
    }
  }

  const handleEditCancel = () => {
    setEditedContent(post.content)
    setIsEditing(false)
  }

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="post-author">{post.author}</div>
        <div className="post-time">{post.timestamp}</div>
      </div>

      {isEditing ? (
        <div className="post-edit-mode">
          <textarea
            className="post-edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="3"
          />
          <div className="edit-buttons">
            <button
              className="btn-save"
              onClick={handleEditSave}
              disabled={!editedContent.trim()}
            >
              ✓ Сохранить
            </button>
            <button
              className="btn-cancel"
              onClick={handleEditCancel}
            >
              ✕ Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="post-content">
          {post.content}
        </div>
      )}

      <div className="post-footer">
        <button
          className={`post-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!currentUser}
          title={!currentUser ? 'Создайте пост, чтобы лайкить' : ''}
        >
          {isLiked ? '❤️' : '🤍'} Лайки ({likesCount})
        </button>
        
        {isAuthor && !isEditing && (
          <button
            className="post-btn edit-btn"
            onClick={handleEditStart}
          >
            ✏️ Редактировать
          </button>
        )}
        
        {isAuthor && (
          <button
            className="post-btn delete-btn"
            onClick={() => onDelete(post.id, post.author)}
          >
            🗑️ Удалить
          </button>
        )}
      </div>
    </div>
  )
}

export default PostItem
