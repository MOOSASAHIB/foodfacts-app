import { useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import SearchBar from '../components/SearchBar.jsx'
import FoodCard from '../components/FoodCard.jsx'
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        Search Nutrition Info
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Find food products and view nutrition details from Open Food Facts.
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {!loading && results.length === 0 && !error && !hasSearched && (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Search for a food above to see nutrition info.
        </Typography>
      )}

      {!loading && !error && results.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {results.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.code}>
              <FoodCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default HomePage
