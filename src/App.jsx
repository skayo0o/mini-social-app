import { useEffect, useState } from 'react'
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
  const [isApiLoading, setIsApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setIsApiLoading(true)
        setApiError('')

        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) {
          throw new Error('Не удалось загрузить посты с API')
        }

        const data = await response.json()
        const uniqueByUser = []
        const seenUsers = new Set()

        for (const item of data) {
          if (!seenUsers.has(item.userId)) {
            seenUsers.add(item.userId)
            uniqueByUser.push(item)
          }

          if (uniqueByUser.length === 10) {
            break
          }
        }

        const preparedPosts = uniqueByUser.map((item) => ({
          id: item.id,
          content: item.body,
          author: `API User ${item.userId}`,
          timestamp: 'Загружено из API',
          likedBy: [],
        }))

        setPosts(preparedPosts)
        const maxId = preparedPosts.reduce((max, post) => Math.max(max, post.id), 0)
        setNextId(maxId + 1)
      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      } finally {
        setIsApiLoading(false)
      }
    }

    loadInitialPosts()
  }, [])

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
                {isApiLoading && (
                  <div className="info-banner">Загружаем посты из внешнего API...</div>
                )}
                {apiError && (
                  <div className="info-banner info-banner-error">{apiError}</div>
                )}
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
                  <li>При старте ленты посты загружаются из внешнего API через useEffect</li>
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
