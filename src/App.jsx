import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import FoodList from './components/FoodList.jsx'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()
      const products = Array.isArray(data.products) ? data.products : []
      const filtered = products.filter(
        (product) => product.product_name && product.product_name.trim() !== '',
      )
      setResults(filtered)
    } catch (error) {
      console.error('Something went wrong:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>🥗 FoodFacts</h1>
        <p className="subtitle">Search for a food name and see nutrition info from Open Food Facts.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}
      {!loading && results.length === 0 && (
        <p className="status-message">Search for a food above to see its nutrition info.</p>
      )}

      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default App
