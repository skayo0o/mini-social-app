function AuthorFilter({ authors, selectedAuthor, onChange, visibleCount, totalCount }) {
  return (
    <section className="author-filter">
      <div className="author-filter-row">
        <label htmlFor="author-filter-select">Фильтр по автору:</label>
        <select
          id="author-filter-select"
          value={selectedAuthor}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="all">Все авторы</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <p className="author-filter-meta">
        Показано постов: {visibleCount} из {totalCount}
      </p>
    </section>
  )
}

export default AuthorFilter
