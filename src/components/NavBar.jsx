import { NavLink } from 'react-router-dom'

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">🥗 FoodFacts</div>
      <div className="nav-links">
        <NavLink to="/" end>
          Search
        </NavLink>
        <NavLink to="/saved">
          Saved{savedCount > 0 ? <span className="badge">{savedCount}</span> : ''}
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
