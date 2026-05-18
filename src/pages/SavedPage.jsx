import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { removeItem } from '../store/savedSlice'

function SavedPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const saved = useSelector((state) => state.saved.items)

  if (!saved || saved.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Saved Items
        </Typography>
        <Typography>You haven't saved anything yet. Search for a food and save it from the detail page.</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Items ({saved.length})
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        View the products you've saved for later review.
      </Typography>

      <Grid container spacing={3}>
        {saved.map((product) => (
          <Grid item xs={12} md={6} key={product.code}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{product.product_name || 'Unknown Product'}</Typography>
                  <Typography color="text.secondary">{product.brands ? `Brand: ${product.brands}` : 'Brand unknown'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" onClick={() => navigate(`/product/${product.code}`, { state: { product } })}>
                    View Details
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => dispatch(removeItem(product.code))}>
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SavedPage
