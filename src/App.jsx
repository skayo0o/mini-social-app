import { useState } from 'react'
import './App.css'
import PostForm from './components/PostForm'
import PostList from './components/PostList'

function App() {
  const [posts, setPosts] = useState([])
  const [nextId, setNextId] = useState(1)

  const addPost = (content) => {
    const newPost = {
      id: nextId,
      content,
      author: 'Вы',
      timestamp: new Date().toLocaleString('ru-RU'),
      likes: 0,
    }
    setPosts([newPost, ...posts])
    setNextId(nextId + 1)
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const likePost = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Мини-социальное приложение</h1>
      </header>
      
      <main className="app-main">
        <div className="container">
          <PostForm onAddPost={addPost} />
          <PostList
            posts={posts}
            onDeletePost={deletePost}
            onLikePost={likePost}
          />
        </div>
      </main>
    </div>
  )
}

export default App
