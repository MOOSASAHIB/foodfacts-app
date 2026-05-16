import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Saved Items</h1>
          <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
        </header>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Saved Items ({saved.length})</h1>
        <p>View the products you've saved for later review.</p>
      </header>

      <div className="saved-list">
        {saved.map((product) => (
          <div key={product.code} className="saved-item">
            <div>
              <h2>{product.product_name || 'Unknown Product'}</h2>
              <p className="brand">{product.brands ? `Brand: ${product.brands}` : 'Brand unknown'}</p>
            </div>
            <div className="saved-actions">
              <button onClick={() => navigate(`/product/${product.code}`)}>View Details</button>
              <button className="remove-button" onClick={() => dispatch({ type: 'REMOVE', code: product.code })}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage
