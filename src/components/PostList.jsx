import PostItem from './PostItem'
import './PostList.css'

function PostList({ posts, onDeletePost, onLikePost }) {
  if (posts.length === 0) {
    return (
      <div className="post-list-empty">
        <p>Нет постов. Создайте первый пост!</p>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={onDeletePost}
          onLike={onLikePost}
        />
      ))}
    </div>
  )
}

export default PostList
