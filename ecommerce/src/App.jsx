import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductDetails from './pages/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductDetails/>
    </>
  )
}

export default App
