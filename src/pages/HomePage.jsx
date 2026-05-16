import { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import FoodList from '../components/FoodList.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFoodSearch from '../hooks/useFoodSearch.js'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setHasSearched(true)
    await searchFood(query)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Search Nutrition Info</h1>
        <p>Find food products and view nutrition details from Open Food Facts.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !hasSearched && (
        <p className="status-message">Search for a food above to see its nutrition info.</p>
      )}
      {!loading && !error && hasSearched && results.length === 0 && (
        <p className="status-message">No results found. Try a different search.</p>
      )}
      {!loading && !error && results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default HomePage
