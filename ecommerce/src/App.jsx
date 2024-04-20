import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import DetailsPage from './pages/DetailsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DetailsPage/>
    </>
  )
}

export default App
