import './PostItem.css'

function PostItem({ post, onDelete, onLike, currentUser }) {
  const isLiked = post.likedBy.includes(currentUser)
  const likesCount = post.likedBy.length

  const handleLike = () => {
    if (currentUser) {
      onLike(post.id)
    }
  }

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="post-author">{post.author}</div>
        <div className="post-time">{post.timestamp}</div>
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-footer">
        <button
          className={`post-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!currentUser}
          title={!currentUser ? 'Создайте пост, чтобы лайкить' : ''}
        >
          {isLiked ? '❤️' : '🤍'} Лайки ({likesCount})
        </button>
        <button
          className="post-btn delete-btn"
          onClick={() => onDelete(post.id)}
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  )
}

export default PostItem
