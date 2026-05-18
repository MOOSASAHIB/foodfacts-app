import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import NutritionRow from '../components/NutritionRow'

function DetailPage() {
  const { barcode } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  const [product, setProduct] = useState(location.state?.product ?? null)
  const [loading, setLoading] = useState(!product)
  const [error, setError] = useState(null)

  const isSaved = product && savedItems.some((item) => item.code === product.code)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      if (product) return
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
        if (!cancelled) setLoading(false)
      }
    }

    fetchProduct()
    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSaveToggle = () => {
    if (!product) return
    if (isSaved) {
      dispatch(removeItem(product.code))
    } else {
      dispatch(addItem(product))
    }
  }

  const nutriments = product?.nutriments || {}

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      {loading && <Typography>Loading product details...</Typography>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !product && <Typography>Product not found.</Typography>}

      {!loading && !error && product && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
            {product.image_small_url ? (
              <Box component="img" src={product.image_small_url} alt={product.product_name} sx={{ width: 160, height: 160, objectFit: 'contain' }} />
            ) : (
              <Box sx={{ width: 160, height: 160, display: 'grid', placeItems: 'center', background: '#eef2ff', borderRadius: 2 }}>No image</Box>
            )}

            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {product.product_name || 'Unknown Product'}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {product.brands ? `Brand: ${product.brands}` : 'Brand unknown'}
              </Typography>
              <Typography color="text.secondary">Barcode: {product.code || barcode}</Typography>

              <Button
                variant={isSaved ? 'outlined' : 'contained'}
                color={isSaved ? 'error' : 'primary'}
                startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                onClick={handleSaveToggle}
                sx={{ mt: 1 }}
              >
                {isSaved ? 'Remove from Saved' : 'Save to My List'}
              </Button>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Nutrition per 100g
          </Typography>

          <NutritionRow label="Calories" value={nutriments?.['energy-kcal_100g']} unit=" kcal" />
          <NutritionRow label="Protein" value={nutriments?.proteins_100g} unit=" g" />
          <NutritionRow label="Carbohydrates" value={nutriments?.carbohydrates_100g} unit=" g" />
          <NutritionRow label="Sugars" value={nutriments?.sugars_100g} unit=" g" />
          <NutritionRow label="Fat" value={nutriments?.fat_100g} unit=" g" />
          <NutritionRow label="Saturated Fat" value={nutriments?.['saturated-fat_100g']} unit=" g" />
          <NutritionRow label="Fibre" value={nutriments?.fiber_100g} unit=" g" />
          <NutritionRow label="Salt" value={nutriments?.salt_100g} unit=" g" />
        </Paper>
      )}
    </Container>
  )
}

export default DetailPage
