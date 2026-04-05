import { useState } from 'react'
import './App.css'
import PostForm from './components/PostForm'
import PostList from './components/PostList'

function App() {
  const [posts, setPosts] = useState([])
  const [nextId, setNextId] = useState(1)
  const [currentUser, setCurrentUser] = useState('')

  const addPost = (content, author) => {
    const newPost = {
      id: nextId,
      content,
      author,
      timestamp: new Date().toLocaleString('ru-RU'),
      likedBy: [],
    }
    setPosts([newPost, ...posts])
    setNextId(nextId + 1)
    setCurrentUser(author)
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const likePost = (id) => {
    if (!currentUser) return
    
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post,
            likedBy: post.likedBy.includes(currentUser)
              ? post.likedBy.filter(user => user !== currentUser)
              : [...post.likedBy, currentUser],
          }
        : post
    ))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Facepoop</h1>
        {currentUser && (
          <div className="user-badge-header">👤 {currentUser}</div>
        )}
      </header>
      
      <main className="app-main">
        <div className="container">
          <PostForm onAddPost={addPost} />
          <PostList
            posts={posts}
            onDeletePost={deletePost}
            onLikePost={likePost}
            currentUser={currentUser}
          />
        </div>
      </main>
    </div>
  )
}

export default App
