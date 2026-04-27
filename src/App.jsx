import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import TypingIndicator from './components/TypingIndicator'
import CasinoKitty from './components/CasinoKitty'
import AuthorFilter from './components/AuthorFilter'

function App() {
  const [posts, setPosts] = useState([])
  const [nextId, setNextId] = useState(1)
  const [currentUser, setCurrentUser] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCasino, setShowCasino] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [theme, setTheme] = useState('light')
  const [settingsUserName, setSettingsUserName] = useState('')

  const authors = [...new Set(posts.map((post) => post.author))]
  const visiblePosts = selectedAuthor === 'all'
    ? posts
    : posts.filter((post) => post.author === selectedAuthor)

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }

    const savedUser = localStorage.getItem('current-user')
    if (savedUser) {
      setCurrentUser(savedUser)
      setSettingsUserName(savedUser)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('app-theme', theme)
  }, [theme])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current-user', currentUser)
    } else {
      localStorage.removeItem('current-user')
    }
  }, [currentUser])

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

  const addPost = (content) => {
    if (!currentUser) return

    const newPost = {
      id: nextId,
      content,
      author: currentUser,
      timestamp: new Date().toLocaleString('ru-RU'),
      likedBy: [],
    }
    setPosts([newPost, ...posts])
    setNextId(nextId + 1)
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const applyUserSettings = () => {
    setCurrentUser(settingsUserName.trim())
  }

  return (
    <div className={`app theme-${theme}`}>
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
            to="/settings"
            className={({ isActive }) => `app-nav-link ${isActive ? 'active' : ''}`}
          >
            Настройки
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
                  currentUser={currentUser}
                />
                <AuthorFilter
                  authors={authors}
                  selectedAuthor={selectedAuthor}
                  onChange={setSelectedAuthor}
                  visibleCount={visiblePosts.length}
                  totalCount={posts.length}
                />
                <PostList
                  posts={visiblePosts}
                  onDeletePost={deletePost}
                  onLikePost={likePost}
                  onEditPost={editPost}
                  currentUser={currentUser}
                />
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div className="container settings-page">
                <h2>Настройки</h2>

                <section className="settings-card">
                  <h3>Имя пользователя</h3>
                  <p className="settings-hint">
                    Это имя используется для лайков, редактирования и удаления ваших постов.
                  </p>
                  <div className="settings-user-row">
                    <input
                      type="text"
                      value={settingsUserName}
                      onChange={(e) => setSettingsUserName(e.target.value)}
                      placeholder="Введите имя пользователя"
                    />
                    <button type="button" onClick={applyUserSettings}>
                      Сохранить
                    </button>
                  </div>
                  <p className="settings-meta">
                    Текущее имя: {currentUser || 'не задано'}
                  </p>
                </section>

                <section className="settings-card">
                  <h3>Тема интерфейса</h3>
                  <button className="theme-switch" onClick={toggleTheme} type="button">
                    Тема: {theme === 'light' ? 'Светлая' : 'Темная'}
                  </button>
                </section>

                <section className="settings-card">
                  <h3>Sharing State в действии</h3>
                  <p>Активный фильтр: {selectedAuthor === 'all' ? 'Все авторы' : selectedAuthor}</p>
                  <p>Сейчас видно постов: {visiblePosts.length}</p>
                </section>
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
