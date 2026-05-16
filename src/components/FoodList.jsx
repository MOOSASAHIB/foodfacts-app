import FoodCard from './FoodCard.jsx'

function FoodList({ products }) {
  if (products.length === 0) {
    return <p className="status-message">No results found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code || product.id || product._id || product.product_name} product={product} />
      ))}
    </div>
  )
}

export default FoodList
