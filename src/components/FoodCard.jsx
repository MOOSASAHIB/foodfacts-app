function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product
  const calories = nutriments?.['energy-kcal_100g'] ?? nutriments?.energy_100g
  const protein = nutriments?.['proteins_100g']
  const carbs = nutriments?.['carbohydrates_100g']

  return (
    <article className="food-card">
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
