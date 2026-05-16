# FoodFacts - Search Nutrition Info by Food Name

A React + Vite web app that lets users search for any food and see real nutrition data pulled from the Open Food Facts API.

## What I built

A single-page React application with a search bar that queries the Open Food Facts API and displays nutrition information for food products in a clean card-based layout. Users can search by food name and instantly see results with calorie, protein, and carbohydrate information per 100g.

## Concepts learned

- **JSX** — HTML-like syntax inside JavaScript for describing UI
- **Functional Components** — JavaScript functions that return JSX
- **Props** — Data passed from parent to child components
- **useState** — React Hook for managing component state
- **Event Handling** — Responding to user interactions like typing and clicking
- **Controlled Inputs** — Form inputs whose value is driven by React state
- **List Rendering** — Using `.map()` to render arrays of data as components
- **Fetch API** — Making HTTP requests to external services
- **Async/Await** — Modern JavaScript for handling asynchronous operations

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

## Screenshots

(Add your screenshots here)
- Empty state with search prompt
- Search results showing food cards with nutrition info
- Loading state while fetching data

## What I found challenging

**API Response Inconsistency** — Not all products in the Open Food Facts database have complete nutrition data. Some use `energy-kcal_100g` while others use different field names. I solved this by adding fallback field checks (`energy-kcal_100g` or `energy_100g`) and using optional chaining to prevent crashes when fields are missing. This made the app robust across the entire dataset.

## Questions for review

- Should I add error boundaries for better error handling?
- Would a filter/sort feature for results improve usability?
- Any recommendations for optimizing API performance with large result sets?

## Features

✅ Search bar with controlled input  
✅ Live API integration with Open Food Facts  
✅ Food card component displaying product info  
✅ Loading state  
✅ Empty state  
✅ No-results state  
✅ Multi-word search support (URL encoding)  
✅ Responsive design  
✅ Basic CSS styling  

## Project Structure

```
src/
├── App.jsx                    # Main app component with search logic
├── components/
│   ├── SearchBar.jsx          # Search form with controlled input
│   ├── FoodCard.jsx           # Individual product card
│   └── FoodList.jsx           # List of product cards
├── main.jsx                   # Entry point
└── index.css                  # Styling
```

## Technologies

- React 18.3
- Vite 5.4
- Open Food Facts API
- Vanilla CSS

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Search for any food to see nutrition info!

---

**PR Title:** `[Part 1] FoodFacts - Foundations & First Search`
