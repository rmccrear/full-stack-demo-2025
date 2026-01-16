import { useState } from 'react'
import Home from './pages/Home';
import MyMeals from './pages/MyMeals';

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  function navigate(newPage) {
    setCurrentPage(newPage)
  }

  let pageElement = <Home navigate={navigate}/>;

  if(currentPage === "my-meals") {
    pageElement = <MyMeals navigate={navigate}/>;
  }


  return (
    <>
      <h1>Potluck</h1>
      <nav>
        <div onClick={()=>navigate("my-meals")}>My Meals</div>
      </nav>
      {pageElement}
    </>
  )
}

export default App
