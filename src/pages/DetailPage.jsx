import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage.jsx'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some((item) => item.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`/api/api/v0/product/${barcode}.json`)
        if (!cancelled) {
          const productData = response.data.product
          if (!productData) {
            setError('Product not found.')
          }
          setProduct(productData)
        }
      } catch (err) {
        if (!cancelled) {
          if (err.response) {
            setError(`Server error: ${err.response.status}. Please try again.`)
          } else if (err.request) {
            setError('Network error. Check your connection and try again.')
          } else {
            setError('Could not load product details.')
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSave = () => {
    if (!product) return

    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  const nutriments = product?.nutriments || {}
  const calories = nutriments?.['energy-kcal_100g'] ?? nutriments?.energy_100g
  const protein = nutriments?.['proteins_100g']
  const carbs = nutriments?.['carbohydrates_100g']
  const fat = nutriments?.['fat_100g']
  const sugar = nutriments?.['sugars_100g']
  const fiber = nutriments?.['fiber_100g']
  const salt = nutriments?.['salt_100g']

  return (
    <div className="page detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading && <p className="status-message">Loading product details...</p>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !product && <p className="status-message">Product not found.</p>}

      {!loading && !error && product && (
        <div className="detail-card">
          <div className="detail-header">
            <div className="detail-image">
              {product.image_small_url ? (
                <img src={product.image_small_url} alt={product.product_name || 'Product image'} />
              ) : (
                <div className="image-fallback">No image available</div>
              )}
            </div>
            <div className="detail-summary">
              <h1>{product.product_name || 'Unknown Product'}</h1>
              <p className="brand">{product.brands ? `Brand: ${product.brands}` : 'Brand unknown'}</p>
              <p className="detail-code">Barcode: {barcode}</p>
              <button className="save-button" onClick={handleSave}>
                {isSaved ? 'Remove from Saved' : 'Save to My List'}
              </button>
            </div>
          </div>

          <section className="nutrition-table">
            <h2>Nutrition per 100g</h2>
            <div className="nutrition-grid">
              <div>
                <span>Calories</span>
                <strong>{calories != null ? `${calories} kcal` : 'N/A'}</strong>
              </div>
              <div>
                <span>Protein</span>
                <strong>{protein != null ? `${protein} g` : 'N/A'}</strong>
              </div>
              <div>
                <span>Carbs</span>
                <strong>{carbs != null ? `${carbs} g` : 'N/A'}</strong>
              </div>
              <div>
                <span>Fat</span>
                <strong>{fat != null ? `${fat} g` : 'N/A'}</strong>
              </div>
              <div>
                <span>Sugar</span>
                <strong>{sugar != null ? `${sugar} g` : 'N/A'}</strong>
              </div>
              <div>
                <span>Salt</span>
                <strong>{salt != null ? `${salt} g` : 'N/A'}</strong>
              </div>
              <div>
                <span>Fiber</span>
                <strong>{fiber != null ? `${fiber} g` : 'N/A'}</strong>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default DetailPage
