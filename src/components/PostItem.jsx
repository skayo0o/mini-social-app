import './PostItem.css'

function PostItem({ post, onDelete, onLike }) {
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
          className="post-btn like-btn"
          onClick={() => onLike(post.id)}
        >
          ❤️ Нравится ({post.likes})
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
