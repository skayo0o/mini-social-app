import PostItem from './PostItem'
import './PostList.css'

function PostList({ posts, onDeletePost, onLikePost, currentUser }) {
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
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}

export default PostList
