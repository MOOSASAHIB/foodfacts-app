import { NavLink } from 'react-router-dom'

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">🥗 FoodFacts</div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Search
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? 'active' : '')}>
          Saved{savedCount > 0 ? <span className="badge">{savedCount}</span> : ''}
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
