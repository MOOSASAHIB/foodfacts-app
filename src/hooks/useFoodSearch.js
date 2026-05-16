import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get('/api/cgi/search.pl', {
        params: {
          search_terms: query,
          json: 1,
          page_size: 10,
        },
      })

      const products = Array.isArray(response.data.products) ? response.data.products : []
      const filtered = products.filter(
        (product) => product.product_name && product.product_name.trim() !== '',
      )
      setResults(filtered)
    } catch (err) {
      if (err.response) {
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        setError('Network error. Check your connection and try again.')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
