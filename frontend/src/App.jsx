import { useState } from 'react'
import Home from './pages/Home';
import MyMeals from './pages/MyMeals';
import SignIn from './pages/SignIn';

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);

  function navigate(newPage) {
    setCurrentPage(newPage)
  }

  let pageElement = <Home navigate={navigate}/>;

  if(currentPage === "my-meals") {
    pageElement = <MyMeals navigate={navigate} user={user} />;
  } else if (currentPage === "sign-in") {
    pageElement = <SignIn navigate={navigate} user={user} setUser={setUser} />;
  }


  return (
    <>
      <nav>
        <div className="brand">Potluck</div>
        <div className="nav-item" onClick={()=>navigate("my-meals")}>My Meals</div>
        <div className="nav-item" onClick={()=>navigate("sign-in")}>Sign In</div>
      </nav>
      <p>Welcome {user && user.email}</p>
      {pageElement}
    </>
  )
}

export default App
