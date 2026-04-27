import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import TypingIndicator from './components/TypingIndicator'
import CasinoKitty from './components/CasinoKitty'

function App() {
  const [posts, setPosts] = useState([])
  const [nextId, setNextId] = useState(1)
  const [currentUser, setCurrentUser] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCasino, setShowCasino] = useState(false)

  const checkForCasinoKeywords = (text) => {
    const keywords = ['казик', 'casino', 'казино']
    const lowerText = text.toLowerCase()
    return keywords.some(keyword => lowerText.includes(keyword))
  }

  const triggerCasino = () => {
    setShowCasino(true)
    setTimeout(() => {
      setShowCasino(false)
    }, 5000)
  }

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

  const deletePost = (id, author) => {
    if (currentUser === author) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const editPost = (id, newContent, author) => {
    setPosts(posts.map(post =>
      post.id === id && post.author === author
        ? { ...post, content: newContent }
        : post
    ))
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
        <nav className="app-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Лента
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
          >
            О проекте
          </NavLink>
        </nav>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <PostForm
                  onAddPost={addPost}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  onCasinoKeyword={triggerCasino}
                  checkCasino={checkForCasinoKeywords}
                />
                <PostList
                  posts={posts}
                  onDeletePost={deletePost}
                  onLikePost={likePost}
                  onEditPost={editPost}
                  currentUser={currentUser}
                />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="container about-page">
                <h2>Практика React в этом проекте</h2>
                <ul>
                  <li>Лента постов с редактированием и лайками</li>
                  <li>Typing indicator и локальная бизнес-логика</li>
                  <li>Роутинг между страницами через React Router</li>
                  <li>Следующим шагом добавим загрузку данных из API</li>
                </ul>
              </div>
            }
          />
        </Routes>
      </main>
      
      {isTyping && <TypingIndicator />}
      {showCasino && <CasinoKitty />}
    </div>
  )
}

export default App
