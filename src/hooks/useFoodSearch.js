import { useState } from 'react'
import axios from 'axios'

const MOCK_RESULTS = [
  {
    product_name: 'Banana (sample)',
    brands: 'Sample Brand',
    nutriments: {
      'energy-kcal_100g': 89,
      proteins_100g: 1.1,
      carbohydrates_100g: 22.8,
    },
    image_small_url: '',
    code: 'mock-banana-0001',
  },
]

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    setLoading(true)
    setError(null)

    const maxAttempts = 3
    let attempt = 0
    let lastError = null

    while (attempt < maxAttempts) {
      try {
        const response = await axios.get('/api/cgi/search.pl', {
          params: {
            search_terms: query,
            json: 1,
            page_size: 10,
          },
        })

        const products = Array.isArray(response.data.products) ? response.data.products : []
        const filtered = products.filter((product) => product.product_name && product.product_name.trim() !== '')
        setResults(filtered)
        setError(null)
        setLoading(false)
        return
      } catch (err) {
        lastError = err
        attempt += 1
        // If it's a client error (4xx), don't retry
        if (err.response && err.response.status >= 400 && err.response.status < 500) {
          break
        }
        // small delay before retrying
        await new Promise((res) => setTimeout(res, 500))
      }
    }

    // All attempts failed — fall back to mock data so UI remains testable
    if (lastError) {
      if (lastError.response) {
        setError(`Server error: ${lastError.response.status}. Showing sample results.`)
      } else if (lastError.request) {
        setError('Network error. Showing sample results.')
      } else {
        setError('Something went wrong. Showing sample results.')
      }
    }

    setResults(MOCK_RESULTS)
    setLoading(false)
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
