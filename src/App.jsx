import { useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import SavedPage from './pages/SavedPage.jsx'

function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (state.some((item) => item.code === action.product.code)) {
        return state
      }
      return [...state, action.product]
    case 'REMOVE':
      return state.filter((item) => item.code !== action.code)
    default:
      return state
  }
}

function App() {
  const [saved, dispatch] = useReducer(savedReducer, [])

  return (
    <div className="app-shell">
      <NavBar savedCount={saved.length} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:barcode"
            element={<DetailPage saved={saved} dispatch={dispatch} />}
          />
          <Route path="/saved" element={<SavedPage saved={saved} dispatch={dispatch} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
