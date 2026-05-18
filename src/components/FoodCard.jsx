import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()
  const { product_name, brands, nutriments, image_small_url, code } = product
  const calories = nutriments?.['energy-kcal_100g'] ?? nutriments?.energy_100g
  const protein = nutriments?.['proteins_100g']
  const carbs = nutriments?.['carbohydrates_100g']

  const handleClick = () => {
    if (code) {
      navigate(`/product/${code}`)
    }
  }

  return (
    <article
      className="food-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick()
        }
      }}
    >
      <div className="food-card-image">
        {image_small_url ? (
          <img src={image_small_url} alt={product_name || 'Food product'} />
        ) : (
          <div className="image-fallback">No image available</div>
        )}
      </div>

      <div className="food-card-body">
        <h2>{product_name || 'Unknown Product'}</h2>
        <p className="brand">{brands ? `Brand: ${brands}` : 'Brand unknown'}</p>

        <div className="nutrient-grid">
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
        </div>
      </div>
    </article>
  )
}

export default FoodCard
