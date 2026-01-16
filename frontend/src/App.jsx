import { useState } from 'react'
import Home from './pages/Home';

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  function navigate(newPage) {
    setCurrentPage(newPage)
  }

  let pageElement = <Home navigate={navigate}/>;


  return (
    <>
      <h1>Potluck</h1>
      {pageElement}
    </>
  )
}

export default App
