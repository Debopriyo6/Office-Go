import Navbar from "./Components/Navbar";
import { globalcontext } from "./Components/GlobalContext";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./Components/Login&Register/Login";

function App() {

  const[login,setLogin]=useState(false)
  return (
   <div>
    <globalcontext.Provider value={{login,setLogin}}>

    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
       
    </Routes>
    </globalcontext.Provider>
    </div>
  );
}

export default App;
